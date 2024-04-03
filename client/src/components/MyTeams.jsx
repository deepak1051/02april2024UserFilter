import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function MyTeams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/team');

        setTeams(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-center py-6">My Teams</h1>
      <div className="flex flex-col gap-4">
        {teams.map((team) => (
          <div
            key={team._id}
            className="flex items-center justify-between bg-slate-400 p-4 rounded text-white"
          >
            <h2 className="font-semibold text-xl">{team.name}</h2>
            <p>Members: {team.members.length}</p>
            <Link
              to={`/teams/${team._id}`}
              className="text-white   p-2 bg-blue-700 rounded "
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
