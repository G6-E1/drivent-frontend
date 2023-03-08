import { useState } from 'react';
import styled from 'styled-components';

export default function Hotel({ hotel }) {
  function clique() {
    alert('Clique!');
  }

  return (
    <Screen onClick={clique}>
      <Image src={hotel.image} />
      <Title>{hotel.name}</Title>
      <section>
        <SubTitle>Tipos de acomodação:</SubTitle>
        <Text>{hotel.Room.name}</Text>
      </section>
      <section>
        <SubTitle>Vagas disponíveis:</SubTitle>
        <Text>{hotel.Room.capacity}</Text>
      </section>
    </Screen>
  );
}

const Screen = styled.div`
  width: 250px;
  height: 320px;
  padding: 20px;

  background-color: rgba(235, 235, 235, 1);
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  section {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-self: flex-start;
  }

  transition: all 0.1s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 1.3px gray;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 140px;

  border-radius: 15px;
`;

const Title = styled.h3`
  font-size: 20px;
  align-self: flex-start;
  padding-bottom: 10px;
`;

const SubTitle = styled.h4`
  font-size: 13px;
  font-weight: bold;
`;

const Text = styled.p`
  font-size: 12px;
`;