import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routesConfig from './pages/router';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from '@mui/x-date-pickers';
import ruLocale from "date-fns/locale/ru";

import { NotFound } from './pages/NotFound'
import { ProtectedRoute } from './components/ProtectedRoute';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
      <Router>
        <Routes>
          {routesConfig.map(({ path, element, isProtected, isHideAfterAuth }) => 
          (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute isHideAfterAuth={isHideAfterAuth} isProtected={isProtected}>{element}</ProtectedRoute>}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
};

export default App;
