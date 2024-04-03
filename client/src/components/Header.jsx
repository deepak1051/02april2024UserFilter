import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
      <h1>
        <Link className="text-2xl font-semibold" to="/">
          Users App
        </Link>
      </h1>
      <div className="flex gap-2">
        <Link className="border border-gray-400 p-2 rounded" to="/create-team">
          New
        </Link>
        <Link className="border border-gray-400 p-2 rounded" to="/teams">
          Teams
        </Link>
      </div>
    </div>
  );
}
