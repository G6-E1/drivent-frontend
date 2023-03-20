import { useEffect, useState } from 'react';
import SummaryRoom from '../../../components/Dashboard/Hotel/SummaryRoom';
import HotelList from '../../../components/Dashboard/Hotel/HotelList';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import useGetBooking from '../../../hooks/api/useGetBooking';
import ErrorPage from '../../../components/Dashboard/Error/Error';
import { useGetTicket } from '../../../hooks/api/useTicket';

export default function Hotel() {
  const { getBooking } = useGetBooking();
  const { getTicket } = useGetTicket();

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
        setTicketType(ticketData.TicketType);
        if (ticketType.isRemote) {
          setShouldRenderHotelError({ 
            display: true, 
            title: 'Escolha de hotel e quarto', 
            message: 'Sua modalidade de ingresso não inclui hospedagem! Prossiga para a escolha de atividades' });
        }
        setIsLoading(false);
      } catch (error) {
        setShouldRenderHotelError({ 
          display: true, 
          title: 'Escolha de hotel e quarto', 
          message: 'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem' });
      }
    }

    fetchData();
  }, [isLoading]);

  useEffect(() => {
    async function fetchData() {
      try {
        await getBooking();
        setShowSummaryRoom(true);
        setIsLoading(false);
      } catch (err) {
        setShowSummaryRoom(false);
      }
    }

    fetchData();
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
