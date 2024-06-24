// src/components/Media/VideoPlayer.js
import React, { useState, useEffect, useRef } from 'react';

const VideoPlayer = ({ src, width = '950', height = '530', id }) => {
    const isYouTube = src.includes('youtube.com');
    const isPhimmoi = src.includes('phimmoiday.net');
    const isBlobUrl = src.startsWith('blob:');
    const [blobUrl, setBlobUrl] = useState('');
    const [videoRef, setVideoRef] = useState(null);
    const playerRef = useRef(null);
    const [player, setPlayer] = useState(null);

    const onPlayerReady = (event) => {
        setPlayer(event.target);
        console.log('Player is ready');
    };

    useEffect(() => {
        const onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: height,
                width: width,
                videoId: id,
                events: {

                    'onReady': onPlayerReady
                }
            });
        };

        if (window.YT) {
            onYouTubeIframeAPIReady();
        } else {
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        }
    }, [id]);

    async function fetchDataFromBlobUrl(blobUrl) {
        try {
            const response = await fetch(blobUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/javascript',

                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            setBlobUrl(objectUrl);

            // Clean up object URL when component unmounts or when blobUrl changes
            return () => URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getYouTubeEmbedUrl = (url) => {
        const videoId = new URL(url).searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
    };

    const getPhimmoiEmbedUrl = (url) => {
        return url;
    };
    const handleFastForward = () => {
        if (player) {
            const currentTime = player.getCurrentTime();
            player.seekTo(currentTime + 10);
        }
    };

    const handleRewind = () => {
        if (player) {
            const currentTime = player.getCurrentTime();
            player.seekTo(currentTime - 10);
        }
    };
    return (
        <div className='VideoPlayer'>
            {isYouTube && (
                <iframe
                    ref={(ref) => setVideoRef(ref)}
                    width={width}
                    height={height}
                    src={getYouTubeEmbedUrl(src)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded YouTube"
                    className='ytbVideo'
                ></iframe>
            )}
            {isPhimmoi && (
                <iframe
                    ref={(ref) => setVideoRef(ref)}
                    width={width}
                    height={height}
                    src={getPhimmoiEmbedUrl(src)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded Phimmoi"
                ></iframe>
            )}
            {isBlobUrl && blobUrl && (
                <video width={width} height={height} controls>
                    <source src={blobUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            {!isYouTube && !isPhimmoi && !isBlobUrl && (
                <video width={width} height={height} controls>
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            <div>
                <button onClick={handleRewind}>Tua lại 10s</button>
                <button onClick={handleFastForward}>Tua tới 10s</button>
            </div>
        </div>
    );
};

export default VideoPlayer;
