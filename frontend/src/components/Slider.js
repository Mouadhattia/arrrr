import { React, useEffect, useState } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import ShopNowBtn from './ShopNowBtn'
const Slider = () => {
  const SliderData = [
    {
      title: '‟Rien ne se perd, rien ne se crée, tout se transforme.”',
      subtitle: '-- Antoine Lavoisier --'
    }/*,
    {
      title: 'Les musées préservent notre passé, le recyclage préserve notre avenir.',
      subtitle: '-- Theodor W. Adorno --'
    },
    {
      title: "L'homme naît avec des sens et des facultés, mais il n'apporte avec lui en naissant aucune idée .",
      subtitle: '-- Antoine Lavoisier --'
    }*/
  ];
  const [current, setCurrent] = useState(0);
  const length = SliderData.length;
  const [auto, setauto] = useState(true);
  const intervaltime = 6000;
  let slideinterval;
  const nextslide = () => {
    clearInterval(slideinterval);
    slideinterval = setInterval(nextslide, intervaltime);
    setTimeout(() => setCurrent(current === length - 1 ? 0 : current + 1))

  }
  const prevslide = () => {
    clearInterval(slideinterval);
    slideinterval = setInterval(nextslide, intervaltime);
    setTimeout(() => setCurrent(current === 0 ? length - 1 : current - 1))
  }
  useEffect(() => {
    setauto(true)
    if (auto) {
      slideinterval = setInterval(nextslide, intervaltime);
    }
    return () => {
      setauto(false);
      clearInterval(slideinterval);
    }
  })

  return (
    <div className='slider'>
      {SliderData.map((slide, index) => {
        return (
          <div key={index} className={index === current ? 'slide current' : 'slide'}>
            <div className='slider-content' >
              <span style={{
                marginBottom: 100, fontSize: 20,
                backgroundColor: "#ffffff",
                borderRadius: 20,
                padding: 20,
                maxWidth: 650, 
              }}>
                <h1 >{slide.title}</h1>
                <h3 >{slide.subtitle}</h3>
              </span>
              {/*
              <div > <Link to='/Shop'> <ShopNowBtn /></Link>  </div>
              */}
            </div>
          </div>
        );
      })}
      {/*
      
      <IoIosArrowForward className='next' size='32' onClick={nextslide} />
      <IoIosArrowBack className='prev' size='32' onClick={prevslide} />
       */}
    </div>
  )
}

export default Slider