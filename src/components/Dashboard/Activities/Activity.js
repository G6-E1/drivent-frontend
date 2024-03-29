import styled from 'styled-components';
import { BiLogIn, BiXCircle, BiCheckCircle } from 'react-icons/bi';
import { useState } from 'react';
import usePostActivityEnrollment from '../../../hooks/api/usePostActivityEnrollment';
import useDeleteActivityEnrollment from '../../../hooks/api/useDeleteActivityEnrollment';
import { useEffect } from 'react';
import UserContext from '../../../contexts/UserContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';

function formatTimestampToHHMM(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default function Activity({ id, vacancies, name, start, finish, activityEnrollments, duration }) {
  const { userData } = useContext(UserContext);

  const [isFull, setIsFull] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollments, setEnrollments] = useState(activityEnrollments.length);
  const { postActivityEnrollment } = usePostActivityEnrollment();
  const { deleteActivityEnrollment } = useDeleteActivityEnrollment();

  const startHHMM = formatTimestampToHHMM(start);
  const finishHHMM = formatTimestampToHHMM(finish);

  useEffect(() => {
    activityEnrollments.forEach((enrollment) => {
      if (enrollment.userId === userData.user.id) {
        setIsEnrolled(true);
      }
    });
  }, []);

  useEffect(() => {
    if (vacancies <= enrollments) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  }, [enrollments]);

  async function enroll() {
    try {
      if (isEnrolled) {
        await deleteActivityEnrollment(id);
        setEnrollments(enrollments - 1);
      } else {
        const data = { activityId: id };
        await postActivityEnrollment(data);
        setEnrollments(enrollments + 1);
      }

      setIsEnrolled(!isEnrolled);
    } catch (err) {
      if (err.response.status === 404) {
        return toast('Não achamos sua inscrição na atividade! Favor recarregar a página');
      }
      if (err.response.status === 409 && err.response.data === 'Conflicting times') {
        return toast('Horários conflitantes! Inscrição não realizada');
      }
      toast('Ocorreu um erro, tente novamente');
    }
  }

  return (
    <ActivityCard duration={duration} isEnrolled={isEnrolled}>
      <About>
        <b>{name}</b>
        <p>
          {startHHMM} - {finishHHMM}
        </p>
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
            <span>{vacancies - enrollments} vagas</span>
          </>
        )}
      </JoinButton>
    </ActivityCard>
  );
}

const ActivityCard = styled.div`
  width: 265px;
  height: ${(props) => (props.duration / 3600000) * 80}px;
  padding: 10px 0px;
  margin-top: 10px;
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
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

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
