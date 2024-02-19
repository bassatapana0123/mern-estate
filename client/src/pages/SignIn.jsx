import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure
} from '../redux/user/userSlice';
import OAuth from '../component/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
      // ตรวจสอบว่ามีข้อมูลใน formData หรือไม่
  if (!formData.email || !formData.password) {
    dispatch(signInFailure("Please fill in all fields."));
    return;
  }
    try {
      dispatch(signInStart()); // เริ่มต้นกระบวนการล็อกอิน
      const res = await fetch('/api/auth/signin', 
      {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if(data.success === false){
        dispatch(signInFailure(data.message)); // ล็อกอินไม่สำเร็จ
        return;
      }
      dispatch(signInSuccess(data)); // ล็อกอินสำเร็จ, อัพเดต state ด้วยข้อมูลผู้ใช้
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="email"
          name=""
          id='email'
          placeholder='email'
          className='border p-3 rounded-lg focus:border-blue-500 focus:outline-none'
          onChange={handleChange}
        />
        <input
          type="password"
          name=""
          id='password'
          placeholder='password'
          className='border p-3 rounded-lg focus:border-blue-500 focus:outline-none'
          onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign in'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
