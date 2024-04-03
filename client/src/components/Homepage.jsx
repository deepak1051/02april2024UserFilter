import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FcDepartment } from 'react-icons/fc';
import { FaMale, FaFemale } from 'react-icons/fa';
import { BiFemale } from 'react-icons/bi';
import { CgUnavailable } from 'react-icons/cg';
import { GoDotFill } from 'react-icons/go';
export default function Homepage() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const [gender, setGender] = useState('');
  const [domain, setDomain] = useState('');
  const [available, setAvailable] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      // setPage(1);
      try {
        const { data } = await axios.get(`/api/users?page=${page}`);

        setUsers(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    // setLoading(true);
    // setError(null);
    const fetchData = async () => {
      // setPage(1);
      try {
        const { data } = await axios.get(
          `/api/users?q=${searchTerm}&gender=${gender}&domain=${domain}&available=${available}`
        );

        setUsers(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, gender, domain, available]);

  useEffect(() => {
    // setLoading(true);
    // setError(null);

    let timerId = setTimeout(() => {
      // setPage(1);
      const fetchData = async () => {
        try {
          const { data } = await axios.get(
            `/api/users?q=${searchTerm}&gender=${gender}&domain=${domain}&available=${available}`
          );

          setUsers(data.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, 1000);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red">{error}</p>;

  return (
    <div className="container mx-auto px-6 md:px-24">
      <div className="py-10">
        <h2>Users {users.length}</h2>
        <div className="flex gap-2">
          <input
            value={searchTerm}
            onChange={(e) => {
              setPage(1);
              setSearchTerm(e.target.value);
            }}
            className="outline-none p-2 rounded border border-gray-200 w-full"
          />
          <button className="bg-pink-600 p-2 text-white font-semibold rounded">
            Search
          </button>
        </div>
      </div>

      <div className="flex gap-2 pb-6">
        <div>
          <select
            value={gender}
            onChange={(e) => {
              setPage(1);
              setGender(e.target.value);
            }}
            className="outline-none border p-2 rounded border-gray-400 cursor-pointer"
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <select
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            className="outline-none border p-2 rounded border-gray-400 cursor-pointer"
          >
            <option value="All">All Avaiable</option>
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>

        <div>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
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
      </div>
      <div className="flex gap-4   flex-wrap">
        {users?.map((user) => (
          <div
            key={user._id}
            className=" p-4 bg-slate-200 flex rounded-lg shadow-sm w-96 gap-2"
          >
            <div className="w-32 bg-gray-500 rounded-md">
              <img
                height={'100%'}
                width={'100%'}
                className=""
                src={user.avatar}
                alt="avatar"
              />
            </div>
            <div className="flex-1  text-sm flex  flex-col gap-1">
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-600" />
                <p>
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MdEmail className="text-gray-600" />
                <p>{user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <FcDepartment className="text-gray-600" />
                <p>{user.domain}</p>
              </div>
              <div className="flex items-center gap-2">
                {user.gender === 'Male' ? (
                  <FaMale className="text-gray-600" />
                ) : user.gender === 'Female' ? (
                  <FaFemale className="text-gray-600" />
                ) : (
                  <BiFemale className="text-gray-600" />
                )}
                <p>{user.gender}</p>
              </div>
              <div className="flex items-center gap-2">
                {/* <FaUser className="text-gray-600" /> */}
                {user.available ? (
                  <div className="flex items-center gap-1 bg-gray-400 p-2 rounded text-white font-semibold mt-2 text-sm">
                    <GoDotFill color="green" />

                    <button>Available</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-gray-400 p-2 rounded text-white font-semibold mt-2 text-sm">
                    <CgUnavailable color="crimson" />

                    <button>Unavailable</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

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
