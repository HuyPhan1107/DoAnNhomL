import { TextField, Box, Button, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { getPositions, getTasks, insertTask, setJsonTimekeeping, updateTask } from "../../api";
import { useStore } from "../../hooks";
import { actionType, setTasks, setToastMesagae } from "../../reducers/action";
import { HIDE_MODAL } from "../../reducers/constant";

function ModalTask({ task }) {
    const dispatch = useStore()[1];
    const [stateTask, setStateTask] = useState({
        Id: undefined,
        title: '',
        decription: '',
        status: 1,
        correspondingPosition: 'none',
        holidayPay: 1
    })

    const [positions, setPositions] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const { data } = await getPositions();
            if (!data.success) {
                dispatch(setToastMesagae({
                    title: 'Thất bại',
                    message: 'Lỗi lấy danh sách chức vụ',
                    type: 'error',
                }));
                return;
            }
            const positions = data.data.map(val => val.ChucVu);
            setPositions(positions);
        }

        fetchData();
    }, [])

    useEffect(() => {
        if (task) {
            setStateTask(task)
        }
    }, [task])

    const handleChange = e => {
        const name = e.target.name
        console.log({ name, task })
        if (name === 'holidayPay' && task.status !== 1) {
            dispatch(setToastMesagae({
                title: 'Cảnh báo',
                message: 'Chỉ có thể thay đổi mức lương khi ở trạng thái "Ready"',
                type: 'wraning',
            }));
            return;
        }
        const value = e.target.value
        if (task && name === 'status') {
            if (Number(value) - Number(task.status) !== 1) {
                dispatch(setToastMesagae({
                    title: 'Cảnh báo',
                    message: 'Chỉ có thể thay đổi được 1 nấc lên trạng thái tiếp theo!',
                    type: 'wraning',
                }));
                return;
            }
        }
        setStateTask(prev => ({
            ...prev,
            [name]: value,
        }))
    }
/**Chấm công */
    const handleClick = async () => {
        if (stateTask.title && stateTask.decription) {
            if (stateTask.correspondingPosition === 'none') {
                dispatch(setToastMesagae({
                    title: 'Thất bại',
                    message: 'Vui lòng chọn chức vụ tương ứng cho công việc',
                    type: 'error',
                }));
                return;
            }
            if (!stateTask.Id) {
                const respone = await insertTask(stateTask)
                if (respone.data.key) {
                    dispatch(actionType(HIDE_MODAL));

                    const responseGetTasks = await getTasks();
                    const { data } = responseGetTasks;
                    dispatch(setTasks(data.result));

                    dispatch(setToastMesagae({
                        title: 'Thành công',
                        message: 'Đã thêm thành công công việc mới',
                        type: 'success',
                    }));
                } else {
                    dispatch(setToastMesagae({
                        title: 'Thất bại',
                        message: 'Thêm thất bại lỗi client or server',
                        type: 'error',
                    }));
                }
                /**Thay đổi thông tin công việc */
            } else {
                const respone = await updateTask(stateTask);
                if (respone.data.key) {
                    dispatch(actionType(HIDE_MODAL));

                    const responseGetTasks = await getTasks();
                    const { data } = responseGetTasks;
                    dispatch(setTasks(data.result));

                    dispatch(setToastMesagae({
                        title: 'Thành công',
                        message: 'Đã thay đổi lại thông tin công việc',
                        type: 'success',
                    }));
                } else {
                    dispatch(setToastMesagae({
                        title: 'Thất bại',
                        message: 'Thay đổi thất bại lỗi client or server',
                        type: 'error',
                    }));
                }
            }
        }
    } 

    // Completed
    const onDone = async () => {
        let json_timekeeping = {Ready: []};
        try {
            json_timekeeping = JSON.parse(stateTask.json_timekeeping);
        } catch (error) {}
        let list_id = JSON.stringify({
            "Ready": json_timekeeping.Ready,
            "Completed": json_timekeeping.Ready,
        })
        await setJsonTimekeeping({listId: list_id, Id: stateTask.Id});
        const respone = await updateTask({...stateTask, status: 1, Done: true});
        if (respone.data.key) {
            dispatch(actionType(HIDE_MODAL));

            const responseGetTasks = await getTasks();
            const { data } = responseGetTasks;
            dispatch(setTasks(data.result));

            dispatch(setToastMesagae({
                title: 'Thành công',
                message: 'Đã hoàn thành công việc',
                type: 'success',
            }));
        } else {
            dispatch(setToastMesagae({
                title: 'Thất bại',
                message: 'Lỗi client or server',
                type: 'error',
            }));
        }
    }

    return (
        <Box>
            <TextField
                fullWidth
                id="standard-basic"
                label={"Tiêu đề"}
                variant="standard"
                name='title'
                value={stateTask.title}
                onChange={handleChange}
            />

            <TextField
                fullWidth
                id="standard-basic"
                label="Mô tả"
                variant="standard"
                name='decription'
                value={stateTask.decription}
                onChange={handleChange}
            />

            <Box display="flex" justifyContent="space-between" mt={2} mb={2}>
                {
                    !task &&
                    <Box display="flex" flexDirection="column">
                        <label style={{ margin: "2px" }} >Chức vụ tương ứng</label>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={stateTask.correspondingPosition}
                            label="Chức vụ tương ứng"
                            onChange={handleChange}
                            name="correspondingPosition"
                            size='small'
                        >
                            <MenuItem value="none">Chưa xác định</MenuItem>
                            {
                                positions.map(position => <MenuItem key={position} value={position}>{position}</MenuItem>)
                            }
                        </Select>
                    </Box>
                }

                {
                    task &&
                    <Box display="flex" flexDirection="column">
                        <label style={{ margin: "2px" }}>Ngày thường/lễ</label>
                        <Select
                            labelId="holiday-pay-label"
                            id="holiday-pay-label-select"
                            value={stateTask.holidayPay}
                            label="Status"
                            onChange={handleChange}
                            name="holidayPay"
                            size='small'
                            sx={{ minWidth: 150 }}
                        >
                            <MenuItem value={1}>Ngày thường</MenuItem>
                            <MenuItem value={2}>Lễ x2</MenuItem>
                            <MenuItem value={3}>Lễ x3</MenuItem>
                        </Select>
                    </Box>
                }

                {
                    task && task.status !== 4 &&
                    <Box display='flex' flexDirection="column">
                        <label style={{ margin: "2px" }}>Trạng thái</label>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={stateTask.status}
                            label="Status"
                            onChange={handleChange}
                            name="status"
                            size='small'
                        >
                            <MenuItem value={1}>Ready</MenuItem>
                            <MenuItem value={2}>In Progress</MenuItem>
                            <MenuItem value={3}>Completed</MenuItem>
                            <MenuItem value={4}>Overtime</MenuItem>
                        </Select>
                    </Box>
                }
            </Box>


            {
                !task || (task.status !== 4) ?
                <Button
                    size="small"
                    variant='contained'
                    fullWidth
                    style={{ margin: '8px 0 12px 0' }}
                    onClick={handleClick}
                >{task ? 'Thay đổi' : 'Thêm'}</Button>
                :
                <Button
                    size="small"
                    variant='contained'
                    fullWidth
                    style={{ margin: '8px 0 12px 0' }}
                    onClick={onDone}
                >Hoàn thành</Button>
            }
        </Box>
    )
}

export default ModalTask;