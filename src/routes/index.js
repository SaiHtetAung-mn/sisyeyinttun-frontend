import React from "react"
import { useRoutes } from "react-router-dom"
import RootLayout from "../layout/RootLayout"
import Home from "../page/Home"
import Task from "../page/Task"

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
                element: <Task/>
            }
        ]
    }])
};

export default AppRoutes;