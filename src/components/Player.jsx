import { useState, useRef, useEffect } from "react"
import YouTube from "react-youtube"
import { QueueListIcon, Squares2X2Icon } from "@heroicons/react/24/solid"

const Player = ({ currentSong, nextSong, previousSong, setTab }) => {
  const [player, setPlayer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoPlayerRef = useRef(null)

  const onReady = (event) => setPlayer(event.target)

  const onStateChange = (event) => setIsPlaying(event.data === 1)

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) player.pauseVideo()
      else player.playVideo()
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          previousSong()
          break
        case "ArrowRight":
          nextSong()
          break
        case " ":
          togglePlayPause()
          break
        default:
          break
      }
    }
    window.addEventListener("keydown", handleKeyDown, true)

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true)
    }
  }, [nextSong, previousSong, togglePlayPause])

  return (
    <>
      <button onClick={() => setTab((a) => (a === 0 ? -1 : 0))}>
        <Squares2X2Icon className="w-7 text-gray-700" />
      </button>

      <div className="w-2/3 overflow-hidden rounded-3xl">
        <YouTube
          ref={videoPlayerRef}
          videoId={currentSong.video}
          key={currentSong.video}
          onReady={onReady}
          onStateChange={onStateChange}
          onEnd={nextSong}
          opts={{
            width: "100%",
            height: `${Math.floor(window.innerWidth * 0.66667 * 0.5625)}px`,
            playerVars: {
              autoplay: 1,
              controls: 0,
              disablekb: 1,
            },
          }}
        />
        <div className="flex justify-center mt-2 text-2xl">
          {currentSong.title} • {currentSong.artist}
        </div>
      </div>

      <button onClick={() => setTab((a) => (a === -2 ? -1 : -2))}>
        <QueueListIcon className="w-7 text-gray-700" />
      </button>

      {/* <div className="z-[10] fixed bottom-0 left-0 right-0 px-5 py-3 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{currentSong.title}</h3>
          <span>
            {currentSong.artist} • {"Anime name"}
          </span>
        </div>
        <div className="flex gap-5">
          <button onClick={previousSong}>
            <BackwardIcon className="w-7" />
          </button>
          <button onClick={togglePlayPause}>
            {isPlaying ? (
              <PauseIcon className="w-10" />
            ) : (
              <PlayIcon className="w-10" />
            )}
          </button>
          <button onClick={nextSong}>
            <ForwardIcon className="w-7" />
          </button>
        </div>
      </div> */}
    </>
  )
}

export default Player
