import React from 'react'
import ImagePujasera from "../assets/image/pujasera.png"
import FormBasic from '../component/FormLogin'

export default function LoginPage() {
  return (
    <div className='min-h-screen mx-auto'>
      <div className='grid lg:grid-cols-5 md:grid-cols-2'>
        <div className='hidden h-screen bg-black md:block lg:col-span-3'>
          <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" alt="image-login" className='w-full h-full object-cover' />
        </div>
        <div className='h-screen px-10 lg:col-span-2 space-y-5 flex flex-col justify-center items-center'>
          <div className='flex flex-col items-center'>
            <img src={ImagePujasera} alt="logo-pujasera" className='mb-[20px]' />
            <h1 className='text-xl font-bold text-red-700'>Welcome Back!</h1>
            <p>Happy to See You Again</p>
          </div>
          <div className='flex justify-center w-[25vw] items-center'>
            <FormBasic />
          </div>
        </div>
      </div>
    </div>

  )
}
