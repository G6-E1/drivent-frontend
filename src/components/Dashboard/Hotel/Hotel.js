import styled from 'styled-components';

export default function Hotel({ children, background, imageUrl }) {
  return (
    <HotelCard background={background}>
      <img src={imageUrl} alt="Hotel" />
      {children}
    </HotelCard>
  );
}

const HotelCard = styled.div`
  width: 196px;
  height: 264px;
  background-color: ${(props) => (props.background === 'yellow' ? '#FFEED2' : '#F1F1F1')};
  border-radius: 10px;
  padding: 15px;
  margin-right: 19px;

  font-family: 'Roboto', sans-serif;
  color: #3c3c3c;

  display: flex;
  flex-direction: column;

  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  span {
    margin-bottom: 10px;

    font-size: 20px;
    line-height: 24px;
  }

  p,
  strong {
    font-size: 12px;
    line-height: 14px;
  }

  strong {
    margin-bottom: 2px;
  }

  p {
    margin-bottom: 14px;
  }
`;
