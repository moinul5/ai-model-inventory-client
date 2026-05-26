import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from './Loader';

function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loader></Loader>;
    }

     if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children
}

export default PrivateRoute