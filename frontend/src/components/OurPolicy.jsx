import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img className='w-12 m-auto mb-5' src={assets.exchange_icon} alt="" />
            <p className="font-semibold">Easy Exchange policy</p>
            <p className="textgray-400">We offer hassle free exhange policy</p>
        </div>
        <div>
            <img className='w-12 m-auto mb-5' src={assets.quality_icon} alt="" />
            <p className="font-semibold">7 Days Return Policy</p>
            <p className="textgray-400">We provide 7days free return policy</p>
        </div>
        <div>
            <img className='w-12 m-auto mb-5' src={assets.support_img} alt="" />
            <p className="font-semibold">Best Customer Support</p>
            <p className="textgray-400">We provide 24/7 customer suport</p>
        </div>
    </div>
  )
}

export default OurPolicy