import React, { useState } from 'react';
import {
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Box,
    Select,
    MenuItem,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    FormControl,
    InputLabel,
} from '@mui/material';

const Home = () => {
    const [loanAmount, setLoanAmount] = useState('100000');
    const [interestRate, setInterestRate] = useState('8.5');
    const [term, setTerm] = useState('5');
    const [currency, setCurrency] = useState('$');
    const [monthlyPayment, setMonthlyPayment] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [errors, setErrors] = useState({
        loanAmount: false,
        interestRate: false,
        term: false,
    });

    const calculateLoan = () => {
        const isLoanValid = !!loanAmount;
        const isRateValid = !!interestRate;
        const isTermValid = !!term;

        setErrors({
            loanAmount: !isLoanValid,
            interestRate: !isRateValid,
            term: !isTermValid,
        });

        if (!isLoanValid || !isRateValid || !isTermValid) {
            setMonthlyPayment('');
            setSchedule([]);
            return;
        }

        const loan = parseFloat(loanAmount);
        const rate = parseFloat(interestRate) / 100 / 12;
        const months = parseFloat(term) * 12;

        if (isNaN(loan) || isNaN(rate) || isNaN(months) || loan <= 0 || rate <= 0 || months <= 0) {
            setMonthlyPayment('Enter valid values');
            return;
        }

        const x = Math.pow(1 + rate, months);
        const monthly = (loan * rate * x) / (x - 1);
        setMonthlyPayment(monthly.toFixed(2));

        let balance = loan;
        const amortization = [];

        for (let i = 1; i <= months; i++) {
            const interest = balance * rate;
            const principal = monthly - interest;
            balance -= principal;

            amortization.push({
                month: i,
                principal: principal.toFixed(2),
                interest: interest.toFixed(2),
                balance: balance > 0 ? balance.toFixed(2) : '0.00',
            });
        }

        setSchedule(amortization);
    };

    const resetForm = () => {
        setLoanAmount('');
        setInterestRate('');
        setTerm('');
        setCurrency('$');
        setMonthlyPayment('');
        setSchedule([]);
        setErrors({
            loanAmount: false,
            interestRate: false,
            term: false,
        });
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Loan Calculator Dashboard
            </Typography>

            {/* Input Fields */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Loan Amount"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        error={errors.loanAmount}
                        helperText={errors.loanAmount ? 'This field is required' : ''}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Interest Rate (%)"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        error={errors.interestRate}
                        helperText={errors.interestRate ? 'This field is required' : ''}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Term (Years)"
                        type="number"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        error={errors.term}
                        helperText={errors.term ? 'This field is required' : ''}
                    />
                </Grid>
            </Grid>

            {/* Calculate Button */}
            <Box justifyContent="center" sx={{ mb: 2 }}>
                <Button variant="contained" onClick={calculateLoan}>
                    Calculate
                </Button>
            </Box>

            {/* Monthly Payment */}
            {monthlyPayment && (
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Monthly Payment: {currency}{monthlyPayment}
                </Typography>
            )}

            {/* Amortization Table */}
            {schedule.length > 0 && (
                <Paper elevation={2} sx={{ mt: 4, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Amortization Schedule ({currency})
                    </Typography>

                    {/* Currency + Reset */}
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Currency</InputLabel>
                                <Select
                                    value={currency}
                                    label="Currency"
                                    onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <MenuItem value="$">USD</MenuItem>
                                    <MenuItem value="€">EUR</MenuItem>
                                    <MenuItem value="₹">INR</MenuItem>
                                    <MenuItem value="£">GBP</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                            <Button variant="outlined" color="error" onClick={resetForm}>
                                Reset Table
                            </Button>
                        </Grid>
                    </Grid>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Month</TableCell>
                                <TableCell>Principal ({currency})</TableCell>
                                <TableCell>Interest ({currency})</TableCell>
                                <TableCell>Remaining Balance ({currency})</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {schedule.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.month}</TableCell>
                                    <TableCell>{row.principal}</TableCell>
                                    <TableCell>{row.interest}</TableCell>
                                    <TableCell>{row.balance}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Box>
    );
};

export default Home;
