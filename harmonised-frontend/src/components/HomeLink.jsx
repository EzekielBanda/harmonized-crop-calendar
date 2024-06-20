import React from "react";
import { IoIosHome } from "react-icons/io";

const HomeLink = ({ href }) => {
  return (
    <a
      href={href}
      className="flex items-center space-x-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-2 py-2 text-sm font-bold"
    >
        <IoIosHome className="block h-6 w-6 pr-1" />
      Home
    </a>
  );
};

export default HomeLink;
