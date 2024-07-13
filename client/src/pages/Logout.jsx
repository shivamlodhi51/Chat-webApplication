import React from 'react';
import {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import { useAuth } from '../store/auth';
import {toast} from "react-toastify";

const Logout = () => {

    const {LogoutUser} = useAuth();

  useEffect(()=>{
    LogoutUser();
  }, [LogoutUser]);
  toast.success("Log out successfull");
  return <Navigate to="/" />
};
export default Logout