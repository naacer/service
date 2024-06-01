import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../State/Restaurant/Action';
import {EventCard} from './EventCard';

export const Events = () => {
  const dispatch = useDispatch();
  const { restaurantsEvents } = useSelector(store => store.restaurant);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getAllEvents({ jwt }));
    }
  }, [jwt, dispatch]);

  return (
    <div className='flex flex-wrap gap-5 justify-center'>
      {restaurantsEvents.map((item) => (
        <EventCard key={item.id} item={item} isCustomer={true} />
      ))}
    </div>
  );
};
