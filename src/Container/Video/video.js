import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import "./style.css";
import Controls from "../Controls/Controls";

const VideoPlayer = ({ videoId }) => {
  const [youtubeUrl, setYoutubeUrl] = useState();
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [iconSize, setIconSize] = useState(getIconSize());
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const playerRef = useRef(null);

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleProgress = (progress) => {
    if (!isSeeking) {
      setCurrentTime(progress.playedSeconds);
    }
  };

  // const handleSeek = (e) => {
  //   const seekTime = parseFloat(e.target.value);
  //   setCurrentTime(seekTime);
  // };

  const player = playerRef.current?.getInternalPlayer();
  const title = player?.videoTitle;

  function getIconSize() {
    if (window.innerWidth <= 576) {
      return "50px";
    } else if (window.innerWidth <= 768) {
      return "60px";
    } else if (window.innerWidth <= 992) {
      return "70px";
    } else {
      return "80px";
    }
  }

  useEffect(() => {
    videoId && setYoutubeUrl(videoId);
    function handleResize() {
      setIconSize(getIconSize());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [videoId]);

  return (
    <div className="container">
      <div className="gap-4 mt-4">
        <div className="col-xs-12">
          <input
            type="text"
            className="form-control"
            placeholder="Enter YouTube video URL"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </div>
        {/* <div className="col-xs-12">
        <button
          style={{ width: "150px" }}
          type="button"
          className="btn btn-primary"
          onClick={handlePlayVideo}
        >
          Play Video
        </button>
        </div>   */}
      </div>

      {youtubeUrl && (
        <>
          <div className="mt-3 parent w-100 position-relative">
            <div className="child"></div>
            <Controls
              iconSize={iconSize}
              playerRef={playerRef}
              volume={volume}
              duration={duration}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              setVolume={setVolume}
              setIsSeeking={setIsSeeking}
              setMuted={setMuted}
              playing={playing}
              setPlaying={setPlaying}
              muted={muted}
            />
            <ReactPlayer
              ref={playerRef}
              url={youtubeUrl}
              playing={playing}
              width="100%"
              height="100%"
              onDuration={handleDuration}
              onProgress={handleProgress}
              volume={volume}
              muted={muted}
            />
          </div>
          <p className="title mt-4" style={{ fontWeight: "bold" }}>
            {title}
          </p>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
