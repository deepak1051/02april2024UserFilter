import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiFemale } from 'react-icons/bi';
import { CgUnavailable } from 'react-icons/cg';
import { FaFemale, FaMale, FaUser } from 'react-icons/fa';
import { FcDepartment } from 'react-icons/fc';
import { GoDotFill } from 'react-icons/go';
import { MdEmail } from 'react-icons/md';
import { useParams } from 'react-router-dom';

export default function TeamDetails() {
  const [team, setTeam] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/team/${id}`);

        setTeam(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto px-6 max-w-3xl">
      <h2 className="py-6 font-semibold text-3xl text-center ">{team?.name}</h2>

      <div className="flex gap-4   flex-wrap">
        {team?.members?.map((user) => (
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
    </div>
  );
}
