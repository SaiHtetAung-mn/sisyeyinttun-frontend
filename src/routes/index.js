import React from "react"
import { useRoutes } from "react-router-dom"
import RootLayout from "../layout/RootLayout"
import Home from "../page/Home"
import Task from "../page/Task"
import ScheduleResult from "../page/ScheduleResult"

const AppRoutes = () => {
    return useRoutes([{
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'tasks',
                element: <Task/>,
            },
            {
                path: 'schedule',
                element: <ScheduleResult/>
            }
        ]
    }])
};

export default AppRoutes;