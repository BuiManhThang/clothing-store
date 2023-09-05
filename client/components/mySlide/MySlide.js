'use client'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Image from 'next/image'

const MySlide = ({ width, height = 500, autoplay = true, options = {}, images = [], ...props }) => {
  return (
    <div {...props}>
      <Splide
        options={{
          autoplay: autoplay,
          width: width,
          height: height,
          ...options,
        }}
      >
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <Image src={image} alt={`image-${index}`} fill className="object-cover object-center" />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

export default MySlide
