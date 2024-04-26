import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import UserContainer from "../components/UserContainer";
import Loading from "../components/Loading";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);

  const user = useRef("");
  async function allusers() {
    try {
      if(user.current.value === ""){
        setLoading(true)
        const res = await axios.get("https://api.github.com/users1");
      setUsers(res.data);
      console.log(res.data);
      setLoading(null)
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    allusers();
  }, []);

  async function findUser() {
    setLoading(true)
    if (user.current.value !== "") {
      setUsers("");
      const res = await axios.get(
        `https://api.github.com/users/${user.current.value}`
      );
      setUsers(() => [res.data]);
      console.log(users);
      user.current.value = "";
    } else {
      allusers();
    }
    setLoading(null)
  }
  return (
    <div>
      <div className="flex justify-center h-11  my-5 items-center">
        <input
          type="text"
          placeholder="Search github User....."
          className="h-full md:w-1/3 outline-none text-gray-800 px-2 
          font-semibold text-lg w-2/3"
          ref={user}
        />
        <button
          onClick={findUser}
          className="bg-teal-500 font-semibold  px-4 h-full font-[Poppins]"
        >
          Search
        </button>
      </div>
      { loading ? <Loading/> : <UserContainer users={users} />}
    </div>
  );
};

export default Users;
