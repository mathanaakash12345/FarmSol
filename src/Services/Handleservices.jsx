import react from 'react';
import axios  from 'axios';

const URl = `http://localhost:5000`

export const datasubmit = async (userdata)=>{
    return axios.post (`${URl}/add/user`,userdata)
}

export const contactinfo  = async(usercontactinfo)=>{
    return axios.post(`${URl}/add/contactinfo`,usercontactinfo)
}

export const agriinfo = async(agridata)=>{
    return axios.post(`${URl}/add/agri`,agridata)
}

export const filesaves = async(filedata)=>{
    return axios.post(`${URl}/filesaves`,filedata)
}

export const finduser = async (userdata)=>{
    return axios.post(`${URl}/finduser`,userdata)
}