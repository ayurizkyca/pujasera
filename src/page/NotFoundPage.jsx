import React from 'react'
import ImageNotFound from '../assets/image/not-found.svg'
import ButtonBasic from '../component/ButtonBasic'
import { ROUTES } from '../constant/routesConstant'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center space-y-[100px]'>
      <img className='w-[500px]' src={ImageNotFound} alt="image-not-found" />
      <ButtonBasic title={"Back to Home"} onClick={handleClick}></ButtonBasic>
    </div>
  )
}
