import { Button, Card, FormLabel, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import TaskForm from "./TaskForm";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from "../components/LoadingButton";
import AddIcon from '@mui/icons-material/AddCircleOutline';
import { useSchedule } from "../feature";
import ScheduleResult from "./ScheduleResult";

const Task = () => {
    const { isLoading, tasks, schedule, updateTask, createNewTask, deleteTask, generateSchedule } = useSchedule();
    const [csvMode, setCsvMode] = React.useState(false);
    const [timePerDay, setTimePerDay] = React.useState(null);
    const [task, setTask] = React.useState({ open: false, mode: 'create', taskToEdit: null });

    const taskColumns = [
        { field: 'orderId', headerName: 'Id' },
        { field: 'description', headerName: 'Description', flex: 1, sortable: false },
        { field: 'importance', headerName: 'Importance', flex: 1, sortable: false },
        { field: 'urgency', headerName: 'Urgency', flex: 1, sortable: false },
        { field: 'easiness', headerName: 'Easiness', flex: 1, sortable: false },
        { field: 'estimatedTime', headerName: 'Estimated Time', flex: 1, sortable: false },
        { field: 'dependency', headerName: 'Dependency', flex: 1, sortable: false, renderCell: param => (param.value || 'N/A') },
        { field: 'action', headerName: 'Action', sortable: false, flex: 1, renderCell: param => (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button sx={{ minWidth: 'unset', p: 0 }} onClick={() => deleteTask(param.value)}><DeleteForeverIcon sx={{ cursor: 'pointer', color: 'red' }}/></Button>
                <Button sx={{ minWidth: 'unset', p: 0 }} onClick={() => editTask(param.value)}><EditIcon sx={{ cursor: 'pointer', color: '#191154' }}/></Button>
            </Box>
        ) },
    ];

    const CreateData = (list=[]) => {
        return list.map(item => ({
            ...item,
            action: item.id
        }))
    }

    function generate() {
        generateSchedule(timePerDay)
        .then(data => console.log(data))
        .catch(err => console.error(err));
    }

    function editTask(taskId) {
        setTask(prevState => (
            { ...prevState, open: true, mode: 'edit', taskToEdit: tasks.find(t => t.id == taskId) }
        ));
    }

    return (
        <Box>
            <TaskForm mode={task.mode} open={task.open} taskToEdit={task.taskToEdit} onClose={() => setTask(prevState => ({ ...prevState, open: false }))} addNewTask={createNewTask} editTask={updateTask}/>
            <Typography variant="h5" sx={{ mt: 3 }}>What are your tasks?</Typography>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontSize: '90%' }}>Form</Typography>
                <Switch checked={csvMode} onChange={(e) => setCsvMode(e.target.checked)} inputProps={{ 'aria-label': 'controlled' }}/>
                <Typography variant="subtitle1" sx={{ fontSize: '90%' }}>CSV file</Typography>
            </Box> */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormLabel>Time per day (hour)</FormLabel>
                    <TextField size="small" sx={{ width: '70px' }} value={timePerDay} onChange={(e) => setTimePerDay(e.target.value)}/>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" sx={{ borderRadius: '30px' }} onClick={() => setTask(prevState => ({ ...prevState, open: true, mode: 'create', taskToEdit: null }))}><AddIcon sx={{ mr: 1 }}/> Add new task</Button>
                    <LoadingButton isLoading={isLoading} loadingLabel="Generating" onClick={generate} disabled={!(Number(timePerDay) && tasks.length > 0)}>Generate Schedule</LoadingButton>
                </Box>
            </Box>
            <DataGrid
                sx={{ mt: 5 }}
                rows={CreateData(tasks)}
                columns={taskColumns}
                pageSizeOptions={[5, 10]}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                onCellClick={(e) => {e.defaultMuiPrevented = false}}
            />
            <ScheduleResult sx={{ mt: 5 }}/>
        </Box>
    )
}

export default Task;