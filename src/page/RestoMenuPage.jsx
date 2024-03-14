import React from 'react'
import CardMenu from '../component/CardMenu.jsx'
import { restoData } from '../../public/data/restoData.js'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../redux/cart.js'
import { message } from 'antd/es/index.js'


const RestoMenuPage = () => {
    const { id } = useParams();
    const resto = restoData.find((r) => r.id === id);
    const dispatch = useDispatch();
    const isCustEmpty = useSelector((state) => state.cart.isCustEmpty)
    
    const addToCartHandler = (idResto, namaResto, id, name, price) => {
        if (isCustEmpty === true) {
            dispatch(cartActions.toggleDrawer(false));
            dispatch(cartActions.addMenuItem({ idResto, namaResto, idMenu: id, namaMenu: name, harga: price, qty: 1 }));
        } else {
            dispatch(cartActions.addMenuItem({ idResto, namaResto, idMenu: id, namaMenu: name, harga: price, qty: 1 }));
            message.success("item added");
        }
    };


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
                        onClick={() => addToCartHandler(resto.id, resto.title, card.id, card.name, card.price)}
                    />
                ))}
            </div>
        </>
    );
};


export default RestoMenuPage
