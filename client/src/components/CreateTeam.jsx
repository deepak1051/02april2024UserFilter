import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

import { FcDepartment } from 'react-icons/fc';

import { CgUnavailable } from 'react-icons/cg';
import { GoDotFill } from 'react-icons/go';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToTeam, removeToTeam } from '../store/slices/teamSlice';

export default function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const [teamDomain, setTeamDomain] = useState('');

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const { teamUsers } = useSelector((state) => state.team);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      // setPage(1);
      try {
        const { data } = await axios.get(
          `/api/users?page=${page}&domain=${teamDomain}`
        );

        setUsers(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, teamDomain]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/team', {
        name: teamName,

        members: teamUsers,
      });

      navigate('/teams');
    } catch (error) {
      console.log(error);
      setError(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // if (loading) return <p>Loading...</p>;

  // if (error) return <p className="text-red">{error}</p>;

  return (
    <div className="container mx-auto px-6 max-w-3xl ">
      <h2 className="text-2xl font-bold text-center py-6 ">Create A Team</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <div>
          <p className="text-gray-600">Selected Team Memebers</p>
          <div className="flex gap-4 mt-4  flex-wrap">
            {teamUsers?.map((user) => (
              <div
                key={user._id}
                className=" p-2 bg-slate-200 flex rounded-lg shadow-sm w-full gap-2 justify-between"
              >
                <div className="w-12 bg-gray-500 rounded-md">
                  <img
                    height={'100%'}
                    width={'100%'}
                    className=""
                    src={user.avatar}
                    alt="avatar"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <FaUser className="text-gray-600" />
                  <p>
                    {user.first_name} {user.last_name}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <FcDepartment className="text-gray-600" />
                  <p>{user.domain}</p>
                </div>

                <div className="flex items-center gap-2  min-w-52 rounded justify-center">
                  <button
                    onClick={() => dispatch(removeToTeam(user))}
                    type="button"
                    className="flex items-center gap-1 bg-black p-2 rounded text-white font-semibold  text-sm"
                  >
                    Remove To Team
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error ? (
          <p className="rounded p-4 border border-red-400 bg-red-200 ">
            {error}
          </p>
        ) : null}

        <button
          disabled={loading}
          className="bg-pink-600 p-2 text-white font-semibold rounded"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>

      <hr />

      <hr />

      <div className="flex gap-4 mt-4  flex-wrap">
        {users?.map((user) => (
          <div
            key={user._id}
            className=" p-2 bg-slate-200 flex rounded-lg shadow-sm w-full gap-2 justify-between"
          >
            <div className="w-12 bg-gray-500 rounded-md">
              <img
                height={'100%'}
                width={'100%'}
                className=""
                src={user.avatar}
                alt="avatar"
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <FaUser className="text-gray-600" />
              <p>
                {user.first_name} {user.last_name}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <FcDepartment className="text-gray-600" />
              <p>{user.domain}</p>
            </div>

            <div className="flex items-center gap-2  min-w-52 rounded justify-center">
              {user.available ? (
                <button
                  onClick={() => dispatch(addToTeam(user))}
                  className="flex items-center gap-1 bg-black p-2 rounded text-white font-semibold  text-sm"
                >
                  <GoDotFill color="green" />
                  Add To Team
                </button>
              ) : (
                <div className="flex items-center gap-1 bg-gray-400 p-2 rounded text-white font-semibold  text-sm">
                  <CgUnavailable color="crimson" />

                  <button>Unavailable</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <hr />

      <div className=" gap-4 py-8 flex items-center justify-center">
        <button
          className="text-white bg-slate-500 p-2 rounded w-24 font-semibold disabled:bg-gray-400 cursor-pointer"
          disabled={page === 1}
          onClick={handlePrevPage}
        >
          Previous
        </button>
        <span className="text-white w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center">
          {page}
        </span>
        <button
          className="text-white bg-slate-500 p-2 rounded w-24 font-semibold disabled:bg-gray-400 cursor-pointer"
          disabled={users.length < 20}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
