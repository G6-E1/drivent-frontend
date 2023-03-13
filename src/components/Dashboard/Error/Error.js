import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function ErrorPage({ message, title }) {
  return (
    <>
      <StyledTypography variant="h4">{title}</StyledTypography>
      <EnrollmentErrorDiv>
        <ErrorTitle>{message}</ErrorTitle>
      </EnrollmentErrorDiv>
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
