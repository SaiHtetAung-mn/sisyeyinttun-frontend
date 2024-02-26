import { Accordion, AccordionDetails, AccordionSummary, Button, Card, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useRef } from "react";
import { useSchedule } from "../feature";
import TimeIcon from '@mui/icons-material/AccessTime';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';
import html2Canvas from 'html2canvas'

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
    const pdfRef = useRef(null);
    const [downloadDialog, setDialog] = React.useState({ open: false });

    function downloadAsPdf() {
        const input = pdfRef.current;

        html2Canvas(input).then((canvas) => {
            const imgWidth = 208;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 20;
            heightLeft -= pageHeight;
            const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' });
            doc.addImage(canvas, 'PNG', 20, position, imgWidth, imgHeight, '', 'FAST');
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(canvas, 'PNG', 20, position, imgWidth, imgHeight, '', 'FAST');
                heightLeft -= pageHeight;
            }
            doc.save('schedule.pdf');
        });
    }

    return (
        <>
            <Dialog open={downloadDialog.open} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Typography variant="h6">Preview</Typography>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} ref={pdfRef} >
                        <Typography variant="caption" sx={{ fontSize: '80%', mb: 5 }}>Time per day: {schedule?.timePerDay} hour</Typography>
                        {
                            schedule?.tasks.map((tasks, index) => {
                                return (
                                    <Box sx={{ mb: 5 }}>
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Day {index+1}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                            <Grid container spacing={3}>
                                                {
                                                    tasks.map(t => {
                                                        return (
                                                            <Grid item md={12} lg={12}>
                                                                <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', gap: 5, paddingX: 3, paddingY: 5, bgcolor: pickRandomBgColor()}}>
                                                                    <Box sx={{ display: 'flex', flexGrow: 100, gap: 1, alignItems: 'center', width: '100px', justifyContent: 'flex-end' }}>
                                                                        <TimeIcon sx={{ width: '20px', color: 'white' }}/>
                                                                        <Typography variant="body2" color="white" sx={{ fontSize: '80%' }}>{parseInt(t.estimatedTime)} hour</Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="subtitle1" color="white" sx={{ fontSize: '80%' }}>{t.title}</Typography>
                                                                        <Typography variant="caption" color="white" sx={{ fontSize: '50%' }}>{t.description}</Typography>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </DialogContent>
                <Divider/>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, p: 3 }}>
                    <Button variant="outlined" sx={{ borderRadius: '30px' }} onClick={() => setDialog({open: false})}>Close</Button>
                    <Button variant="contained" sx={{ borderRadius: '30px' }} onClick={downloadAsPdf}>Download</Button>
                </Box>
            </Dialog>

            <Box sx={{ ...sx, paddingY: 6 }}>
                <Box sx={{ display: 'flex', mb: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Prioritized Task Schedule</Typography>
                    <Button variant="contained" sx={{ borderRadius: '30px', fontSize: '80%' }} onClick={() => setDialog({open: true})}>
                        <DownloadIcon sx={{ mr: 2 }}/>
                        Download pdf
                    </Button>
                </Box>
                <Box sx={{ paddingX: 4, paddingY: 6, background: 'whitesmoke', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="caption" sx={{ fontSize: '80%' }}>Time per day: {schedule?.timePerDay} hour</Typography>
                    {
                        schedule?.tasks.map((tasks, index) => {
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
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                    }
                </Box>
            </Box>
        </>
    )
}