import { useState } from 'react';
import SummaryRoom from '../../../components/Dashboard/Hotel/SummaryRoom';
import HotelList from '../../../components/Dashboard/Hotel/HotelList';
import Rooms from '../../../components/Dashboard/Hotel/Rooms';

export default function Hotel() {
  const [showSummaryRoom, setShowSummaryRoom] = useState(false);

  return (
    <>
      {/* {showSummaryRoom ? (
        <SummaryRoom setShowSummaryRoom={setShowSummaryRoom} />
      ) : (
        <HotelList setShowSummaryRoom={setShowSummaryRoom} />
      )} */}
      <Rooms/>
    </>
  );
}
