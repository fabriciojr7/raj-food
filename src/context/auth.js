import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [client, setClient] = useState(null);
  const [adm, setAdm] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const recoveredClient = localStorage.getItem('cliente');

    if (recoveredClient) {
      setClient(JSON.parse(recoveredClient));
    }
  }, []);

  useEffect(() => {
    const recoveredAdm = localStorage.getItem('adm');

    if (recoveredAdm) {
      setAdm(JSON.parse(recoveredAdm));
    }
  }, []);

  const loginClient = async (email, senha) => {
    const data = await AuthService.realizalogin({ email, password: senha });
    const loggedClient = { id: data.user.id, email: data.user.email, nome: data.user.nome };
    const { token } = data.token;

    localStorage.setItem('cliente', JSON.stringify(loggedClient));
    localStorage.setItem('token', token);
    setClient(loggedClient);
    navigate('/');
  };

  const logoutClient = async () => {
    await AuthService.realizalogout();
    localStorage.removeItem('cliente');
    localStorage.removeItem('token');
    setClient(null);
  };

  const loginAdm = async (email, senha) => {
    const data = await AuthService.realizalogin({ email, password: senha });
    const loggedAdm = { id: data.user.id, email: data.user.email, nome: data.user.nome };
    const { token } = data.token;

    localStorage.setItem('adm', JSON.stringify(loggedAdm));
    localStorage.setItem('token', token);
    setAdm(loggedAdm);
    navigate('/adm');
  };

  const logoutAdm = async () => {
    await AuthService.realizalogout();
    localStorage.removeItem('adm');
    localStorage.removeItem('token');
    setAdm(null);
    navigate('/adm/login');
  };

  const value = useMemo(() => ({
    clientAuthenticated: !!client,
    client,
    loginClient,
    logoutClient,
    admAuthenticated: !!adm,
    adm,
    loginAdm,
    logoutAdm,
  }), [loginClient, logoutClient, client, loginAdm, logoutAdm, adm]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
