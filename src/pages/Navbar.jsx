import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Loan Calculator
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/exchange_rates">Exchange Rates</Button>
                <Button color="inherit" component={Link} to="/about">About</Button>
                <Button color="inherit" component={Link} to="/errorpage">Error Page</Button>
            </Box>
            <Box sx={{ ml: 2 }}>
                <ThemeToggle />
            </Box>
        </Toolbar>
    </AppBar>
);

export default Navbar;
