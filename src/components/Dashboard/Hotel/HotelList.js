import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Hotel from '../Hotel/Hotel';
import { getHotels, getHotelById } from '../../../services/hotelApi';
import useToken from '../../../hooks/useToken';
import { toast } from 'react-toastify';
import Rooms from './Rooms';

export default function HotelList({ setShowSummaryRoom }) {
  const fakeHotels = [
    {
      name: 'Driven Resort',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1w70-bSiiCCdYVEJA4MtEjPgsbNLCl-sLeQ&usqp=CAU',
      Room: {
        name: 'Single and Double',
        capacity: 103,
      },
    },
    {
      name: 'Driven Palace',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1w70-bSiiCCdYVEJA4MtEjPgsbNLCl-sLeQ&usqp=CAU',
      Room: {
        name: 'Single, Double and Triple',
        capacity: 25,
      },
    },
    {
      name: 'Driven World',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1w70-bSiiCCdYVEJA4MtEjPgsbNLCl-sLeQ&usqp=CAU',
      Room: {
        name: 'Single and Double',
        capacity: 2,
      },
    },
  ];

  const [hotels, setHotels] = useState(null);
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
      <Container>{hotels && hotels.map((hotel) => <Hotel hotel={hotel} />)}</Container>
      <Rooms />
    </Screen>
  );
}

const Screen = styled.div``;

const Container = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 22px;
  color: gray;
`;

// function getAccommodation(Rooms) {
//   const txt = '';

//   let single = false;
//   let double = false;
//   let triple = false;
//   for (let i = 0; i < Rooms.length; i++) {
//     if()
//   }
// }

// export default function HotelList({ setShowSummaryRoom }) {
//   return (
//     <>
//       <Rooms />
//     </>
//   );
// };
