import { useState } from 'react';
import SummaryRoom from '../../../components/Dashboard/Hotel/SummaryRoom';
import HotelList from '../../../components/Dashboard/Hotel/HotelList';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function Hotel() {
  const [showSummaryRoom, setShowSummaryRoom] = useState(true);

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
