import { useSelector } from "react-redux";
import useScheduleActions from "./action"

export const useSchedule = () => {
    const { generateSchedule, createNewTask, updateTask, deleteTask } = useScheduleActions();

    const isLoading = useSelector(state => state.schedule.isLoading);
    const tasks = useSelector(state => state.schedule.tasks);
    const schedule = useSelector(state => state.schedule.schedule);

    return {
        isLoading,
        tasks,
        schedule,
        generateSchedule,
        createNewTask,
        updateTask,
        deleteTask
    }
}

export { default as scheduleReducer } from './reducer';