/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Card from '@/components/Card';

function SpecailDishes() {
  const [recipes, setRecipes] = useState([]);
  const slider = useRef(null);
  useEffect(() => {
    fetch('/menu.json')
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === 'popular');
        // console.log(specials)
        setRecipes(specials);
      });
  }, []);

  {
    /** settings */
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div className='section-container my-20 relative'>
      <div className='text-left'>
        <p className='subtitle'>Customer Favorites</p>
        <h2 className='title'>Popular Categories</h2>
      </div>
      <div className='md:absolute right-3 top-8 mb-10 md:mr-24'>
        <button onClick={() => slider?.current?.slickPrev()} className=' btn p-2 rounded-full ml-5'>
          <FaAngleLeft className=' h-8 w-8 p-1' />
        </button>
        <button className='bg-green btn p-2 rounded-full ml-5' onClick={() => slider?.current?.slickNext()}>
          <FaAngleRight className=' h-8 w-8 p-1' />
        </button>
      </div>
      <Slider ref={slider} {...settings} className='overflow-hidden mt-10 space-x-5'>
        {recipes.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </Slider>
    </div>
  );
}
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: 'block', background: 'red' }} onClick={onClick}>
      NEXT
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: 'block', background: 'green' }} onClick={onClick}>
      BACK
    </div>
  );
};

export default SpecailDishes;
