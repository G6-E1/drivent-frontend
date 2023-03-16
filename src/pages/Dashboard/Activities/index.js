import Days from '../../../components/Dashboard/Activities/Days';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function Activities() {
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Days />
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 36px !important;
`;
