import { useState } from 'react';

export default function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const [teamDomain, setTeamDomain] = useState('');

  return (
    <div className="container mx-auto px-6">
      <h2>Create A Team</h2>
      <form className="flex flex-col gap-4">
        <div>
          <label>Team Name</label>
          <input
            className="outline-none p-2 rounded border border-gray-200 w-full"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label>Team Domain</label>
          <select
            value={teamDomain}
            onChange={(e) => setTeamDomain(e.target.value)}
            className="outline-none border p-2 rounded border-gray-400 cursor-pointer"
          >
            <option value="">All Domain</option>
            <option value={'Finance'}>Finance</option>
            <option value={'Marketing'}>Marketing</option>
            <option value={'Sales'}>Sales</option>
            <option value={'UI Designing'}>UI Designing</option>
            <option value={'IT'}>IT</option>
            <option value={'Management'}>Management</option>
            <option value={'Business Development'}>Business Development</option>
          </select>
        </div>

        <button className="bg-pink-600 p-2 text-white font-semibold rounded">
          Save
        </button>
      </form>
    </div>
  );
}
