import React, { useState } from "react";
import ReactPlayer from "react-player";
import style from "./style.css";
import { videosdata } from "./videodata";
import VideoPlayer from "../Video/video";

const VideoGrid = () => {
  const handleBlankClick = (url) => {
    // console.log("Clicked on video ID:", id);
    setVideoId(url);
  };

  const [videoId, setVideoId] = useState();

  return (
    <div className="container">
      <VideoPlayer videoId={videoId} />
      <div className="video-grid" style={{ marginTop: "25px" }}>
        {videosdata.map((video, index) => (
          <div key={index} className="video-player-container">
            <ReactPlayer url={video.url} width="100%" height="100%" />
            <div
              className="blank"
              onClick={() => handleBlankClick(video.url)}
            ></div>
            <div className="video-title">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
