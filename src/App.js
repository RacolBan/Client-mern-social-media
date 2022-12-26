import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import {CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import NotFound from './scenes/notfound/NotFound';
function App() {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector(state => state.token));
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={isAuth ? <HomePage /> : <Navigate to='/login' />}> </Route> 
          <Route path='/login' element={isAuth ? <Navigate to='/' /> : <LoginPage />} />
          <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to='/' />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
