import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useGetBooking from '../../../hooks/api/useGetBooking';
import useGetHotelById from '../../../hooks/api/useGetHotelById';
import Button from '../../Form/Button';
import HotelCard from './SummaryHotel';

export default function SummaryRoom({ setShowSummaryRoom, setChangeRoom }) {
  const { getBooking } = useGetBooking();
  const { getHotelById } = useGetHotelById();

  const [isLoading, setIsLoading] = useState(true);
  const [roomData, setRoomData] = useState({});
  const [hotelData, setHotelData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { Room } = await getBooking();

        let roomType;
        if (Room.capacity === 1) {
          roomType = 'Single';
        } else if (Room.capacity === 2) {
          roomType = 'Double';
        } else if (Room.capacity === 3) {
          roomType = 'Triple';
        }

        let totalBookings;
        if (Room.Booking.length === 1) {
          totalBookings = 'Somente você';
        } else if (Room.Booking.length === 2) {
          totalBookings = 'Você e mais 1 pessoa';
        } else if (Room.Booking.length === 3) {
          totalBookings = 'Você e mais 2 pessoas';
        }

        setRoomData({ name: Room.name, roomType, totalBookings });

        const { name, image } = await getHotelById(Room.hotelId);
        setHotelData({ name, image });
      } catch (err) {
        toast('Ocorreu um erro! Por favor, tente novamente');
      }

      setIsLoading(false);
    }

    fetchData();
  }, []);

  function handleClick() {
    setChangeRoom(true);
    setShowSummaryRoom(false);
  }

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <>
      <Subtitle>Você já escolheu seu quarto:</Subtitle>

      <HotelCard>
        <img src={hotelData.image} alt="Hotel" />
        <span>{hotelData.name}</span>

        <strong>Quarto reservado</strong>
        <p>
          {roomData.name} ({roomData.roomType})
        </p>

        <strong>Pessoas no seu quarto</strong>
        <p>{roomData.totalBookings}</p>
      </HotelCard>

      <ButtonContainer>
        <Button onClick={handleClick}>Trocar de quarto</Button>
      </ButtonContainer>
    </>
  );
}

const ButtonContainer = styled.div`
  margin-top: 38px;

  > button {
    margin-top: 0px;
  }
`;

const Subtitle = styled.h2`
  margin-bottom: 17px;

  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 23.44px;
  color: #8e8e8e;
`;
