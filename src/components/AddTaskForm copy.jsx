import styled from 'styled-components';
import Heading from './Heading';
import FormRow from './FormRow';
import Input from './Input';
import TextArea from './Textarea';

const TaskFormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  /* row-gap: 1.5rem; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
`;

const LeftSide = styled.div``;

const RightSide = styled.div``;

function AddTaskForm() {
  return (
    <TaskFormContainer>
      <LeftSide>T</LeftSide>

      <RightSide>s</RightSide>
    </TaskFormContainer>
  );
}

export default AddTaskForm;

{
  /* <form>
<Heading as="h2">Add a new Task</Heading>
<FormRow label="Task Name:" name="name">
  <Input
    type="text"
    placeholder="Enter the task name "
    id="name"
    forr="mainPage"
  />
</FormRow>

<FormRow label="Task detail / description:" name="detail">
  <TextArea
    id="detail"
    placeholder="Enter the description or details of task"
    rows={3}
  />
</FormRow>

<FormRow label="Work Domain:" name="domain">
  <Input
    type="text"
    placeholder="Enter the task domain "
    id="domain"
    forr="mainPage"
  />
</FormRow>
</form> */
}
