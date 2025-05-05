import React from 'react';
import { Container, Typography } from '@mui/material';

const AboutPage = () => (
    <Container sx={{ mt: 4 }}>
        <Typography variant="h4">About the Loan Calculator</Typography>
        <Typography variant="body1" mt={2}>
            This loan calculator uses the standard EMI formula to calculate your monthly installments.
            It helps you estimate your payment schedule based on loan amount, interest rate, and loan duration.
        </Typography>
    </Container>
);

export default AboutPage;
