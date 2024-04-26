import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Tabs from "../components/Tabs";
import Repo from "../components/Repo";
import Events from "../components/Events";
import UserContainer from "../components/UserContainer";
const UserInfo = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState([]);
  const [type, setType] = useState("repos");
  const [infos, setInfos] = useState([]);

  const navigate = useNavigate();
  // console.log(pathname)

  async function getUserInfo() {
    const res = await axios.get(`https://api.github.com/users${pathname}`);
    // console.log(res.data);
    setUser(() => [res.data]);
  }
  useEffect(() => {
    getUserInfo();
    getUrl();
  }, [pathname, type]);

  async function getUrl() {
    const res = await axios.get(
      `https://api.github.com/users${pathname}/${type}`
    );
    setInfos(res.data);
  }

  return (
    <div className="py-5">
      <button
        onClick={() => navigate("/")}
        className="px-5 py-1 font-medium mx-1 my-4 bg-teal-600 rounded text-gray-200"
      >
        Back
      </button>
      {user &&
        user?.map((uinfo, index) => (
          <div
            key={index}
            className="flex justify-center md:flex-row
             md:px-0 px-4 flex-col gap-10"
          >
            <img
              src={uinfo.avatar_url} 
              alt="avatrat-image"
              className="w-[350px] border-4 border-teal-400 md:mx-0 mx-auto"
            />
            <div className="text-lg leading-10 px-3">
              <h1 className="text-3xl pb-4">{uinfo.name}</h1>
              <h1>
                <span className="text-teal-400">Login_name</span> :{uinfo.login}
              </h1>
              <h1>
                <span className="text-teal-400">followers : </span>
                {uinfo.followers}
              </h1>
              <h1>
                <span className="text-teal-400">following : </span>
                {uinfo.following}
              </h1>
              <h1>
                <span className="text-teal-400">public_repositories : </span>
                {uinfo.public_repos}
              </h1>
              <h1>
                <span className="text-teal-400">Join : </span>
                {new Date(uinfo.created_at).toLocaleDateString()}
              </h1>
              <a
                href={uinfo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 
                  font-semibold rounded cursor-pointer  px-4 py-1 bg-teal-600 my-3 tracking-wide"
              >
                Visit
              </a>
            </div>
          </div>
        ))}
      <div className="flex border-b pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl ">
        <Tabs type={type} setType={setType} />
      </div>
      {type === "repos" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
          {infos && <Repo users={infos} />}
        </div>
      )}
      {type === "received_events" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto ">
          {<Events data={infos} />}
        </div>
      )}
      {type === "followers" && <UserContainer users={infos} />}
    </div>
  );
};

export default UserInfo;
