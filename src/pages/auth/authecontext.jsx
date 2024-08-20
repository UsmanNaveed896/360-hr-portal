import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [role,setRole]=useState(null)
  const navigate = useNavigate();

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      setAuth(token);
      setRole(role)
    } 
    else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ auth, setAuth,role }}>
      {children}
    </AuthContext.Provider>
  );
};
