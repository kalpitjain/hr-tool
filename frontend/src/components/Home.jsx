import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row items-center justify-center">
        <Link className="selection-link" to="/candidate/login">
          <button className="selection-button button bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2">
            Candidate
          </button>
        </Link>

        <Link className="selection-link" to="/hr/login">
          <button className="selection-button button bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2">
            HR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
