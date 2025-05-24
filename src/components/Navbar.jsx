const Navbar = ({ spotifyProfilePic }) => {
  return (
    <div className="w-full flex justify-between items-center px-4 py-2 font-semibold mt-4">
      <button
        disabled
        className="bg-[#242424] text-white px-4 py-1 rounded-2xl text-sm sm:text-base cursor-default"
      >
        Playlist Generator
      </button>

      <img
        src={spotifyProfilePic || pfpDefault}
        alt="Profile"
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer object-cover"
      />
    </div>
  );
};

export default Navbar;
