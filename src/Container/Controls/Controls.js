import React from "react";
import { SiSpeedtest } from "react-icons/si";
import { BsFillPauseCircleFill } from "react-icons/bs";
import { FaPlayCircle } from "react-icons/fa";
import { BsFillSkipBackwardCircleFill } from "react-icons/bs";
import { BsFillFastForwardCircleFill } from "react-icons/bs";
import { ImVolumeMute2 } from "react-icons/im";
import { VscUnmute } from "react-icons/vsc";
import { motion } from "framer-motion";

const Controls = ({
  iconSize,
  playerRef,
  volume,
  duration,
  currentTime,
  setCurrentTime,
  setVolume,
  setMuted,
  setPlaying,
  playing,
  muted,
}) => {
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handlePlayVideo = () => {
    setPlaying(true);
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

  const progress = (currentTime / duration) * 100;

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

  const handleSpeedChangeNew = (event) => {
    console.log("event", event);
    const newSpeed = parseFloat(event);
    const player = playerRef.current.getInternalPlayer();
    console.log("player", player);
    if (player) {
      player.setPlaybackRate(newSpeed);
    }
  };

  return (
    <div className="w-100 h-100 position-absolute d-flex justify-content-center align-items-center flex-column">
      {/* Play / Pause  & Forward / Backward Functionality */}
      <div
        className="d-flex justify-content-between align-items-center w-75"
        style={{
          fontSize: iconSize,
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
        className="w-100 position-absolute"
        style={{
          bottom: "35px",
          paddingLeft: "10px",
          paddingRight: "10px",
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
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Mute / Unmute & Volume Control & Timing Functionality */}
      <div
        className="d-flex align-items-center position-absolute text-white gap-3"
        style={{
          bottom: "3px",
          left: "15px",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        {muted ? (
          <ImVolumeMute2 size={25} onClick={() => toggleMuted(false)} />
        ) : (
          <VscUnmute size={25} onClick={() => toggleMuted(true)} />
        )}
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          hidden={muted}
        />
        {Math.floor(currentTime / 60) +
          ":" +
          ("0" + Math.floor(currentTime % 60)).slice(-2)}
        /{toTimeString(duration)}
      </div>

      {/* Speed Functionality */}
      <div
        className="btn-group dropup position-absolute d-flex justify-content-center align-items-center"
        style={{
          bottom: "5px",
          right: "12%",
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
  );
};

export default Controls;
