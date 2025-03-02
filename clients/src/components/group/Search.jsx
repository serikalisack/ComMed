import React from "react";
import SkeletonLoading from "../ui/SkeletonLoading";
import "../../pages/home.css";

function Search({ type, isLoading, searchResults, handleClick, search }) {
  return (
    <div
      className={`${
        search
          ? "scrollbar-hide overflow-y-scroll h-[250px] mb-5 bg-black shadow-lg rounded-lg p-3 flex flex-col gap-y-3"
          : "hidden"
      }`}
    >
      {isLoading ? (
        <SkeletonLoading height={55} count={3} />
      ) : searchResults.length > 0 ? (
        searchResults?.map((e) => {
          return (
            <div
              key={e._id}
              className="flex items-center justify-between bg-[#1c1c1c] p-2 rounded-lg hover:bg-[#222] transition duration-200"
            >
              <div className="flex items-center gap-x-3">
                <img
                  className="w-[45px] h-[45px] rounded-full border-2 border-gold shadow-md"
                  src={
                    !e.profilePic
                      ? "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                      : e.profilePic
                  }
                  alt="Profile"
                />
                <div className="flex flex-col">
                  <h5 className="text-[15px] text-gold font-semibold tracking-wide">
                    {e.name}
                  </h5>
                  <h5 className="text-[12px] text-gray-400">{e.email}</h5>
                </div>
              </div>
              <button
                onClick={() => handleClick(e)}
                className="bg-gold hover:bg-[#d4a817] transition-all px-4 py-2 text-[12px] font-medium tracking-wide text-black rounded-lg shadow-sm"
              >
                Add
              </button>
            </div>
          );
        })
      ) : (
        <span className="text-[14px] text-gray-400 text-center">No results found</span>
      )}
    </div>
  );
}

export default Search;
