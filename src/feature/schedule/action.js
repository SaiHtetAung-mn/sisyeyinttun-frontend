import { useDispatch, useSelector } from "react-redux"
import { fetchingData, fetchDataSuccess, fetchDataFail, addTask, setTasks } from "./reducer";
import ApiRequest from "../../utils/apiRequest";

const useScheduleActions = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.schedule.tasks);

    function generateSchedule(timePerDay) {
        return new Promise((resolve, reject) => {
            dispatch(fetchingData());
            const modifiedTasks = tasks.map(t => ({
                ...t,
                orderId: parseInt(t.orderId),
                urgency: parseInt(t.urgency),
                easiness: parseInt(t.easiness),
                importance: parseInt(t.importance),
                dependency: t.dependency ? parseInt(t.dependency) : null,
                estimatedTime: parseFloat(Number(t.estimatedTime).toFixed(1))
            }))
            const url = '/generate';
            ApiRequest.post(url, { timePerDay: parseFloat(timePerDay), tasks: modifiedTasks })
            .then(res => {
                dispatch(fetchDataSuccess(res.data));
                resolve(res.data);
            })
            .catch(err => {
                dispatch(fetchDataFail());
                reject(err);
            })
        });
    }

    function createNewTask(task) {
        dispatch(addTask(task));
    }

    function updateTask(taskId, data) {
        const modifiedTasks = tasks.map(t => {
            if(t.id !== taskId) 
                return t;

            return ({ ...data, id: taskId });
        });

        dispatch(setTasks(modifiedTasks));
    }

    function deleteTask(taskId) {
        const modifiedTasks = tasks.filter(t => t.id !== taskId);
        dispatch(setTasks(modifiedTasks));
    }

    return {
        generateSchedule,
        createNewTask,
        updateTask,
        deleteTask
    }
}

export default useScheduleActions;