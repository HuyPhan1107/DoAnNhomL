import { TextField, Box, Button, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { getTasks, insertTask, updateTask } from "../../api";
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
    })

    useEffect(() => {
        if(task) {
            setStateTask(task)
        }
    }, [task])

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value
        setStateTask(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleClick = async () => {
        if(stateTask.title && stateTask.decription) {
            if(!stateTask.Id) {
                const respone = await insertTask(stateTask)
                if(respone.data.key) {
                    dispatch(actionType(HIDE_MODAL));
    
                    const responseGetTasks = await getTasks();
                    const { data } = responseGetTasks;
                    dispatch(setTasks(data.result)); 
    
                    dispatch(setToastMesagae({
                        title: 'Thành công',
                        message: 'Đã thêm thành công công việc mới',
                        type: 'success',
                    }));
                }else {
                    dispatch(setToastMesagae({
                        title: 'Thất bại',
                        message: 'Thêm thất bại lỗi client or server',
                        type: 'error',
                    }));
                }
            }else {
                const respone = await updateTask(stateTask);
                if(respone.data.key) {
                    dispatch(actionType(HIDE_MODAL));
    
                    const responseGetTasks = await getTasks();
                    const { data } = responseGetTasks;
                    dispatch(setTasks(data.result)); 
    
                    dispatch(setToastMesagae({
                        title: 'Thành công',
                        message: 'Đã thay đổi lại thông tin công việc',
                        type: 'success',
                    }));
                }else {
                    dispatch(setToastMesagae({
                        title: 'Thất bại',
                        message: 'Thay đổi thất bại lỗi client or server',
                        type: 'error',
                    }));
                }
            }
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
                label={"Tiêu đề"}
                variant="standard" 
                name='decription'
                value={stateTask.decription}
                onChange={handleChange}
            />

            <Box display="flex" justifyContent="flex-end" mt={1}>
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
            </Select>
            </Box>

        <Button 
            size="small" 
            variant='contained' 
            fullWidth 
            style={{margin: '8px 0 12px 0'}}
            onClick={handleClick}
        >{task ? 'Thay đổi' : 'Thêm'}</Button>
        </Box>
    )
}

export default ModalTask;