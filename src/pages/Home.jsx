import WelcomeScreen from '../components/WelcomeScreen';
import useGetProjects from '../features/projects/useGetProjects';

function Home() {
  const { projects } = useGetProjects();

  if (!projects?.length) return <WelcomeScreen />;
}

export default Home;
