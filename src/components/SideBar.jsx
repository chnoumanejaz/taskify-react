import styled from 'styled-components';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import Heading from './Heading';
import Button from './Button';
import useGetProjects from '../features/projects/useGetProjects';
import Modal from './Modal';
import AddProjectForm from './AddProjectForm';
import Input from './Input';
import ProjectItem from './ProjectItem';
import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

const StyledSideBar = styled.aside`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  padding: 2rem 1.5rem;
  text-transform: uppercase;
  position: fixed;
  top: 7rem;
  bottom: 0;
  z-index: 9;
  width: 300px;
  overflow-y: scroll;
  overflow-x: hidden;

  & h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & div {
      display: flex;
      align-items: center;
      column-gap: 0.5rem;
    }
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

const Divider = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  position: relative;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-100);
  & input {
    width: 100%;
    border-radius: 5rem;
    padding: 0.7rem 1.5rem;
    padding-left: 4rem;
  }
  & svg {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    top: 0.8rem;
    left: 1rem;
    color: var(--color-primary-600);
  }
`;

const List = styled.ul`
  margin-top: 2rem;
`;

function SideBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { projects } = useGetProjects();
  
  const filteredData = projects?.filter(project => {
    return (
      project.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  });

  return (
    <Modal>
      <StyledSideBar>
        <Heading as="h2">
          <div>
            Projects
            <span className="tag">
              {projects?.length < 10 ? '0' + projects.length : projects.length}
            </span>
          </div>
          <Modal.Open openName="create-project">
            <Button size="small" iconStart={<AiOutlinePlus />}>
              New
            </Button>
          </Modal.Open>
        </Heading>
        <Divider>
          <Input
            type="text"
            placeholder="Search by name, category"
            forr="mainPage"
            maxLength={100}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <BiSearchAlt />
        </Divider>
        <List>
          {filteredData.length > 0 ? (
            filteredData.map(project => (
              <ProjectItem project={project} key={project.id + project.name} />
            ))
          ) : (
            <ErrorMessage
              message="No Project found for that query"
              query={searchQuery}
            />
          )}
        </List>
      </StyledSideBar>

      <Modal.Window name="create-project">
        <AddProjectForm />
      </Modal.Window>
    </Modal>
  );
}

export default SideBar;
