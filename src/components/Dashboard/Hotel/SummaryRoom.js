import styled from 'styled-components';
import Button from '../../Form/Button';
import HotelCard from './SummaryHotel';

export default function SummaryRoom({ setShowSummaryRoom }) {
  return (
    <>
      <Subtitle>Você já escolheu seu quarto:</Subtitle>

      <HotelCard>
        <img src="https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg" alt="Hotel" />
        <span>Driven Resort</span>

        <strong>Quarto reservado</strong>
        <p>101 (Double)</p>

        <strong>Pessoas no seu quarto</strong>
        <p>Você e mais 1</p>
      </HotelCard>

      <ButtonContainer>
        <Button onClick={() => setShowSummaryRoom(false)}>Trocar de quarto</Button>
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
