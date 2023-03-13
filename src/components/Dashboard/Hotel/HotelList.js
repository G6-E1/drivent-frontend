import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Hotel from '../Hotel/Hotel';
import { getHotels, getHotelById } from '../../../services/hotelAPI';
import useToken from '../../../hooks/useToken';
import { toast } from 'react-toastify';
import Rooms from './Rooms';

export default function HotelList({ setShowSummaryRoom }) {
  const [hotels, setHotels] = useState(null);
  const [hotelId, setHotelId] = useState(null);
  const token = useToken();

  useEffect(() => {
    getHotels(token)
      .then((res) => {
        setHotels([...res]);
      })
      .catch((e) => {
        toast('Falha na tentativa de obter os hotéis');
      });
  }, []);

  return (
    <Screen>
      <Title>Primeiro, escolha seu hotel</Title>
      <Container>
        {hotels && hotels.map((hotel, index) => <Hotel key={index} hotel={hotel} setHotelId={setHotelId} />)}
      </Container>
      {hotelId && <Rooms hotelId={hotelId} />}
    </Screen>
  );
}

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Container = styled.div`
  /* margin-top: 15px; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 22px;
  color: gray;
`;
