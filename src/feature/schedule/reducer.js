import { createSlice } from '@reduxjs/toolkit';

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        schedule: null,
        tasks: [],
        isLoading: false
    },
    reducers: {
        fetchingData: (state) => {
            state.isLoading = true;
        },
        fetchDataSuccess: (state, action) => {
            state.isLoading = false;
            state.schedule = action.payload;
        },
        fetchDataFail: (state) => {
            state.isLoading = false
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        }
    }
});

export const { 
    fetchingData,
    fetchDataSuccess,
    fetchDataFail,
    addTask,
    setTasks
} = scheduleSlice.actions;

export default scheduleSlice.reducer;