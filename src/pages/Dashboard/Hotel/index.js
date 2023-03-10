import { useEffect, useState } from 'react';
import SummaryRoom from '../../../components/Dashboard/Hotel/SummaryRoom';
import HotelList from '../../../components/Dashboard/Hotel/HotelList';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import useGetBooking from '../../../hooks/api/useGetBooking';

export default function Hotel() {
  const { getBooking } = useGetBooking();

  const [showSummaryRoom, setShowSummaryRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        await getBooking();
        setShowSummaryRoom(true);
      } catch (err) {
        setShowSummaryRoom(false);
      }
    }

    fetchData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

      {showSummaryRoom ? (
        <SummaryRoom setShowSummaryRoom={setShowSummaryRoom} />
      ) : (
        <HotelList setShowSummaryRoom={setShowSummaryRoom} />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 36px !important;
`;
