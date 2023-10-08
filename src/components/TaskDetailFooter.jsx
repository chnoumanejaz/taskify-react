import styled from 'styled-components';
import DetailRow from './DetailRow';
import { MoreThanRow } from './TaskDetailBody';
import useGetUser from '../features/authentication/useGetUser';
import { handleTheLongData } from '../utils/handleTheData';

const StyledTaskDetailFooter = styled.div`
  padding: 2rem;
  margin-top: 2rem;
  background-color: var(--color-grey-100);
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

/* eslint-disable react/prop-types */
function TaskDetailFooter({ task }) {
  const {
    user: {
      user_metadata: { avatar, fullname: userName },
    },
  } = useGetUser();
  const {
    projects: { name, category, description },
  } = task;
  return (
    <StyledTaskDetailFooter>
      <MoreThanRow>
        <DetailRow label="Project Name:" data={handleTheLongData(name)} />
        <DetailRow label=" Category:" data={handleTheLongData(category)} />
      </MoreThanRow>
      <div>
        <DetailRow label="Description:" data={description} />
      </div>
      <div>
        <DetailRow
          label="Created By:"
          data={userName}
          img={{ src: avatar, alt: userName }}
        />
      </div>
    </StyledTaskDetailFooter>
  );
}

export default TaskDetailFooter;
