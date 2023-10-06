import styled, { css } from 'styled-components';
import Input from './Input';
import { BiSearchAlt } from 'react-icons/bi';

const InputContainer = styled.div`
  position: relative;
  & input {
    width: 100%;
    padding: 0.7rem 1.5rem;
    padding-left: 4rem;
  }

  ${props =>
    props.sideBar &&
    css`
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-grey-100);

      & input {
        border-radius: 5rem;
      }
    `}

  & svg {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    top: 0.8rem;
    left: 1rem;
    color: var(--color-primary-600);
  }
`;

/* eslint-disable react/prop-types */
function SearchInputContainer({
  searchQuery,
  setSearchQuery,
  placeholder,
  sideBar,
}) {
  return (
    <InputContainer sideBar={sideBar}>
      <Input
        type="text"
        placeholder={placeholder}
        forr="mainPage"
        maxLength={100}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <BiSearchAlt />
    </InputContainer>
  );
}

export default SearchInputContainer;
