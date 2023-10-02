import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import Heading from './Heading';
import { NavLink } from 'react-router-dom';
import Button from './Button';

const StyledSideBar = styled.aside`
  background-color: var(--color-grey-50);
  border-right: 1px solid var(--color-grey-100);
  padding: 1rem 1.5rem;
  text-transform: uppercase;
  & h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .tag {
    font-size: small;
    font-weight: 500;
    background-color: var(--color-primary-600);
    color: var(--color-primary-50);
    padding: 0.4rem;
    border-radius: 50%;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 1.5rem;
  & input {
    border: 1px solid var(--color-grey-200);
    padding: 0.1rem 2rem;
    border-radius: 15rem;
  }
`;

const List = styled.ul`
  margin-top: 2rem;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  position: relative;

  & button {
    position: absolute;
    right: 0.5rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-transform: none;
  flex-grow: 2;
  & li {
    background-color: var(--color-grey-100);
    padding: 0.7rem 1rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 0.1rem;
    border: 1px solid transparent;
    border-bottom-color: var(--color-grey-200);
  }

  &:hover li {
    background-color: var(--color-primary-50);
    border: 1px solid var(--color-primary-200);
  }

  &.active li {
    background-color: var(--color-primary-50);
    border: 1px solid var(--color-primary-500);
  }
`;

function SideBar() {
  return (
    <StyledSideBar>
      <Heading as="h2">
        Projects <span className="tag">08</span>
        <Button size="small">Create new</Button>
      </Heading>
      <Form>
        <input type="text" placeholder="Search projects ..." />
        <ButtonIcon rounded="true" type="submit">
          <BiSearchAlt />
        </ButtonIcon>
      </Form>
      <List>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <ItemContainer key={`${item}-${index}`}>
            <StyledNavLink to={'/project/' + index}>
              <li>Untitled Project</li>
            </StyledNavLink>
            <ButtonIcon size="small" danger>
              <AiOutlineDelete />
            </ButtonIcon>
          </ItemContainer>
        ))}
      </List>
    </StyledSideBar>
  );
}

export default SideBar;
