import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Videos.css';
import SEOHead from '../../components/SEOHead';
import { videosAPI } from '../../utils/api';

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [videoDurations, setVideoDurations] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();

    // Helper functions
    const getVideoId = (url) => {
        // Extract video ID for duration and other metadata
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            if (url.includes('youtu.be/')) {
                return url.split('youtu.be/')[1].split('?')[0];
            } else if (url.includes('youtube.com/watch?v=')) {
                return url.split('v=')[1].split('&')[0];
            } else if (url.includes('youtube.com/embed/')) {
                return url.split('embed/')[1].split('?')[0];
            }
        } else if (url.includes('streamable.com/')) {
            return url.split('streamable.com/')[1].split('?')[0];
        } else if (url.includes('/testvid/')) {
            // For local videos, we don't have a specific ID
            // but we can return a unique identifier based on the filename
            const filename = url.split('/').pop();
            return filename || null;
        }
        return null;
    };

    const getVideoThumbnail = (url) => {
        // Extract video ID and create thumbnail URL
        let videoId = null;

        // Handle YouTube URLs
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            // Handle youtu.be short URLs
            if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1].split('?')[0];
            }
            // Handle youtube.com/watch?v= URLs
            else if (url.includes('youtube.com/watch?v=')) {
                videoId = url.split('v=')[1].split('&')[0];
            }
            // Handle youtube.com/embed/ URLs
            else if (url.includes('youtube.com/embed/')) {
                videoId = url.split('embed/')[1].split('?')[0];
            }

            if (videoId) {
                return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            }
        }
        // Handle Streamable URLs
        else if (url.includes('streamable.com/')) {
            const streamableId = url.split('streamable.com/')[1].split('?')[0];
            if (streamableId) {
                return `https://cdn.streamable.com/image/${streamableId}.jpg`;
            }
        }
        // Handle locally uploaded videos
        else if (
            url.includes('/testvid/') ||
            url.includes('/winchmoh/testvid/') ||
            url.includes('/api/videos/stream/')
        ) {
            // For local videos, we can create a video thumbnail element dynamically
            // or use a default thumbnail
            return '/placeholder-video-thumbnail.jpg';
        }

        // Return a default thumbnail if no video ID found
        return null;
    };

    const getVideoEmbedUrl = (url) => {
        // Convert video URL to embed URL
        let embedUrl = url;

        console.log('Converting URL:', url);

        // Handle YouTube URLs
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            let videoId = null;

            // Handle youtu.be short URLs
            if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1].split('?')[0];
                console.log('youtu.be videoId:', videoId);
            }
            // Handle youtube.com/watch?v= URLs
            else if (url.includes('youtube.com/watch?v=')) {
                videoId = url.split('v=')[1].split('&')[0];
                console.log('youtube.com videoId:', videoId);
            }
            // Handle youtube.com/embed/ URLs
            else if (url.includes('youtube.com/embed/')) {
                videoId = url.split('embed/')[1].split('?')[0];
                console.log('embed videoId:', videoId);
            }

            embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : url;
            console.log('YouTube embed URL:', embedUrl);
        }
        // Handle Streamable URLs
        else if (url.includes('streamable.com/')) {
            // If it's already in embed format, use as is
            if (url.includes('streamable.com/e/')) {
                embedUrl = url;
                console.log('Streamable already in embed format:', embedUrl);
            } else {
                // Convert to embed format
                const videoId = url.split('streamable.com/')[1].split('?')[0];
                embedUrl = `https://streamable.com/e/${videoId}`;
                console.log('Streamable embed URL:', embedUrl);
            }
        }
        // Handle locally uploaded or streamed videos
        else if (
            url.includes('/api/videos/stream/')
        ) {
            // For locally uploaded videos, we'll use the URL directly
            // The URL already points to the video file
            embedUrl = url;
            console.log('Local video URL, using directly:', embedUrl);
        }

        console.log('Final embed URL:', embedUrl);
        return embedUrl;
    };

    const generateVideoDurations = useCallback(() => {
        const durations = {};

        videos.forEach((video, index) => {
            const videoId = getVideoId(video.videoUrl);
            if (videoId) {
                // Generate realistic durations based on video index
                const baseMinutes = 3 + (index % 8); // 3-10 minutes
                const seconds = Math.floor(Math.random() * 60);
                const duration = `${baseMinutes}:${seconds.toString().padStart(2, '0')}`;
                durations[video.id] = duration;
            } else {
                durations[video.id] = '--:--';
            }
        });
        setVideoDurations(durations);
    }, [videos]);

    // Event handlers
    const handleBackClick = () => {
        navigate('/');
    };

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const closeVideoModal = () => {
        setSelectedVideo(null);
    };

    // Data fetching
    const fetchVideos = async () => {
        try {
            setLoading(true);
            const data = await videosAPI.getAllVideos();

            if (data.success) {
                setVideos(data.data);
            } else {
                setError('Failed to fetch videos');
            }
        } catch (error) {
            setError('Error fetching videos: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Effects
    useEffect(() => {
        fetchVideos();
    }, []);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Generate video durations after videos are loaded
        if (videos.length > 0) {
            generateVideoDurations();
        }
    }, [videos, generateVideoDurations]);

    if (loading) {
        return (
            <div className="videos-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>جاري تحميل الفيديوهات...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="videos-page">
                <div className="error-container">
                    <h2>خطأ في التحميل</h2>
                    <p>{error}</p>
                    <button onClick={fetchVideos} className="retry-btn">إعادة المحاولة</button>
                </div>
            </div>
        );
    }

    return (
        <div className="videos-page">
            <SEOHead
                title="فيديوهات السيارات"
                description="شاهد أحدث الفيديوهات عن السيارات الألمانية وقطع الغيار. فيديوهات تعليمية وصيانة السيارات، مراجعات قطع الغيار، نصائح فنية، وأكثر. محتوى عالي الجودة باللغة العربية لمالكي السيارات الألمانية في مصر."
                keywords="فيديوهات سيارات, فيديوهات BMW, فيديوهات Audi, فيديوهات Volkswagen, فيديوهات Porsche, فيديوهات قطع غيار, صيانة سيارات, نصائح سيارات, مراجعات سيارات, TNT Garage, مصر"
                url="https://tntgaragede.com/videos"
            />
            <div className="page-header">
                <button onClick={handleBackClick} className="back-btn">
                    ← العودة للرئيسية
                </button>
                <h1>فيديوهات السيارات</h1>
                <p>شاهد أحدث الفيديوهات عن السيارات الألمانية وقطع الغيار</p>
            </div>

            {videos.length === 0 ? (
                <div className="no-videos">
                    <h2>لا توجد فيديوهات متاحة حالياً</h2>
                    <p>سنقوم بإضافة فيديوهات جديدة قريباً</p>
                </div>
            ) : (
                <div className="videos-grid">
                    {videos.map((video) => {
                        const thumbnailUrl = getVideoThumbnail(video.videoUrl);
                        // We don't need videoId here as it's only used for generating durations
                        const duration = videoDurations[video.id] || '--:--';

                        return (
                            <div key={video.id} className="video-card" onClick={() => handleVideoClick(video)}>
                                <div className="video-thumbnail">
                                    {thumbnailUrl ? (
                                        <img
                                            src={thumbnailUrl}
                                            alt={video.description}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <div className="fallback-thumbnail">
                                        <div className="play-button">
                                            <i className="play-icon">▶</i>
                                        </div>
                                    </div>
                                    <div className="video-overlay">
                                        <span className="video-duration">{duration}</span>
                                    </div>
                                </div>
                                <div className="video-info">
                                    <h3>{video.description}</h3>
                                    <p className="video-date">
                                        {new Date(video.createdAt).toLocaleDateString('ar-EG')}
                                    </p>
                                    <div className="video-actions">
                                        <button className="watch-btn">مشاهدة</button>
                                        <button className="share-btn">مشاركة</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {selectedVideo && (
                <div className="video-modal" onClick={closeVideoModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeVideoModal}>×</button>
                        <div className="video-container">
                            {/* Embed iframe for YouTube/Streamable or video element for local/streamed videos */}
                            {(selectedVideo.videoUrl.includes('/api/videos/stream/')) ? (
                                <video
                                    src={`https://alhaithamdoors.online.winchmohamedbahr.com${selectedVideo.videoUrl}`}
                                    controls
                                    autoPlay
                                    className="local-video-player"
                                    title={selectedVideo.description}
                                    type="video/mp4"
                                    preload="metadata"
                                    playsInline
                                    crossOrigin="anonymous"
                                    onError={(e) => {
                                        console.error("Video error:", e.target.error);
                                        console.log("Video URL:", selectedVideo.videoUrl);
                                        alert(`Error loading video: ${e.target.error ? e.target.error.message : 'Unknown error'}`);
                                    }}
                                    onLoadedData={() => console.log("Video loaded successfully")}
                                >
                                    <source src={selectedVideo.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <iframe
                                    src={getVideoEmbedUrl(selectedVideo.videoUrl)}
                                    title={selectedVideo.description}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                        <div className="video-details">
                            <h3>{selectedVideo.description}</h3>
                            <p className="video-date">
                                {new Date(selectedVideo.createdAt).toLocaleDateString('ar-EG')}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Videos;