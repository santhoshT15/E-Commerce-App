import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {
  const [list, setList] = useState([]);

  const  fetchList = async() =>{
    try {
      const response = await axios.get(backUrl+'/api/product/list')
      if(response.data.success){
        setList(response.data.products)
        // toast.success('Products fetched successfully')
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async(id) => {
    try {
      const response = await axios.post(backUrl+'/api/product/remove', {id}, {headers: {token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList();
  },[])
  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Products List */}
        { list.map((item, index) => (
          <div className='grid frid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 text0sm' key={index}>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg hover:text-red-700'>X</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default List