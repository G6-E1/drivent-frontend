import Days from '../../../components/Dashboard/Activities/Days';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useState } from 'react';

export default function Activities() {
  const [date, setdate] = useState();
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Days setdate={setdate} />
      {date &&  <StyledTypography variant='h4'>Dia selecionado {date}</StyledTypography>}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 36px !important;
`;
