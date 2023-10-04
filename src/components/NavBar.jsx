import styled from 'styled-components';
import Logo from './Logo';
import { Link, NavLink } from 'react-router-dom';
import { FaRegMoon } from 'react-icons/fa';
import { FiUser, FiUsers } from 'react-icons/fi';
import { BiSun } from 'react-icons/bi';
import { HiOutlineLogout } from 'react-icons/hi';
import ButtonIcon from './ButtonIcon';
import useLogout from '../features/authentication/useLogout';
import SpinnerMini from './SpinnerMini';
import useGetUser from '../features/authentication/useGetUser';
import formatDate from '../utils/formatDate';
import { useDarkMode } from '../context/darkModeContext';

const StyledNavBar = styled.nav`
  background-color: var(--color-grey-0);
  padding: 1rem 3rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-weight: 600;

    & p span {
      display: block;
      font-size: 1.3rem;
      color: var(--color-primary-600);
      font-family: 'Nunito Sans', sans-serif;
      letter-spacing: 0.05rem;
    }
  }

  & div img {
    width: 4.9rem;
    height: 4.9rem;
    border: 2px solid var(--color-primary-600);
    border-radius: 50%;
    object-fit: cover;
  }
`;

const List = styled.ul`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(NavLink)`
  padding: 0.95rem 2rem;
  background: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: 1px solid var(--color-grey-100);

  & svg {
    width: 2rem;
    height: 2rem;
  }
  &:focus,
  &.active {
    outline: 2px solid var(--color-primary-500);
    outline-offset: -1px;
    background-color: var(--color-grey-100);
    & svg {
      color: var(--color-primary-700);
    }
  }

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

function NavBar() {
  const { logout, isLoading } = useLogout();
  const { user } = useGetUser();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const userName = user?.user_metadata?.fullname;
  const correctUserName =
    userName.length < 26 ? userName : userName.slice(0, 26) + ' ...';

  return (
    <StyledNavBar>
      <Link to="/">
        <Logo />
      </Link>
      <div>
        <img
          src={user?.user_metadata?.avatar || '/default-avatar.webp'}
          alt={user?.user_metadata?.fullname.split(' ')[0]}
        />
        <p>
          Welcome, {correctUserName}
          <span>Last Login: {formatDate(user?.last_sign_in_at)}</span>
        </p>
      </div>
      <List>
        <li>
          <StyledLink to="/employee">
            <FiUsers />
            <span>Employees</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/manage">
            <FiUser />
            <span>Account</span>
          </StyledLink>
        </li>

        {/* FIXME: below to buttons are not equal in padding as of above to  */}
        <li>
          <ButtonIcon disabled={isLoading} onClick={toggleDarkMode}>
            {!isDarkMode ? <FaRegMoon /> : <BiSun />}
          </ButtonIcon>
        </li>
        <li>
          <ButtonIcon onClick={logout} disabled={isLoading}>
            {isLoading ? <SpinnerMini /> : <HiOutlineLogout />}
          </ButtonIcon>
        </li>
      </List>
    </StyledNavBar>
  );
}

export default NavBar;
