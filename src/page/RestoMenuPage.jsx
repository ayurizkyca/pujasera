import React from 'react'
import CardMenu from '../component/CardMenu.jsx'
import { restoData } from '../../public/data/restoData.js'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'

const RestoMenuPage = () => {
    const { id } = useParams();
    console.log(id);
    const resto = restoData.find((r) => r.id === id);

    return (
        <>
            <Typography.Title>{resto?.title}</Typography.Title>
            <div className='flex flex-wrap gap-3'>
                {resto?.menus.map(card => (
                    <CardMenu
                        key={card.id}
                        name={card.name}
                        description={card.description}
                        imageUrl={card.imageUrl}
                        id={card.id}
                        price={card.price}
                    />
                ))}
            </div>
        </>

    )
}

export default RestoMenuPage
