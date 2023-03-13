import styled from 'styled-components';

export default function SummaryHotel({ children }) {
  return <HotelCard>{children}</HotelCard>;
}

const HotelCard = styled.div`
  width: 250px;
  height: 320px;
  background-color: #ffeed2;
  border-radius: 15px;
  padding: 20px;
  margin-right: 19px;

  font-family: 'Roboto', sans-serif;
  color: #3c3c3c;

  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 140px;
    border-radius: 7.5px;
    margin-bottom: 10px;
  }

  span {
    font-size: 20px;
    line-height: 24px;
  }

  p,
  strong {
    font-size: 15px;
    line-height: 17px;
  }

  strong {
    margin-top: 14px;
    margin-bottom: 2px;
  }
`;
