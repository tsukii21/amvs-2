import { useEffect, useState } from "react"
import { useDataContext } from "../contexts/data"
import arrayShuffle from "array-shuffle"
import Player from "./Player"
import { BarLoader } from "react-spinners"

const Home = () => {
  const { animes, songs } = useDataContext()
  const [playlist, setPlaylist] = useState([])
  const [currentSongIndex, setCurrentSongIndex] = useState(null)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [tabState, setTabState] = useState(-1)

  const shuffleSongs = (songs) => {
    const shuffledSongs = arrayShuffle(songs)
    setPlaylist(shuffledSongs)
    setCurrentSongIndex(0)
    setTabState(-1)
  }

  const nextSong = () => {
    setCurrentSongIndex(
      currentSongIndex < playlist.length - 1 ? currentSongIndex + 1 : 0
    )
  }

  const previousSong = () => {
    setCurrentSongIndex(
      currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1
    )
  }

  useEffect(() => {
    shuffleSongs(songs)
  }, [songs])

  const togglePlaylist = () => setShowPlaylist(!showPlaylist)

  const playAnime = (id) => {
    shuffleSongs(songs.filter((song) => song.anime_id === id))
  }

  return (
    <>
      {playlist.length ? (
        <div
          style={{ marginLeft: tabState * 40 + "vw" }}
          className="flex h-screen duration-500"
        >
          <div className="flex-none w-[40vw]">
            <div className="h-screen overflow-scroll p-20 grid grid-cols-3 gap-10">
              <div
                onClick={() => shuffleSongs(songs)}
                className="w-28 h-40 rounded-xl cursor-pointer bg-gray-900"
              ></div>
              {animes.map((a) => (
                <div
                  onClick={() => playAnime(a.id)}
                  className="w-28 h-40 rounded-xl cursor-pointer"
                  style={{
                    background: `url('${a.poster}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex-none w-screen flex justify-around items-center">
            <Player
              currentSong={playlist[currentSongIndex]}
              nextSong={nextSong}
              previousSong={previousSong}
              showPlaylist={showPlaylist}
              togglePlaylist={togglePlaylist}
              shuffleSongs={shuffleSongs}
              setTab={setTabState}
            />
          </div>
          <div className="flex-none w-[40vw] p-20 h-screen overflow-scroll">
            {playlist.map((song, i) => (
              <div
                onClick={() => {
                  setCurrentSongIndex(i)
                }}
                className={`mb-1 flex gap-2 hover:bg-gray-900 cursor-pointer rounded-xl px-3 py-2 duration-500 ${
                  i === currentSongIndex ? "text-green-400" : ""
                }`}
              >
                <div>
                  <h3 className="text-lg font-bold">{song.title}</h3>
                  <span>{song.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <BarLoader color="#fff" />
        </div>
      )}
    </>
  )
}

export default Home
