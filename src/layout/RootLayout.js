import { AppBar, Container, List, ListItem, Typography } from "@mui/material"
import { Box } from "@mui/system";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <Box sx={{ bgcolor: 'background.default' }}>
            <AppBar position="sticky" elevation={0} color="default" sx={{ bgcolor: 'background.default', margin: 0, p: 1, boxShadow: '0 2px 4px 0 rgba(0,0,0,.1)' }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5">Timecraft</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <List role="menubar" sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Link to="/">
                                <ListItem role="none">Home</ListItem>
                            </Link>
                            <Link to="/tasks">
                                <ListItem role="none">Task</ListItem>
                            </Link>
                        </List>
                    </Box>
                </Container>
            </AppBar>
            <Container maxWidth="lg" sx={{ paddingY: 4 }}>
                <Outlet/>
            </Container>
        </Box>
    )
}

export default RootLayout;