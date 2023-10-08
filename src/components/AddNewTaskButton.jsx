import { HiPlus } from 'react-icons/hi';
import AddNewTaskForm from './AddNewTaskForm';
import ModalSide from './ModalSide';
import Button from './Button';

function AddNewTaskButton() {
  return (
    <div>
      <ModalSide>
        <ModalSide.Open openName="add-newTask">
          <Button iconStart={<HiPlus />}>Add New</Button>
        </ModalSide.Open>
        <ModalSide.Window
          name="add-newTask"
          heading="Note! Please make sure you have employees">
          <AddNewTaskForm />
        </ModalSide.Window>
      </ModalSide>
    </div>
  );
}

export default AddNewTaskButton;
