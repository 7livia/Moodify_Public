import Navbar from "./Navbar"
import GeneratePlaylistForm from "./GeneratePlaylistForm"

const DisplayHome = () => {
  return (
    <>
    <Navbar/>
    <div className="home">
        <GeneratePlaylistForm /> 
      </div>
    </>
  )
}

export default DisplayHome