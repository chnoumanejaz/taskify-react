import Input from './Input';
import useGetUser from '../features/authentication/useGetUser';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import FileInput from './FileInput';
import Button from './Button';
import ButtonsContainer from './ButtonsContainer';
import { useNavigate } from 'react-router-dom';
import FormRowHorizontal from './FormRowHorizontal';
import { useState } from 'react';
import { useUpdateUser } from '../features/authentication/useUpdateUser';
import SpinnerMini from './SpinnerMini';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function UpdateAccountForm() {
  const { user } = useGetUser();
  const currentfullname = user?.user_metadata?.fullname;
  const [fullname, setfullName] = useState(currentfullname);
  const [avatar, setAvatar] = useState('');
  const { isLoading: isUpdatingUser, updateUser } = useUpdateUser();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullname.trim().length) {
      toast.error('Please Enter your name!');
      return;
    }

    updateUser(
      { fullname, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormRowHorizontal label="Email:" name="email">
        <Input
          forr="mainPage"
          disabled
          onChange={() =>
            toast.warning('You are not allowed to change your email')
          }
          value={user?.email}
        />
      </FormRowHorizontal>
      <FormRowHorizontal label="Enter Name:" name="fullname">
        <Input
          type="text"
          placeholder="Enter your name"
          id="fullname"
          forr="mainPage"
          value={fullname}
          disabled={isUpdatingUser}
          onChange={e => setfullName(e.target.value)}
        />
      </FormRowHorizontal>
      <FormRowHorizontal label="Select Image:" name="avatar">
        <FileInput
          type="file"
          id="avatar"
          accept="image/*"
          disabled={isUpdatingUser}
          onChange={e => setAvatar(e.target.files[0])}
        />
      </FormRowHorizontal>
      <ButtonsContainer side="right">
        <Button
          type="reset"
          disabled={isUpdatingUser}
          variation="secondary"
          onClick={() => navigate('/')}>
          Cancle
        </Button>
        <Button
          type="submit"
          disabled={isUpdatingUser}
          iconStart={isUpdatingUser && <SpinnerMini />}>
          {isUpdatingUser ? 'Updating ...' : 'Update Account'}
        </Button>
      </ButtonsContainer>
    </StyledForm>
  );
}

export default UpdateAccountForm;
