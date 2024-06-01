import React, { useEffect } from 'react';
import "./Home.css";
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../State/Restaurant/Action';

const Home = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant ,auth } = useSelector(store => store);
  console.log("restaurant", restaurant);

  useEffect(() => {
    dispatch(getAllRestaurantsAction(jwt));
  }, [dispatch, jwt ]);

  return (
    <div className='pb-10'>
      <section className='banner z-50 relative flex justify-start items-center'>
        <div className='text-content mt-5 w-1/2 z-10 text-left '>
          <p className='text-2xl  text-yellow-500 lg:text-6xl italic font-semibold py-5'>Qossos</p>
          <p className='text-gray-200 font-serif italic pl-10 text-5xl lg:text-4xl'> Bienvenue chez Qossos,
         votre destination pour une cuisine délicieuse et authentique
          </p>
          {/* <p className='text-gray-200 text-5xl pl-60 lg:text-4xl'>! فيك جوع ؟ عندنا الحل</p> */}

          <div className='flex justify-center mt-9'>
          <button className="bg-yellow-500 hover:bg-yellow-700 pl-4 text-white font-bold py-2 px-6 rounded">Commander</button>
        </div>
        </div>
       
        <div className='cover absolute top-0 left-0 right-0 bottom-0'></div>
      </section>

      <section className='p-10 bg-yellow-500 lg:py-20 lg:px-20 pt-10'>
        <p className='text-2xl mt-0 font-semibold text-black-400 py-3 pb-5'>Top Meals</p>
        <MultiItemCarousel />
      </section>

      <section>
        {auth.user && (
          <h1 className='text-2xl font-semibold text-gray-400 px-20 py-5'>Tleb a7ssan makayn 3end 9ossos</h1>
        )}
        <div className='flex flex-wrap items-center justify-around gap-5'>
            {
              auth.user && restaurant.restaurants.map((item)=><RestaurantCard item={item}/>)
            }
        </div>
      </section>
    </div>
  );
}

export default Home;