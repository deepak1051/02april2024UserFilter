import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <h1>
        <Link to="/">Users App</Link>
      </h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/create-team">Create Team</Link>
      </div>
    </div>
  );
}
