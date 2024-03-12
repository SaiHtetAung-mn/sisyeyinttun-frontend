import React from "react";
import LandingImg from '../assets/images/landing.png';
import { Box } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <Box>
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
            <Grid container spacing={4} sx={{ mb: 10, mt: 5 }}>
                <Grid item lg={4} md={4} sm={6}>
                    <Box sx={{ height: '300px', textAlign: 'justify', paddingX: 4, paddingY: 8, borderRadius: 5, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;' }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>Importance</Typography>
                        <Typography variant="body1">Importance represents the long-term view: how significant the completion of the task is to the overall project, regardless of when it gets done. A task of highest importance might be business critical, even if you leave it a few months.</Typography>
                    </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={6}>
                    <Box sx={{ height: '300px', textAlign: 'justify', paddingX: 4, paddingY: 8, borderRadius: 5, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;' }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>Urgency</Typography>
                        <Typography variant="body1">Urgency represents the short-term view: how time-sensitive the task is, regardless of whether the task actually matters or not in the grand scheme. An urgent task is one that will be of less value if not done soon; or alternatively, it will lose value the longer it is left.</Typography>
                    </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={6}>
                    <Box sx={{ height: '300px', textAlign: 'justify', paddingX: 4, paddingY: 8, borderRadius: 5, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;' }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>Easiness</Typography>
                        <Typography variant="body1">Easiness refers to how effortless it is to complete a task. Task with high ease can be done quickly and simply, with minimal resources or expertise.</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}