import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Navbar from './pages/Navbar';
import Home from './pages/Home';
import ExchangeRates from './pages/ExchangeRates';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import ThemeProvider from './theme/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exchange_rates" element={<ExchangeRates />} />
            <Route path="/about" element={<About />} />
            <Route path="/errorpage" element={<ErrorPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
