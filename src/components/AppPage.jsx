import { useEffect, useState } from 'react';
import Sidebar from "./Sidebar"
import DisplayHome from "./DisplayHome"
import { useSearchParams, useNavigate } from 'react-router-dom';

const AppPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
  const accessToken = searchParams.get('access_token');
  if (accessToken) {
    setToken(accessToken);
  } else {
    navigate('/');
  }
}, [searchParams, navigate]);


  if (!token) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#121212]">
  <div className="flex flex-1 flex-col md:flex-row">
    <Sidebar className="w-full md:w-64" />
    <div className="flex-1 overflow-auto">
      <DisplayHome />
    </div>
  </div>
</div>

  );
};

export default AppPage;
