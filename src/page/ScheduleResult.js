import { Accordion, AccordionDetails, AccordionSummary, Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";
import { useSchedule } from "../feature";
import TimeIcon from '@mui/icons-material/AccessTime';

const taskColors = ["#C200FB", "#87BBA2", "#F6511D", "#241623", "#DF2935", "#533B4D"];
let prevColor = "";

function pickRandomBgColor() {
    const min = 0;
    const max = taskColors.length - 1;
    let resultColor = "";
    do {
        resultColor = taskColors[Math.round(Math.random()*(max-min)+min)];
    }
    while(resultColor == prevColor);

    prevColor = resultColor;
    return resultColor;
}

export default function ScheduleResult({ sx={} }) {
    const { schedule } = useSchedule();
    return (
        <Box sx={{ ...sx }}>
            <Typography variant="h6" mb={3}>Prioritized Task Schedule</Typography>
            <Box sx={{ width: '100%', p: 4, background: 'whitesmoke', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {
                    schedule.map((tasks, index) => {
                        return (
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} >
                                    Day {index+1}
                                </AccordionSummary>
                                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                    <Grid container spacing={2}>
                                        {
                                            tasks.map(t => {
                                                return (
                                                    <Grid item md={12} lg={12}>
                                                        <Card sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', gap: 5, paddingX: 3, paddingY: 5, bgcolor: pickRandomBgColor()}}>
                                                            <Box sx={{ display: 'flex', flexGrow: 100, gap: 1, alignItems: 'center', width: '100px', justifyContent: 'flex-end' }}>
                                                                <TimeIcon sx={{ width: '20px', color: 'white' }}/>
                                                                <Typography variant="body2" color="white" sx={{ fontSize: '80%' }}>{parseInt(t.estimatedTime)} hour</Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography variant="h6" color="white">{t.title}</Typography>
                                                                <Typography variant="caption" color="white">{t.description}</Typography>
                                                            </Box>
                                                        </Card>
                                                    </Grid>
                                                )
                                            })
                                        }
                                        {/* <Grid item md={12} lg={12}>
                                            <Card sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', gap: 5, paddingX: 3, paddingY: 5, bgcolor: pickRandomBgColor()}}>
                                                <Box sx={{ display: 'flex', flexGrow: 100, gap: 1, alignItems: 'center', width: '100px', justifyContent: 'flex-end' }}>
                                                    <TimeIcon sx={{ width: '20px', color: 'white' }}/>
                                                    <Typography variant="body2" color="white" sx={{ fontSize: '80%' }}>1 hour</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" color="white">Project</Typography>
                                                    <Typography variant="caption" color="white">Browse through the icons below to find the one you need. The search field supports synonyms—for example, try searching for "hamburger" or "logout."</Typography>
                                                </Box>
                                            </Card>
                                        </Grid>
                                        <Grid item md={12} lg={12}>
                                            <Card sx={{ display: 'flex', justifyContent: 'space-between', p: 3, bgcolor: pickRandomBgColor()}}>
                                                <Box>
                                                    <Typography variant="h6" color="white">Assignment</Typography>
                                                    <Typography variant="caption" color="white">This is description</Typography>
                                                </Box>
                                                <Typography variant="body1" color="white">1 hour</Typography>
                                            </Card>
                                        </Grid>
                                        <Grid item md={12} lg={12}>
                                            <Card sx={{ display: 'flex', justifyContent: 'space-between', p: 3, bgcolor: pickRandomBgColor()}}>
                                                <Box>
                                                    <Typography variant="h6" color="white">Project</Typography>
                                                    <Typography variant="caption" color="white">This is description</Typography>
                                                </Box>
                                                <Typography variant="body1" color="white">1 hour</Typography>
                                            </Card>
                                        </Grid>
                                        <Grid item md={12} lg={12}>
                                            <Card sx={{ display: 'flex', justifyContent: 'space-between', p: 3, bgcolor: pickRandomBgColor()}}>
                                                <Box>
                                                    <Typography variant="h6" color="white">Assignment</Typography>
                                                    <Typography variant="caption" color="white">This is description</Typography>
                                                </Box>
                                                <Typography variant="body1" color="white">1 hour</Typography>
                                            </Card>
                                        </Grid> */}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
                {/* <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} >
                        Day 1
                    </AccordionSummary>
                    <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Grid container spacing={2}>
                            <Grid item md={12} lg={12}>
                                <Card sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', gap: 5, paddingX: 3, paddingY: 5, bgcolor: pickRandomBgColor()}}>
                                    <Box sx={{ display: 'flex', flexGrow: 100, gap: 1, alignItems: 'center', width: '100px', justifyContent: 'flex-end' }}>
                                        <TimeIcon sx={{ width: '20px', color: 'white' }}/>
                                        <Typography variant="body2" color="white" sx={{ fontSize: '80%' }}>1 hour</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" color="white">Project</Typography>
                                        <Typography variant="caption" color="white">Browse through the icons below to find the one you need. The search field supports synonyms—for example, try searching for "hamburger" or "logout."</Typography>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item md={12} lg={12}>
                                <Card sx={{ display: 'flex', justifyContent: 'space-between', p: 3, bgcolor: pickRandomBgColor()}}>
                                    <Box>
                                        <Typography variant="h6" color="white">Assignment</Typography>
                                        <Typography variant="caption" color="white">This is description</Typography>
                                    </Box>
                                    <Typography variant="body1" color="white">1 hour</Typography>
                                </Card>
                            </Grid>
                            <Grid item md={12} lg={12}>
                                <Card sx={{ display: 'flex', justifyContent: 'space-between', p: 3, bgcolor: pickRandomBgColor()}}>
                                    <Box>
                                        <Typography variant="h6" color="white">Project</Typography>
                                        <Typography variant="caption" color="white">This is description</Typography>
                                    </Box>
                                    <Typography variant="body1" color="white">1 hour</Typography>
                                </Card>
                            </Grid>
                            <Grid item md={12} lg={12}>
                                <Card sx={{ display: 'flex', justifyContent: 'space-between', p: 3, bgcolor: pickRandomBgColor()}}>
                                    <Box>
                                        <Typography variant="h6" color="white">Assignment</Typography>
                                        <Typography variant="caption" color="white">This is description</Typography>
                                    </Box>
                                    <Typography variant="body1" color="white">1 hour</Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion> */}
            </Box>
        </Box>
    )
}