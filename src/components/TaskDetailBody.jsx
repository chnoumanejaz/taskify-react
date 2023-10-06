import styled from 'styled-components';
import DetailRow from './DetailRow';
import formatDate from '../utils/formatDate';

const StyledTaskDetailBody = styled.div`
  padding: 2rem;
  margin-top: 2rem;
  background-color: var(--color-grey-100);
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const MoreThanRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
 
/* eslint-disable react/prop-types */
function TaskDetailBody({ task }) {
  const {
    detail,
    created_at,
    dueDate,
    priority,
    fileUrl,
    domain,
    employees: { name: employeeName, avatarUrl },
  } = task;

  return (
    <StyledTaskDetailBody>
      <div>
        <DetailRow label="Task Domain:" domain={domain} />
      </div>

      <div>
        <DetailRow label="Description/Details:" data={detail} />
      </div>

      <div>
        <DetailRow
          label="Assigned to:"
          data={employeeName}
          img={{ src: avatarUrl, alt: employeeName }}
        />
      </div>

      <MoreThanRow>
        <DetailRow label="Start Date:" data={formatDate(created_at)} />
        <DetailRow label="Due Date:" data={formatDate(dueDate)} />
      </MoreThanRow>

      <div>
        <DetailRow label="Priority:" priority={priority} />
      </div>

      <div>
        <DetailRow label="Attachment:" file={fileUrl} />
      </div>
    </StyledTaskDetailBody>
  );
}

export default TaskDetailBody;
