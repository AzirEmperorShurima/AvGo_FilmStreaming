// src/VideoList.js
import React from 'react';
// import VideoPlayer from './Video';

import './VideoList.css';
import { Link } from 'react-router-dom';
const VideoList = ({ videos }) => {
    // const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <div className='List-video'>
            <h2>Danh sách Video</h2>
            <ul id='videoListComponents'>
                {videos.map((video) => (
                    <li key={video.id} className='li-video-box'>
                        <Link to={`/listVideo/${video.id}`}>
                            <img src='https://tuoi69.lol/wp-content/uploads/2021/12/trieu-le-dinh-sexy-2.jpg'
                                className='video-thumbnail'></img>
                            <p className="video-title">{ video.title}</p>
                        </Link>
                       
                    </li>
                ))}
            </ul>
            {/* {selectedVideo && <VideoPlayer src={selectedVideo.src} />} */}
        </div>
    );
};

export default VideoList;
