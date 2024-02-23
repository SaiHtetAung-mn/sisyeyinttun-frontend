import React from "react";
import LandingImg from '../assets/images/landing.png';
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingY: 2, paddingX: 1, position: 'relative' }}>
            <img src={LandingImg} width="40%"/>
            <Box sx={{ position: 'absolute', left: 0, top: '100px', zIndex: 1 }}>
                <Typography variant="h3" color="primary">Sculpt Your Schedule!</Typography>
                <Typography variant="h6" sx={{ maxWidth: '50%', mt: 2, color: 'GrayText' }}>
                    Say Goodbyes to chaos and hello to efficiency as you seamlessly organize your tasks, prioritize your objectives, and optimize your time allocation.
                </Typography>
                <Link to="/tasks">
                    <Button variant="contained" sx={{ mt: 2, bgcolor: 'primary', borderRadius: '30px' }}>Get Started</Button>
                </Link>
            </Box>
        </Box>
    )
}