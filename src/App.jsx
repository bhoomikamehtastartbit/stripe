import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Payment from './module/Payment';
import NavBar from './components/NavBar';
import Subscribe from './module/Subscribe';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [auth, setAuth] = useState();

  useEffect(() => {
    const email = localStorage.getItem('email');
    setAuth(email);
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Subscribe />} />
        {!auth && (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        ) }
         <Route
            path="/payment"
            element={
              <ProtectedRoute auth={auth}>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
