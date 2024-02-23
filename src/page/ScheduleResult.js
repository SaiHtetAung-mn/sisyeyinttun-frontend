import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";

export default function ScheduleResult({ sx={} }) {
    return (
        <Box sx={{ ...sx }}>
            <Typography variant="h6" mb={3}>Prioritized Task Schedule</Typography>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} >
                     Day 1
                </AccordionSummary>
                <AccordionDetails>
                    Hello world
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}