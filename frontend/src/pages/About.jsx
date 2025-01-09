import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'About'} text2={'Us'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>SB store was born out of passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea 
            : to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </p>
          <p> Offers a wide range of dresses in many colors and lengths, including short and knee-length dresses. 
            They also have a "SB store" program that guarantees delivery of high-quality products.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our Mission at SB Store is to empower customers with choice, convenience and confidence. we're dedicated to providing a seamless shopping experience that
            exceeds expectation, from browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'Why'} text2={'Choose Us'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Our team of dedicated and professionals is here to assit you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About