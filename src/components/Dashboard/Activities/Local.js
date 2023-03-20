import { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as activitiesApi from '../../../services/activitiesApi';
import useAsync from '../../../hooks/useAsync';
import useToken from '../../../hooks/useToken';
import Activity from './Activity';
import { toast } from 'react-toastify';

export default function Local({ date, localId, maxCapacity, name }) {
  const token = useToken();
  const [activities, setActivities] = useState([]);

  const {
    loading: getActivitiesByDateAndLocalIdLoading,
    error: getActivitiesByDateAndLocalIdError,
    act: getActivitiesByDateAndLocalId,
  } = useAsync(() => activitiesApi.getActivitiesByDateAndLocalId(localId, date, token), false);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const fetchedActivities = await getActivitiesByDateAndLocalId();
        setActivities(fetchedActivities);
      } catch (error) {
        toast('Ocorreu um erro ao obter as atividades, tente novamente');
      }
    };
    fetchData();
  }, [date]);

  return (
    <LocalContainer>
      <Title>
        <LocalName>{name}</LocalName>
      </Title>
      <ActivitiesContainer>
        {activities?.map((activity) => (
          <Activity
            key={activity.id}
            id={activity.id}
            vacancies={activity.vacancies}
            name={activity.name}
            start={activity.startAt}
            finish={activity.finishAt}
            activityEnrollments={activity.EnrollmentActivity}
            duration={Date.parse(activity?.finishAt) - Date.parse(activity?.startAt)}
          ></Activity>
        ))}
      </ActivitiesContainer>
    </LocalContainer>
  );
}

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const LocalContainer = styled.div`
  border-colapse: colapse;
`;
const LocalName = styled.p`
  font-family: 'Roboto', sans-serif;
  color: #7b7b7b;
  font-size: 1.1rem;
`;
const ActivitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  width: 288px;
  height: 392px;
  border: 1px solid #d7d7d7;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  & > div {
    border-right: none;
  }
`;
