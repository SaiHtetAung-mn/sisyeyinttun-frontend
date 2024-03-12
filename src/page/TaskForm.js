import { Button, Dialog, DialogContent, DialogTitle, Divider, FormHelperText, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { useSchedule } from "../feature";

const TaskForm = ({ addNewTask, editTask, open=false, onClose, mode="create", taskToEdit=null }) => {
    const {
        register,
        reset,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({
        defaultValues: taskToEdit
    });

    const { tasks } = useSchedule();

    function onSubmit(data) {
        if(data.dependency) {
            const isDependencyExist = tasks.find(t => t.orderId == data.dependency);
            if(!isDependencyExist) {
                return setError("dependency", { message: `No task found with id ${data.dependency}` });
            }
        }
        const exec = mode == 'create' ? () => addNewTask({ ...data, id: Date.now() }) : () => editTask(taskToEdit.id, data);
        exec();
        onClose();
    }

    React.useEffect(() => {
        return reset;
    }, [open]);

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6">New Task</Typography>
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <Box 
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Box>
                        <TextField
                            fullWidth
                            label="Task Id"
                            variant="outlined"
                            size="small"
                            defaultValue={taskToEdit?.orderId}
                            error={Boolean(errors.orderId)}
                            // helperText={errors.orderId?.message ?? ''}
                            {
                                ...register('orderId', {
                                    required: 'Order Number is required',
                                    pattern: {
                                        value: /\d/,
                                        message: 'Invalid value! Must be number.'
                                    }
                                })
                            }
                        />
                        <FormHelperText sx={{color: '#FF0000'}}>
                                {errors.orderId?.message ?? ''}
                        </FormHelperText>
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            label="Task Title"
                            variant="outlined"
                            size="small"
                            defaultValue={taskToEdit?.title}
                            error={Boolean(errors.title)}
                            // helperText={errors.orderId?.message ?? ''}
                            {
                                ...register('title', {
                                    required: 'Task Title is required',
                                })
                            }
                        />
                        <FormHelperText sx={{color: '#FF0000'}}>
                                {errors.title?.message ?? ''}
                        </FormHelperText>
                    </Box>
                    {/* <Box>
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            size="small"
                            defaultValue={taskToEdit?.description}
                            error={Boolean(errors.description)}
                            {
                                ...register('description', {
                                    required: 'Description is required'
                                })
                            }
                        />
                        <FormHelperText sx={{color: '#FF0000'}}>
                                {errors.description?.message ?? ''}
                        </FormHelperText>
                    </Box> */}
                    <Box>
                        <TextField
                            fullWidth
                            label="Importance (1-5)"
                            variant="outlined"
                            size="small"
                            defaultValue={taskToEdit?.importance}
                            error={Boolean(errors.importance)}
                            {
                                ...register('importance', {
                                    required: 'Importance Rating is required',
                                    pattern: {
                                        value: /[1-5]/,
                                        message: 'Invalid value! Must be number range 1-5.'
                                    }
                                })
                            }
                        />
                        <FormHelperText sx={{color: '#FF0000'}}>
                                {errors.importance?.message ?? ''}
                        </FormHelperText>
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            label="Urgency (1-5)"
                            variant="outlined"
                            defaultValue={taskToEdit?.urgency}
                            size="small"
                            error={Boolean(errors.urgency)}
                            {
                                ...register('urgency', {
                                    required: 'Urgency Rating is required',
                                    pattern: {
                                        value: /[1-5]/,
                                        message: 'Invalid value! Must be number range 1-5.'
                                    }
                                })
                            }
                        />
                        <FormHelperText sx={{color: '#FF0000'}}>
                                {errors.urgency?.message ?? ''}
                        </FormHelperText>
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            label="Easiness (1-5)"
                            variant="outlined"
                            defaultValue={taskToEdit?.easiness}
                            size="small"
                            error={Boolean(errors.easiness)}
                            {
                                ...register('easiness', {
                                    required: 'Easiness Rating is required',
                                    pattern: {
                                        value: /[1-5]/,
                                        message: 'Invalid value! Must be number range 1-5.'
                                    }
                                })
                            }
                        />
                        <FormHelperText sx={{color: '#FF0000'}}>
                                {errors.easiness?.message ?? ''}
                        </FormHelperText>
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            defaultValue={taskToEdit?.estimatedTime}
                            label="Estimated Time (hour)"
                            variant="outlined"
                            size="small"
                            error={Boolean(errors.estimatedTime)}
                            {
                                ...register('estimatedTime', {
                                    required: 'Estimated Time is required',
                                    pattern: {
                                        value: /\d/,
                                        message: 'Invalid value! Must be number 1-5'
                                    }
                                })
                            }
                        />
                        <FormHelperText sx={{color: '#FF0000'}}>
                                {errors.estimatedTime?.message ?? ''}
                        </FormHelperText>
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            label="Dependency"
                            defaultValue={taskToEdit?.dependency}
                            variant="outlined"
                            size="small"
                            error={Boolean(errors.dependency)}
                            {
                                ...register('dependency', {
                                    pattern: {
                                        value: /\d/,
                                        message: 'Invalid value! Must be number.'
                                    }
                                })
                            }
                        />
                        <FormHelperText sx={{color: '#FF0000'}}>
                                {errors.dependency?.message ?? ''}
                        </FormHelperText>
                    </Box>
                </Box>
            </DialogContent>
            <Divider/>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, p: 3 }}>
                <Button variant="outlined" sx={{ borderRadius: '30px' }} onClick={onClose}>Close</Button>
                <Button variant="contained" sx={{ borderRadius: '30px' }} onClick={handleSubmit(onSubmit)}>{mode == 'create' ? "Add New" : "Update"}</Button>
            </Box>
        </Dialog>
    )
}

export default TaskForm;