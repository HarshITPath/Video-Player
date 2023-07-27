import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { SiSpeedtest } from "react-icons/si";
import { BsFillPauseCircleFill } from "react-icons/bs";
import { FaPlayCircle } from "react-icons/fa";
import { BsFillSkipBackwardCircleFill } from "react-icons/bs";
import { BsFillFastForwardCircleFill } from "react-icons/bs";
import { ImVolumeMute2 } from "react-icons/im";
import { VscUnmute } from "react-icons/vsc";
import "./style.css";
import { motion } from "framer-motion";

const VideoPlayer = ({ videoId }) => {
  const [youtubeUrl, setYoutubeUrl] = useState();
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [quality, setQuality] = useState("auto");
  const [iconSize, setIconSize] = useState(getIconSize());

  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handlePlayVideo = () => {
    setPlaying(true);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const getCurrentTime = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      setCurrentTime(currentTime);
    }
  };

  function toTimeString(totalSeconds) {
    const totalMs = totalSeconds * 1000;
    const result = new Date(totalMs).toISOString().slice(11, 19);
    return result;
  }

  const handleProgress = (progress) => {
    if (!isSeeking) {
      setCurrentTime(progress.playedSeconds);
    }
  };

  const progress = (currentTime / duration) * 100;

  // const handleSeek = (e) => {
  //   const seekTime = parseFloat(e.target.value);
  //   setCurrentTime(seekTime);
  // };

  const handleSeekMouseUp = (e) => {
    console.log("e", e);
    const progressBar = e.target;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const seekPercentage = clickPosition / progressBarWidth;
    const seekTime = seekPercentage * duration;
    console.log("seekTime", seekTime);
    setCurrentTime(seekTime);
    playerRef.current.seekTo(seekTime);
  };

  const handleForward = () => {
    playerRef.current.seekTo(
      playerRef.current.getCurrentTime() + 10,
      "seconds"
    );
  };

  const handleBackward = () => {
    playerRef.current.seekTo(
      playerRef.current.getCurrentTime() - 10,
      "seconds"
    );
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const toggleMuted = (status) => {
    if (status) setVolume(0);
    setMuted(status);
    console.log("muted", muted);
    if (muted) {
      setVolume(0);
    }
  };

  const handleSpeedChange = (speed) => {
    const player = playerRef.current.getInternalPlayer();
    if (player) {
      player.setPlaybackRate(speed);
    }
  };

  const handleSpeedChangeNew = (event) => {
    console.log("event", event);
    const newSpeed = parseFloat(event);
    const player = playerRef.current.getInternalPlayer();
    console.log("player", player);
    if (player) {
      player.setPlaybackRate(newSpeed);
    }
  };

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

  // const handleQualityChange = (event) => {
  //   const newQuality = event.target.value;
  //   setQuality(newQuality);
  // };

  // useEffect(() => {
  //   // Example usage: Get the current time every second
  //   const interval = setInterval(getCurrentTime, 1000);
  //   return () => clearInterval(interval);
  // }, []);

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
          <div
            className="mt-3 parent"
            style={{ width: "100%", position: "relative" }}
          >
            <div className="child">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {/* Play / Pause Functionality */}
                {/* Forward / Backward Functionality */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: iconSize,
                    // padding: "0 25px",
                    width: "75%",
                  }}
                >
                  <motion.div
                    // whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1.3 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <BsFillSkipBackwardCircleFill
                      onClick={handleBackward}
                      color="#ffffff"
                      style={{
                        cursor: "pointer",
                        paddingRight: "5px",
                      }}
                    />
                  </motion.div>

                  <motion.div
                    // whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1.3 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    {playing ? (
                      <BsFillPauseCircleFill
                        onClick={handlePlayPause}
                        color="#ffffff"
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <FaPlayCircle
                        onClick={handlePlayPause}
                        color="#ffffff"
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </motion.div>

                  <motion.div
                    // whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1.3 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <BsFillFastForwardCircleFill
                      onClick={handleForward}
                      color="#ffffff"
                      style={{
                        cursor: "pointer",
                        paddingLeft: "5px",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Progress Bar Functionality */}
                <div
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    width: "100%",
                    position: "absolute",
                    bottom: "35px",
                  }}
                >
                  <div
                    className="progress"
                    role="progressbar"
                    aria-valuenow={currentTime}
                    aria-valuemin={0}
                    aria-valuemax={duration}
                    onClick={handleSeekMouseUp}
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Mute / Unmute & Volume Control & Timing Functionality */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    bottom: "3px",
                    left: "15px",
                    color: "white",
                    gap: 8,
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  {muted ? (
                    <ImVolumeMute2
                      size={25}
                      onClick={() => toggleMuted(false)}
                    />
                  ) : (
                    <VscUnmute size={25} onClick={() => toggleMuted(true)} />
                  )}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) =>
                      handleVolumeChange(parseFloat(e.target.value))
                    }
                    hidden={muted}
                  />
                  {Math.floor(currentTime / 60) +
                    ":" +
                    ("0" + Math.floor(currentTime % 60)).slice(-2)}
                  /{toTimeString(duration)}
                </div>

                {/* Speed Functionality */}
                <div
                  className="btn-group dropup"
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "12%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <SiSpeedtest
                    style={{
                      height: "27px",
                      width: "27px",
                      cursor: "pointer",
                      color: "white",
                    }}
                    data-bs-toggle="dropdown"
                  />
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleSpeedChangeNew(0.5)}
                        value={0.5}
                      >
                        0.5x
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleSpeedChangeNew(1)}
                        value={1}
                      >
                        1x
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleSpeedChangeNew(1.5)}
                        value={1.5}
                      >
                        1.5x
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleSpeedChangeNew(2)}
                        value={2}
                      >
                        2x
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

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
          <p className="title" style={{ fontWeight: "bold", marginTop: "5px" }}>
            {title}
          </p>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
