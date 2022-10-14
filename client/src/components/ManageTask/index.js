import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid } from '@mui/material';
import { useEffect } from 'react';
import { STATUS } from '../../reducers/constant';
import TaskItem from './TaskItem';
import { getTasks } from '../../api'
import { setTasks, showModal } from '../../reducers/action'
import { useStore } from '../../hooks';
import ModalTask from '../CommonModal/ModalTask';


function ManageTask() {

    const [state, dispatch] = useStore();
    const { tasks } = state;

    useEffect(() => {
        async function fetchData() {
            const response = await getTasks();
            const { data } = response;
            dispatch(setTasks(data.result))
       }

       fetchData();
    }, [dispatch])

    const handleAddTask = () => {
        dispatch(showModal({
            showModal: true,
            title: 'Thêm Mới Công Việc',
            component: <ModalTask />,
       }))
    }

    return (<>
        <Box mb={2}>
            <Button onClick={handleAddTask} variant='contained'>
                <AddIcon />
                Thêm mới công việc
            </Button>
        </Box> 
        <Grid container spacing={2}>
        {
            STATUS.map(status => {

                let taskFilter = [];
                if(status === STATUS[0]) {
                    taskFilter = tasks.filter(task => task.status === 1);
                }else if (status === STATUS[1]) {
                    taskFilter = tasks.filter(task => task.status === 2);
                }else {
                    taskFilter = tasks.filter(task => task.status === 3);
                }

                return (<Grid key={status} item xs={12} sm={4}>
                    <span style={{fontWeight: 'bold', padding: '8px 0 0 12px'}}>{status}</span>
                    {
                        taskFilter.map(task => (
                            <TaskItem task={task} key={task.Id} />
                        ))
                    }
                </Grid>)
            })
        }
    </Grid>
    </>)
}

export default ManageTask;