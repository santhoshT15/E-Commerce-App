import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backUrl } from '../../../admin/src/App'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  });

  const initPay = (order) =>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:'Order Payment',
      decription: 'Order Payment',
      order_id: order.id,
      receipt : order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const {data} = await axios.post(backUrl+'/api/order/verify-razorpay', response, {headers: {token}});
          if(data.success){
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onChangeHandler = (e) => {

    const name =  e.target.name;
    const value =  e.target.value;

    setFormData(data  => ({...data, [name]: value}))
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault();

    try {
      let orderItems =[];

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        
        items: orderItems,
        amount: getCartAmount()+ delivery_fee,
        address: formData
      }

      // console.log(orderData);
      

      switch(method) {
        // API Calls for COD
        case 'cod' : 
        const response = await axios.post(backendUrl+'/api/order/place-order', orderData, {headers: {token}})
        console.log(response.data)
        if(response.data.success){
          setCartItems({});
          navigate('/orders')
        }else{
          toast.error(response.data.message)
        }
        break;
        //APi calls for Stripe
        case 'stripe':
          const responseStripe = await axios.post(backendUrl+ '/api/order/stripe', orderData, {headers: {token}});
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data;
            window.location.replace(session_url)
          }else{
            console.log(responseStripe)
            toast.error(responseStripe.data.message);
          }
        break;
        // API calls for Razorpay
        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl+'/api/order/razorpay', orderData, {headers: {token}});
          if(responseRazorpay.data.success){
            initPay(responseRazorpay.data.order)
          }
        break;

        default:
        break;
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xs sm:text-2xl my-3">
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        <div className="flex gap-3">
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' required/>
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' required/>
        </div>
         <input onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Enter Your Email' required/>
          <input onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' required/>
          <div className="flex gap-3">
          <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' required/>
          <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' required/>
        </div>
        <div className="flex gap-3">
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='zipcode' required/>
          <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' required/>
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' required/>
      </div>
      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'Payment'} text2={'Method'} />
          {/* Payment Method Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full ${method === "stripe" ? 'bg-green-400' : ''} `}></p>
              <img className='h-5 mx-4 ' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full  ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4 ' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full  ${method === "cod" ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-600 text-sm font-medium mx-4'>Cash On Delivery</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type="submit" className='bg-black text-white px-16 py-3 text-sm'>Place Order</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder