import { useEffect, useState } from 'react';
import SummaryRoom from '../../../components/Dashboard/Hotel/SummaryRoom';
import HotelList from '../../../components/Dashboard/Hotel/HotelList';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import useGetBooking from '../../../hooks/api/useGetBooking';
import ErrorPage from '../../../components/Dashboard/Error/Error';
import { useGetTicket, useGetTicketsTypes } from '../../../hooks/api/useTicket';

export default function Hotel() {
  const { getBooking } = useGetBooking();
  const { getTicket } = useGetTicket();
  const { getTicketsTypes } = useGetTicketsTypes();

  const [showSummaryRoom, setShowSummaryRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [changeRoom, setChangeRoom] = useState(false);
  const [ticket, setTicket] = useState({});
  const [ticketType, setTicketType] = useState({});

  const [shouldRenderHotelError, setShouldRenderHotelError] = useState({ display: false, title: 'Escolha de hotel e quarto', message: '' });

  useEffect(() => {
    async function fetchData() {
      try {
        const ticketData = await getTicket();
        setTicket(ticketData);
        if(ticketData.status === 'RESERVED') {
          setShouldRenderHotelError({ 
            display: true, 
            title: 'Escolha de hotel e quarto', 
            message: 'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem' });
        }
        setTicketType(ticketData.ticketType);
        if (ticketType.isRemote) {
          setShouldRenderHotelError({ 
            display: true, 
            title: 'Escolha de hotel e quarto', 
            message: 'Sua modalidade de ingresso não inclui hospedagem! Prossiga para a escolha de atividades' });
        }
      } catch (error) {
        setShouldRenderHotelError({ 
          display: true, 
          title: 'Escolha de hotel e quarto', 
          message: 'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem' });
      }
    }

    fetchData();
    setIsLoading(false);
  }, []);

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

  if (shouldRenderHotelError.display || ticket?.status === 'RESERVED') {
    const message = shouldRenderHotelError.message;
    const title = shouldRenderHotelError.title;
    return ErrorPage({ message, title });
  }

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

      {showSummaryRoom ? (
        <SummaryRoom setShowSummaryRoom={setShowSummaryRoom} setChangeRoom={setChangeRoom} changeRoom={changeRoom} />
      ) : (
        <HotelList setShowSummaryRoom={setShowSummaryRoom} changeRoom={changeRoom} setChangeRoom={setChangeRoom} />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 36px !important;
`;

const EnrollmentErrorDiv = styled.div`
  display: flex;
  margin-top: 25%;
  align-items: center;
  justify-content: center;
`;

const ErrorTitle = styled.h2`
  font-weight: 400;
  font-size: 20px;
  line-height: 23.44px;
  color: #8e8e8e;
  text-overflow: ellipsis;
  overflow: visible;
  white-space: normal;
  text-align: center;
  width: 50%;
`;
