import React from 'react'
import CardResto from '../component/CardResto.jsx'
import { restoData } from '../../public/data/restoData.js'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constant/routesConstant.jsx'
import { Typography } from 'antd'

const PortalRestoPage = () => {
    const navigate = useNavigate();

    const handleRestoClick = (id) => {
        navigate(`${ROUTES.DETAIL_RESTO}/${id}`);
    }

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
