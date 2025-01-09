import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler = (event) =>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='tex-2xl font-medium text-gray-800'>Subcribe now & get 20% off</p>
        <p className="text-gray mt-3">
             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
        </p>
        <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' onSubmit={onSubmitHandler}>
            <input className='w-1/2 sm:flex-1 outline-none' type="email" placeholder='Enter Your Email' required/>
            <button className='bg-black text-white text-xs px-10 py-4' type='submit' >Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetterBox