

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TranslationProvider } from './hooks/useTranslations';
import { ThemeProvider } from './hooks/useTheme';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <TranslationProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Add other routes here as needed */}
            </Routes>
          </Router>
        </TranslationProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}