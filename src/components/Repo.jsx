import React from "react";

const Repo = ({ users }) => {
  return (
    <>
      {users.map((s, index) => (
        <div key={index} className="bg-gray-900 p-3 leading-8">
          <a
            href={s.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-500 break-words font-semibold hover:underline"
          >
            {s.full_name}
          </a>
          <div className="flex gap-x-5">
            <h1 className="text-sm font-semibold"> {"🟢" + s.language}</h1>
            <h1 className="text-sm font-semibold">forks : {s.forks}</h1>
            <h1 className="text-sm font-semibold">
              stars : {s.stargazers_count}
            </h1>
          </div>
        </div>
      ))}
    </>
  );
};

export default Repo;
