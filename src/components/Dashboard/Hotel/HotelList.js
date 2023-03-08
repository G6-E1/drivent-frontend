import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import Hotel from '../../../pages/Dashboard/Hotel';
import Hotel from '../Hotel/Hotel';

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

  return (
    <Screen>
      <Title>Primeiro, escolha seu hotel</Title>
      <Container>
        {fakeHotels.map((hotel) => (
          <Hotel hotel={hotel} />
        ))}
      </Container>
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
