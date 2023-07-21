import React from "react";
import ReactPlayer from "react-player";
import style from "./style.css"
import { videosdata } from "./videodata";

const VideoGrid = () => {
  return (
    <div className="container">
      <div className="video-grid">
        {videosdata.map((video, index) => (
          <div key={index} className="video-player-container">
            <ReactPlayer
              url={video.url}
              width="100%"
              height="100%"
            />
            <div className="video-title">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
