import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = ({ token }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  useEffect(() => {
    if (!token) return;

    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }

        const data = await response.json();
        const playlists = data.items
          .slice(0, 5)
          .map((item) => ({
            id: item.id,
            name: item.name,
            imageUrl: item.images[0]?.url || "",
          }));

        setLibrary(playlists);
      } catch (error) {
        console.error(error);
        setLibrary([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [token]);

  return (
    <div className="w-[25%] min-w-[200px] h-full p-2 flex-col text-white hidden lg:flex relative pb-24">
      {/* Top Section */}
      <div className="bg-[#121212] rounded flex flex-col justify-around py-4 gap-2 mb-4">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-6 cursor-pointer"
        >
          <img className="w-6" src={assets.home_icon} alt="Home" />
          <p className="font-bold text-sm px-2">Home</p>
        </div>

        <div className="flex items-center gap-3 px-6">
          <img className="w-6" src={assets.search_icon} alt="Search" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-transparent font-bold text-white placeholder-white focus:outline-none flex-grow px-2"
          />
        </div>
      </div>

      {/* Library Section */}
      <div className="bg-[#121212] rounded overflow-y-auto flex-1">
        <div className="p-4 flex items-center gap-3">
          <img className="w-8" src={assets.stack_icon} alt="Library" />
          <p className="font-semibold text-sm">Your Library</p>
        </div>

        {loading ? (
          <p className="text-center text-sm text-gray-400">Loading...</p>
        ) : library.length === 0 ? (
          <p className="text-gray-500 text-sm">No items in your library</p>
        ) : (
          <ul className="px-4">
            {library
              .filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <li
                  key={item.id}
                  className="cursor-pointer py-2 hover:text-green-500 flex items-center gap-3"
                  onClick={() => navigate(`/app/library/${item.id}`)}
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-8 h-8 rounded-sm object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-700 rounded-sm" />
                  )}
                  {item.name}
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Log Out */}
      <div
        onClick={handleLogout}
        className="absolute bottom-4 left-4 flex items-center gap-3 cursor-pointer hover:text-green-500"
        title="Log Out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
        <span className="font-semibold text-sm select-none">Log Out</span>
      </div>
    </div>
  );
};

export default Sidebar;
