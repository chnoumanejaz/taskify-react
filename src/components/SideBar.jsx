import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import useGetProjects from '../features/projects/useGetProjects';
import AddProjectForm from './AddProjectForm';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import Heading from './Heading';
import Modal from './Modal';
import ProjectItem from './ProjectItem';
import SearchInputContainer from './SearchInputContainer';

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

        <SearchInputContainer
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search by name, category"
          sideBar
        />
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
