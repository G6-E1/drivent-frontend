import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import useGetActiviesDates from '../../../hooks/api/useActivities';
import Day from './Day';

const Activities = [
  { startAt: '2023-03-06T17:33:28.062Z' },
  { startAt: '2023-03-23 09:00:00' },
  { startAt: '2023-03-24 09:00:00' },
];

export default function Days() {
  const { getDateActivities } = useGetActiviesDates();

  const [selectedDay, setSelectedDay] = useState();
  const [activities, setActivities] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        setActivities(await getDateActivities());
        console.log('entrou');
      } catch (error) {

      }
    }
    fetchData();
  }, []);

  console.log(activities);
  return (
    <ContainerDays>
      {activities?.map((day, i) => <Day
        key={i}
        idButton={i}
        day={day.startAt}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />)}
    </ContainerDays>
  );
};

const ContainerDays = styled.div`
  width: 806px;
  display:flex;
`;

