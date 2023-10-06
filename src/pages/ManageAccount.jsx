import styled from 'styled-components';
import BackButton from '../components/BackButton';
import Heading from '../components/Heading';
import UpdateAccountForm from '../components/UpdateAccountForm';
import UpdatePasswordForm from '../components/UpdatePasswordForm';

const ManageAccountContainer = styled.div`
  background-color: var(--color-grey-100);
  padding: 1.5rem 2rem;
  margin-top: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-grey-50);
  box-shadow: var(--shadow-sm);
  & h2 {
    padding: 0 0 1rem 0;
    border-bottom: 1px solid var(--color-grey-50);
  }
`;

function ManageAccount() {
  return (
    <>
      <BackButton />
      <Heading as="h1">Update Your Account</Heading>
      <ManageAccountContainer>
        <Heading as="h2">Update user data</Heading>
        <UpdateAccountForm />
      </ManageAccountContainer>
      <ManageAccountContainer>
        <Heading as="h2">Update password</Heading>
        <UpdatePasswordForm />
      </ManageAccountContainer>
    </>
  );
}

export default ManageAccount;
