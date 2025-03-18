import React, { useState } from 'react';
import Header from './Header';
import {datasubmit} from '../../Services/Handleservices'
import {Link, useNavigate} from 'react-router-dom';
import Toast from './Toast';
const SignUp = () => {
        const [showToast, setShowToast] = useState(false);
        const [toastMessage, setToastMessage] = useState('');
        const [toastType, setToastType] = useState('success');

    const [data, setData] = useState({
        First: '',
        Last: '',
        Email: '',
        Password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Form Submitted:', data);
        // Handle form submission logic (e.g., API call)
        try{
            const response  = await datasubmit(data)
            const datas = response.data;
            console.log(datas.msg);
            setToastMessage('Ready to Login')
            setToastType('success')
            setShowToast(true)
        }
        catch(err){
            console.log(err)
        }
        setTimeout(() => navigate("/login"), 2000);
    };

    return (
        <div>
             <Toast
            message={toastMessage}
            type={toastType}
            showToast={showToast}
            setShowToast={setShowToast}
          />
            {/* <Header /> */}
            <div className='relative pt-32 flex justify-center'>
                <div className='rounded-xl shadow-xl border p-6 w-96 flex flex-col gap-4 bg-dgry'>
                    <h1 className='text-2xl font-bold text-rup '>Sign Up</h1>
                    <p className=' text-rup'>Sign up to get access to our website</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <div className=' grid grid-cols-2 gap-2'>             
                            <input
                            type='text'
                            name='First'
                            placeholder='First Name'
                            value={data.First}
                            onChange={handleChange}
                            className='border p-4 rounded-lg w-full'
                            required
                        />
                        <input
                            type='text'
                            name='Last'
                            placeholder='Last Name'
                            value={data.Last}
                            onChange={handleChange}
                            className='border p-4 rounded-lg w-full'
                            
                        />
                        </div>
                        <input
                            type='email'
                            name='Email'
                            placeholder='Email'
                            value={data.Email}
                            onChange={handleChange}
                            className='border p-4 rounded-lg w-full'
                            required
                        />
                        <input
                            type='password'
                            name='Password'
                            placeholder='Password'
                            value={data.Password}
                            onChange={handleChange}
                            className='border p-4 rounded-lg w-full'
                            required
                        />
                        <button
                            type='submit'
                            className='bg-blue-500 flex justify-center text-white p-2 rounded-lg hover:bg-blue-600'
                        >
                            Sign In
                        </button>
                    </form>
                    <p className='text-rup'>Already have an account? <strong><Link to="/login">LOGIN</Link></strong></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;