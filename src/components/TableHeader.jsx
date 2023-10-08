import styled from 'styled-components';
import Heading from './Heading';

const StyledTableHeader = styled.div`
  background-color: var(--color-grey-100);
  // checkbox, priority, name, domain, date, assigned to, details btn
  grid-template-columns: 4rem 6rem 25rem 25rem 15rem 10rem 8rem;
  column-gap: 1rem;
  align-items: center;
  padding: 1.5rem 1rem;
  display: grid;
  border-bottom: 1.2px solid var(--color-grey-200);
  color: var(--color-primary-800);
  & h3 {
    font-size: 1.6rem;
  }
`;

function TableHeader() {
  return (
    <StyledTableHeader>
      {/* checkbox, priority, name, domain, date, assigned to, details btn */}
      <div></div>
      <div></div>
      <Heading as="h3">Name</Heading>
      <Heading as="h3">Domain</Heading>
      <Heading as="h3">Due Date</Heading>
      <Heading as="h3">Assigned</Heading>
      <div></div>
    </StyledTableHeader>
  );
}

export default TableHeader;
