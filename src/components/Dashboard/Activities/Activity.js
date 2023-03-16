import styled from 'styled-components';
import { BiLogIn, BiXCircle, BiCheckCircle } from 'react-icons/bi';
import { useState } from 'react';

export default function Activity() {
  const [isFull, setIsFull] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  function enroll() {
    setIsEnrolled(!isEnrolled);
  }

  return (
    <ActivityCard isEnrolled={isEnrolled}>
      <About>
        <b>Minecraft: montando o PC ideal</b>
        <p>09:00 - 10:00</p>
      </About>

      <LineDiv isEnrolled={isEnrolled} />

      <JoinButton isFull={isFull} isEnrolled={isEnrolled} onClick={enroll} disabled={isFull && !isEnrolled}>
        {isEnrolled ? (
          <>
            <Icon>
              <BiCheckCircle />
            </Icon>
            <span>Inscrito</span>
          </>
        ) : isFull ? (
          <>
            <Icon>
              <BiXCircle />
            </Icon>
            <span>Esgotado</span>
          </>
        ) : (
          <>
            <JoinIcon>
              <BiLogIn />
            </JoinIcon>
            <span>27 vagas</span>
          </>
        )}
      </JoinButton>
    </ActivityCard>
  );
}

const ActivityCard = styled.div`
  width: 265px;
  height: 80px;
  padding: 10px 0px;
  background-color: ${(props) => (props.isEnrolled ? '#D0FFDB' : '#f1f1f1')};
  border-radius: 5px;

  font-family: 'Roboto', sans-serif;

  display: flex;
`;

const About = styled.div`
  width: 188px;
  height: 100%;
  margin-left: 10px;

  font-size: 12px;
  line-height: 14px;
  color: #343434;

  b {
    font-weight: 700;
  }

  p {
    margin-top: 6px;
  }
`;

const LineDiv = styled.div`
  height: 100%;
  width: 1px;
  background-color: ${(props) => (props.isEnrolled ? '#99E8A1' : '#cfcfcf')};
`;

const JoinButton = styled.button`
  width: 66px;
  height: 100%;
  background-color: transparent;
  border: none;
  cursor: ${(props) => (props.disabled && props.isEnrolled === false ? 'default' : 'pointer')};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: ${(props) => (props.isFull && props.isEnrolled === false ? '#CC6666' : '#078632')};

  span {
    font-size: 11px;
  }
`;

const Icon = styled.div`
  height: 28px;

  font-size: 26px;
`;

const JoinIcon = styled(Icon)`
  margin-left: -10px;
`;
