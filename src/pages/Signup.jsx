import Heading from '../components/Heading';
import Logo from '../components/Logo';
import SignupContainer from '../components/SignupContainer';
import SignupLayout from '../components/SignupLayout';
import SignupForm from '../features/authentication/SignupForm';

function Signup() {
  return (
    <SignupLayout>
      <SignupContainer>
        <Logo />
        <div>
          <Heading as="h1">Create a new account</Heading>
          <SignupForm />
        </div>
      </SignupContainer>
    </SignupLayout>
  );
}

export default Signup;
