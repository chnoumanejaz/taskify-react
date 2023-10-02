import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
      SomeThing Went wrong
      <br />
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default PageNotFound;
