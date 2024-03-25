import React from 'react'
import CardResto from '../component/CardResto.jsx'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constant/routesConstant.jsx'
import { Typography } from 'antd'
import { useSelector } from 'react-redux'

const PortalRestoPage = () => {
  const navigate = useNavigate();

  const handleRestoClick = (id) => {
    navigate(`${ROUTES.DETAIL_RESTO}/${id}`);
  }

  const restos = useSelector((state) => state.menu.resto)
  const restoData = restos.map(resto => {
    return {
      id: resto.id,
      title: resto.title,
      description: resto.description,
      bgImage: resto.bgImage
    }
  })

  return (
    <>
      <Typography.Title level={3}>Portal Resto</Typography.Title>
      <div className='flex flex-wrap gap-3'>
        {restoData.map(card => (
          <CardResto
            key={card.id}
            title={card.title}
            description={card.description}
            onClick={handleRestoClick}
            id={card.id}
            bgImage={card.bgImage}
          />
        ))}
      </div>
    </>

  )
}

export default PortalRestoPage
