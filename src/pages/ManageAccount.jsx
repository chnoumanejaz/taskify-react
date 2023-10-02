import styled from 'styled-components';
import UpdateAccountForm from '../components/UpdateAccountForm';
import Heading from '../components/Heading';
import UpdatePasswordForm from '../components/UpdatePasswordForm';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { IoMdArrowRoundBack } from 'react-icons/io';

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
      {/* FIXME: Change this and add the to prop in Button */}
      {/* BUG: change the button to inline-block */}
      <Link to={-1}>
        <Button
          size="small"
          iconStart={<IoMdArrowRoundBack />}
          style={{ marginBottom: '2rem' }}>
          Back
        </Button>
      </Link>
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
