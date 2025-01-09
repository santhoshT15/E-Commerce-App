import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import PorductItem from './PorductItem';

const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [latestProd, setLatestProd] =useState([]);

    useEffect(() =>{
        setLatestProd(products.slice(0,10));
    },[products])

    // console.log(products)
  return (
    <div className='my-10'>
        <div className="text-center py-8 text-3xl">
            <Title text1={"Latest"} text2={"Collections"} />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                 when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
        </div>
        {/* Renduring Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {latestProd.map((item, index) =>(
                <PorductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))}
        </div>
    </div>
  )
}

export default LatestCollection