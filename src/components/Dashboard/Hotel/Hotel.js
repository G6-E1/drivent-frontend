import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getHotels, getHotelById } from '../../../services/hotelAPI';
import useToken from '../../../hooks/useToken';
import { toast } from 'react-toastify';

export default function Hotel({ hotel, setHotelId }) {
  const token = useToken();
  const [availableVacancies, setAvailableVacancies] = useState(null);

  useEffect(() => {
    let vacanciesFilled = 0;
    let vacancies = 0;

    getHotelById(hotel.id, token)
      .then((hotel) => {
        for (let i = 0; i < hotel.Rooms.length; i++) {
          vacancies += hotel.Rooms[i].capacity;
          if (hotel.Rooms[i].Booking.length !== 0) {
            vacanciesFilled += 1;
          }
        }
        setAvailableVacancies(vacancies - vacanciesFilled);
      })
      .catch((e) => {});
  }, []);

  function choiceHotel() {
    setHotelId(hotel.id);
  }

  return (
    <Screen onClick={choiceHotel}>
      <Image src={hotel.image} />
      <Title>{hotel.name}</Title>
      <section>
        <SubTitle>Tipos de acomodação:</SubTitle>
        <Text>{getAccommodation(hotel.Rooms)}</Text>
      </section>
      <section>
        <SubTitle>Vagas disponíveis:</SubTitle>
        <Text>{availableVacancies}</Text>
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

function getAccommodation(Rooms) {
  let single = false;
  let double = false;
  let triple = false;
  for (let i = 0; i < Rooms.length; i++) {
    if (Rooms[i].capacity === 1) {
      single = true;
    }
    if (Rooms[i].capacity === 2) {
      double = true;
    }
    if (Rooms[i].capacity === 3) {
      triple = true;
    }
  }

  if (single && double && triple) {
    return 'Single, Double e Triple';
  }
  if (single && double && !triple) {
    return 'Single e Double';
  }
  if (single && !double && !triple) {
    return 'Single';
  }
}
