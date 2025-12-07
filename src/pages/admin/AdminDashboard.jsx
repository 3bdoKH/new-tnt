import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { articlesAPI, partsAPI, videosAPI, fileToBase64 } from '../../utils/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('parts');
    const [parts, setParts] = useState([]);
    const [videos, setVideos] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [adminUser, setAdminUser] = useState('');

    // Form states for parts
    const [partForm, setPartForm] = useState({
        name: '',
        price: '',
        description: '',
        brand: '',
        model: '',
        image: null, // Changed from imageUrl to image
        imageFile: null, // Added for file upload
        status: 'new'
    });
    const [editingPart, setEditingPart] = useState(null);

    // Form states for videos
    const [videoForm, setVideoForm] = useState({
        videoUrl: '', // For URL uploads
        title: '', // Added title field for database upload
        description: '',
        videoFile: null, // For file uploads
        uploadMethod: 'url' // 'url' or 'file'
    });
    const [editingVideo, setEditingVideo] = useState(null);

    // Form states for articles
    const [articleForm, setArticleForm] = useState({
        title: '',
        description: '',
        image: null, // Changed from imageUrl to image
        imageFile: null, // Added for file upload
        author: '',
        published: false,
        tags: '',
        sections: []
    });
    const [editingArticle, setEditingArticle] = useState(null);
    const [sectionForm, setSectionForm] = useState({
        heading: '',
        paragraph: ''
    });

    // File input refs
    const partImageRef = React.useRef();
    const articleImageRef = React.useRef();
    const videoFileRef = React.useRef();

    useEffect(() => {
        // Get admin user info
        const user = localStorage.getItem('adminUser');
        if (user) {
            setAdminUser(user);
        }

        fetchParts();
        fetchVideos();
        fetchArticles();
    }, []);

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');

        // Redirect to login
        navigate('/admin-login');
    };

    // Fetch data functions
    const fetchParts = async () => {
        try {
            setLoading(true);
            const data = await partsAPI.getAllParts();
            if (data.success) {
                setParts(data.data);
            } else {
                setError('Failed to fetch parts');
            }
        } catch (error) {
            setError('Error fetching parts: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

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

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const data = await articlesAPI.getAllArticles();
            if (data.success) {
                setArticles(data.data);
            } else {
                setError('Failed to fetch articles');
            }
        } catch (error) {
            setError('Error fetching articles: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle file changes for parts
    const handlePartImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Check file size (limit to 5MB)
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSizeInBytes) {
                setError(`حجم الصورة كبير جداً. الحد الأقصى 5 ميجابايت. حجم الملف المحدد: ${(file.size / 1024 / 1024).toFixed(2)} ميجابايت`);
                e.target.value = ''; // Clear the file input
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                setError('يرجى اختيار ملف صورة فقط');
                e.target.value = ''; // Clear the file input
                return;
            }

            try {
                console.log(`Processing image: ${file.name}, size: ${(file.size / 1024).toFixed(2)} KB`);
                const base64 = await fileToBase64(file);
                console.log(`Base64 size: ${(base64.length / 1024).toFixed(2)} KB`);
                
                setPartForm({
                    ...partForm,
                    image: base64,
                    imageFile: file
                });
                setError(''); // Clear any previous errors
            } catch (error) {
                console.error("Error converting file to base64:", error);
                setError("خطأ في معالجة ملف الصورة: " + error.message);
            }
        }
    };

    // Handle file changes for articles
    const handleArticleImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Check file size (limit to 5MB)
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSizeInBytes) {
                setError(`حجم الصورة كبير جداً. الحد الأقصى 5 ميجابايت. حجم الملف المحدد: ${(file.size / 1024 / 1024).toFixed(2)} ميجابايت`);
                e.target.value = ''; // Clear the file input
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                setError('يرجى اختيار ملف صورة فقط');
                e.target.value = ''; // Clear the file input
                return;
            }

            try {
                console.log(`Processing image: ${file.name}, size: ${(file.size / 1024).toFixed(2)} KB`);
                const base64 = await fileToBase64(file);
                console.log(`Base64 size: ${(base64.length / 1024).toFixed(2)} KB`);
                
                setArticleForm({
                    ...articleForm,
                    image: base64,
                    imageFile: file
                });
                setError(''); // Clear any previous errors
            } catch (error) {
                console.error("Error converting file to base64:", error);
                setError("خطأ في معالجة ملف الصورة: " + error.message);
            }
        }
    };

    // Handle video file changes
    const handleVideoFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setVideoForm({
                ...videoForm,
                videoFile: file
            });
        }
    };

    const handlePartSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(''); // Clear previous errors

            console.log("=== FORM SUBMIT ===");
            console.log("Form data:", partForm);

            // Validate form data before sending
            if (!partForm.name?.trim()) {
                setError('اسم القطعة مطلوب');
                setLoading(false);
                return;
            }
            if (!partForm.price || isNaN(Number(partForm.price)) || Number(partForm.price) <= 0) {
                setError('السعر يجب أن يكون رقم موجب');
                setLoading(false);
                return;
            }
            if (!partForm.description?.trim()) {
                setError('الوصف مطلوب');
                setLoading(false);
                return;
            }
            if (!partForm.brand?.trim()) {
                setError('الماركة مطلوبة');
                setLoading(false);
                return;
            }
            if (!partForm.model?.trim()) {
                setError('الموديل مطلوب');
                setLoading(false);
                return;
            }

            // Prepare form data - exclude imageFile as it can't be JSON serialized
            const { imageFile, ...partFormData } = partForm;
            const partData = {
                ...partFormData,
                price: Number(partForm.price)
            };

            console.log("Submitting part data:", {
                ...partData,
                image: partData.image ? "image included" : "no image"
            });

            // Send request using API
            const data = editingPart
                ? await partsAPI.updatePart(editingPart.id, partData)
                : await partsAPI.createPart(partData);

            console.log("API response:", data);

            if (data.success) {
                setPartForm({
                    name: '',
                    price: '',
                    description: '',
                    brand: '',
                    model: '',
                    image: null,
                    imageFile: null,
                    status: 'new'
                });
                setEditingPart(null);
                if (partImageRef.current) {
                    partImageRef.current.value = '';
                }
                await fetchParts();
                setError('');
                alert(editingPart ? 'تم تحديث القطعة بنجاح!' : 'تم إضافة القطعة بنجاح!');
            } else {
                // Handle specific error types
                let errorMessage = 'فشل حفظ القطعة';
                
                if (data.errorType === 'SequelizeUniqueConstraintError' || data.field) {
                    // Duplicate entry error
                    const fieldNameArabic = {
                        'name': 'الاسم',
                        'brand': 'الماركة',
                        'model': 'الموديل'
                    };
                    const arabicField = fieldNameArabic[data.field] || data.field;
                    errorMessage = `توجد قطعة بنفس ${arabicField} في قاعدة البيانات. يرجى استخدام ${arabicField} مختلف.`;
                } else {
                    errorMessage = data.message || 'فشل حفظ القطعة';
                    if (data.details) {
                        errorMessage += ` - ${JSON.stringify(data.details)}`;
                    }
                }
                
                setError(errorMessage);
                console.error("Save failed:", data);
            }
        } catch (error) {
            console.error("=== ERROR IN FORM SUBMIT ===", error);
            
            // Parse error message for better display
            let errorMsg = error.message;
            if (errorMsg.includes('Duplicate entry') || errorMsg.includes('already exists')) {
                errorMsg = 'توجد قطعة بنفس البيانات في قاعدة البيانات. يرجى التحقق من الاسم أو الماركة أو الموديل.';
            }
            
            setError('خطأ في حفظ القطعة: ' + errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handlePartEdit = (part) => {
        setEditingPart(part);
        setPartForm({
            name: part.name,
            price: part.price.toString(),
            description: part.description || '',
            brand: part.brand || '',
            model: part.model || '',
            image: part.image, // Now includes base64 image from API
            imageFile: null,
            status: part.status || 'new'
        });
    };

    const handlePartDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الجزء؟')) {
            try {
                setLoading(true);
                const data = await partsAPI.deletePart(id);

                if (data.success) {
                    fetchParts();
                    setError('');
                } else {
                    setError('Failed to delete part');
                }
            } catch (error) {
                setError('Error deleting part: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            let data;

            if (editingVideo) {
                // Editing always uses URL method since we can't update a file
                data = await videosAPI.updateVideo(editingVideo.id, {
                    videoUrl: videoForm.videoUrl,
                    description: videoForm.description
                });
            } else if (videoForm.uploadMethod === 'file') {
                // File upload method (stored in database)
                if (!videoForm.videoFile) {
                    setError('Please select a video file to upload');
                    setLoading(false);
                    return;
                }

                if (!videoForm.title) {
                    setError('Please enter a video title');
                    setLoading(false);
                    return;
                }

                data = await videosAPI.uploadVideo(
                    videoForm.videoFile,
                    videoForm.title,
                    videoForm.description
                );
            } else {
                // URL method
                if (!videoForm.videoUrl) {
                    setError('Please enter a video URL');
                    setLoading(false);
                    return;
                }
                data = await videosAPI.createVideo({
                    videoUrl: videoForm.videoUrl,
                    description: videoForm.description
                });
            }

            if (data.success) {
                setVideoForm({
                    videoUrl: '',
                    title: '',
                    description: '',
                    videoFile: null,
                    uploadMethod: 'url'
                });
                setEditingVideo(null);
                if (videoFileRef.current) {
                    videoFileRef.current.value = '';
                }
                fetchVideos();
                setError('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Error saving video: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVideoEdit = (video) => {
        setEditingVideo(video);
        setVideoForm({
            videoUrl: video.videoUrl,
            description: video.description || '',
            videoFile: null,
            uploadMethod: 'url' // Always use URL method when editing
        });
    };

    const handleVideoDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الفيديو؟')) {
            try {
                setLoading(true);
                const data = await videosAPI.deleteVideo(id);

                if (data.success) {
                    fetchVideos();
                    setError('');
                } else {
                    setError('Failed to delete video');
                }
            } catch (error) {
                setError('Error deleting video: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    // Article handlers
    const handleArticleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Prepare article data - exclude imageFile as it can't be JSON serialized
            const { imageFile, ...articleFormData } = articleForm;
            const articleData = {
                ...articleFormData,
                tags: articleForm.tags ? articleForm.tags.split(',').map(tag => tag.trim()) : [],
                sections: articleForm.sections
            };

            const data = editingArticle
                ? await articlesAPI.updateArticle(editingArticle.id, articleData)
                : await articlesAPI.createArticle(articleData);

            if (data.success) {
                setArticleForm({
                    title: '',
                    description: '',
                    image: null,
                    imageFile: null,
                    author: '',
                    published: false,
                    tags: '',
                    sections: []
                });
                setEditingArticle(null);
                if (articleImageRef.current) {
                    articleImageRef.current.value = '';
                }
                fetchArticles();
                setError('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Error saving article: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleArticleEdit = (article) => {
        setEditingArticle(article);
        setArticleForm({
            title: article.title,
            description: article.description,
            image: article.image, // Now includes base64 image from API
            imageFile: null,
            author: article.author,
            published: article.published,
            tags: article.tags ? article.tags.join(', ') : '',
            sections: article.sections || []
        });
    };

    const handleArticleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المقال؟')) {
            try {
                setLoading(true);
                const data = await articlesAPI.deleteArticle(id);
                if (data.success) {
                    fetchArticles();
                    setError('');
                } else {
                    setError('Failed to delete article');
                }
            } catch (error) {
                setError('Error deleting article: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const addSection = () => {
        if (sectionForm.heading && sectionForm.paragraph) {
            const newSection = {
                heading: sectionForm.heading,
                paragraph: sectionForm.paragraph
            };
            setArticleForm({
                ...articleForm,
                sections: [...articleForm.sections, newSection]
            });
            setSectionForm({ heading: '', paragraph: '' });
        }
    };

    const removeSection = (index) => {
        const updatedSections = articleForm.sections.filter((_, i) => i !== index);
        setArticleForm({ ...articleForm, sections: updatedSections });
    };

    const cancelEdit = () => {
        setEditingPart(null);
        setEditingVideo(null);
        setEditingArticle(null);
        setPartForm({
            name: '',
            price: '',
            description: '',
            brand: '',
            model: '',
            image: null,
            imageFile: null,
            status: 'new'
        });
        setVideoForm({ videoUrl: '', title: '', description: '', videoFile: null, uploadMethod: 'url' });
        setArticleForm({
            title: '',
            description: '',
            image: null,
            imageFile: null,
            author: '',
            published: false,
            tags: '',
            sections: []
        });
        setSectionForm({ heading: '', paragraph: '' });

        // Reset file inputs
        if (partImageRef.current) {
            partImageRef.current.value = '';
        }
        if (articleImageRef.current) {
            articleImageRef.current.value = '';
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>لوحة تحكم المدير</h1>
                    <div className="user-info">
                        <span>مرحباً، {adminUser}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            تسجيل الخروج
                        </button>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'parts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('parts')}
                    >
                        قطع الغيار
                    </button>
                    <button
                        className={`tab ${activeTab === 'videos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('videos')}
                    >
                        الفيديوهات
                    </button>
                    <button
                        className={`tab ${activeTab === 'articles' ? 'active' : ''}`}
                        onClick={() => setActiveTab('articles')}
                    >
                        المقالات
                    </button>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {activeTab === 'parts' && (
                    <div className="tab-content">
                        <h2>{editingPart ? 'تعديل قطعة غيار' : 'إضافة قطعة غيار جديدة'}</h2>
                        <form onSubmit={handlePartSubmit} className="form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>الاسم</label>
                                    <input
                                        type="text"
                                        value={partForm.name}
                                        onChange={(e) => setPartForm({ ...partForm, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>السعر</label>
                                    <input
                                        type="number"
                                        value={partForm.price}
                                        onChange={(e) => setPartForm({ ...partForm, price: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>الماركة</label>
                                    <input
                                        type="text"
                                        value={partForm.brand}
                                        onChange={(e) => setPartForm({ ...partForm, brand: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>الموديل</label>
                                    <input
                                        type="text"
                                        value={partForm.model}
                                        onChange={(e) => setPartForm({ ...partForm, model: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>الوصف</label>
                                <textarea
                                    value={partForm.description}
                                    onChange={(e) => setPartForm({ ...partForm, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>الصورة</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePartImageChange}
                                        ref={partImageRef}
                                    />
                                    {partForm.image && (
                                        <div className="image-preview">
                                            <img
                                                src={partForm.image}
                                                alt="معاينة"
                                                style={{ maxWidth: '100px', marginTop: '10px' }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>الحالة</label>
                                    <select
                                        value={partForm.status}
                                        onChange={(e) => setPartForm({ ...partForm, status: e.target.value })}
                                    >
                                        <option value="new">جديد</option>
                                        <option value="used">مستعمل</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'جاري الحفظ...' : (editingPart ? 'تحديث' : 'إضافة')}
                                </button>
                                {editingPart && (
                                    <button type="button" onClick={cancelEdit}>
                                        إلغاء
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="data-list">
                            <h3>قطع الغيار الموجودة</h3>
                            <div className="list">
                                {parts.map((part) => (
                                    <div key={part.id} className="list-item">
                                        <div className="item-image">
                                            {part.image ? (
                                                <img
                                                    src={part.image}
                                                    alt={part.name}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div className="image-placeholder">
                                                <span>لا توجد صورة</span>
                                            </div>
                                        </div>
                                        <div className="item-info">
                                            <h4>{part.name}</h4>
                                            <p>{part.brand} - {part.model}</p>
                                            <p>السعر: {part.price} جنيه</p>
                                            <p>الحالة: {part.status === 'new' ? 'جديد' : 'مستعمل'}</p>
                                        </div>
                                        <div className="item-actions">
                                            <button onClick={() => handlePartEdit(part)}>تعديل</button>
                                            <button onClick={() => handlePartDelete(part.id)} className="delete">حذف</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'videos' && (
                    <div className="tab-content">
                        <h2>{editingVideo ? 'تعديل فيديو' : 'إضافة فيديو جديد'}</h2>
                        <form onSubmit={handleVideoSubmit} className="form">
                            {/* Upload method selection */}
                            {!editingVideo && (
                                <div className="form-group">
                                    <label>طريقة الإضافة</label>
                                    <div className="radio-group">
                                        <label>
                                            <input
                                                type="radio"
                                                name="uploadMethod"
                                                value="url"
                                                checked={videoForm.uploadMethod === 'url'}
                                                onChange={() => setVideoForm({ ...videoForm, uploadMethod: 'url' })}
                                            />
                                            رابط فيديو (YouTube، Vimeo، إلخ)
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="uploadMethod"
                                                value="file"
                                                checked={videoForm.uploadMethod === 'file'}
                                                onChange={() => setVideoForm({ ...videoForm, uploadMethod: 'file' })}
                                            />
                                            رفع ملف فيديو
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* URL input (shown when URL method is selected or when editing) */}
                            {(videoForm.uploadMethod === 'url' || editingVideo) && (
                                <div className="form-group">
                                    <label>رابط الفيديو</label>
                                    <input
                                        type="url"
                                        value={videoForm.videoUrl}
                                        onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        required={videoForm.uploadMethod === 'url' || editingVideo}
                                    />
                                </div>
                            )}

                            {/* File input (shown when file method is selected) */}
                            {videoForm.uploadMethod === 'file' && !editingVideo && (
                                <>
                                    <div className="form-group">
                                        <label>عنوان الفيديو</label>
                                        <input
                                            type="text"
                                            value={videoForm.title}
                                            onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                                            placeholder="أدخل عنوان الفيديو"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>ملف الفيديو</label>
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={handleVideoFileChange}
                                            ref={videoFileRef}
                                            required
                                        />
                                        <small className="form-help-text">الحد الأقصى لحجم الملف: 50 ميجابايت</small>
                                    </div>
                                </>
                            )}

                            {/* Description field (always shown) */}
                            <div className="form-group">
                                <label>الوصف</label>
                                <textarea
                                    value={videoForm.description}
                                    onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-actions">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'جاري الحفظ...' : (editingVideo ? 'تحديث' : 'إضافة')}
                                </button>
                                {editingVideo && (
                                    <button type="button" onClick={cancelEdit}>
                                        إلغاء
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="data-list">
                            <h3>الفيديوهات الموجودة</h3>
                            <div className="list">
                                {videos.map((video) => (
                                    <div key={video.id} className="list-item">
                                        <div className="item-info">
                                            <h4>{video.description}</h4>
                                            <p>{video.videoUrl}</p>
                                        </div>
                                        <div className="item-actions">
                                            <button onClick={() => handleVideoEdit(video)}>تعديل</button>
                                            <button onClick={() => handleVideoDelete(video.id)} className="delete">حذف</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'articles' && (
                    <div className="tab-content">
                        <h2>{editingArticle ? 'تعديل مقال' : 'إضافة مقال جديد'}</h2>
                        <form onSubmit={handleArticleSubmit} className="form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>عنوان المقال</label>
                                    <input
                                        type="text"
                                        value={articleForm.title}
                                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>المؤلف</label>
                                    <input
                                        type="text"
                                        value={articleForm.author}
                                        onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>وصف المقال</label>
                                <textarea
                                    value={articleForm.description}
                                    onChange={(e) => setArticleForm({ ...articleForm, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>الصورة (اختياري)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleArticleImageChange}
                                        ref={articleImageRef}
                                    />
                                    {articleForm.image && (
                                        <div className="image-preview">
                                            <img
                                                src={articleForm.image}
                                                alt="معاينة"
                                                style={{ maxWidth: '100px', marginTop: '10px' }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>العلامات (مفصولة بفواصل)</label>
                                    <input
                                        type="text"
                                        value={articleForm.tags}
                                        onChange={(e) => setArticleForm({ ...articleForm, tags: e.target.value })}
                                        placeholder="تقنية, صيانة, نصائح"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={articleForm.published}
                                        onChange={(e) => setArticleForm({ ...articleForm, published: e.target.checked })}
                                    />
                                    {' '}نشر المقال
                                </label>
                            </div>

                            {/* Sections Management */}
                            <div className="sections-management">
                                <h3>أقسام المقال</h3>
                                <div className="section-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>عنوان القسم</label>
                                            <input
                                                type="text"
                                                value={sectionForm.heading}
                                                onChange={(e) => setSectionForm({ ...sectionForm, heading: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>محتوى القسم</label>
                                            <textarea
                                                value={sectionForm.paragraph}
                                                onChange={(e) => setSectionForm({ ...sectionForm, paragraph: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <button type="button" onClick={addSection} className="add-section-btn">
                                        إضافة قسم
                                    </button>
                                </div>

                                {/* Display existing sections */}
                                {articleForm.sections.length > 0 && (
                                    <div className="sections-list">
                                        <h4>الأقسام المضافة:</h4>
                                        {articleForm.sections.map((section, index) => (
                                            <div key={index} className="section-item">
                                                <h5>{section.heading}</h5>
                                                <p>{section.paragraph}</p>
                                                <button type="button" onClick={() => removeSection(index)} className="remove-section-btn">
                                                    حذف القسم
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="form-actions">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'جاري الحفظ...' : (editingArticle ? 'تحديث' : 'إضافة')}
                                </button>
                                {editingArticle && (
                                    <button type="button" onClick={cancelEdit}>
                                        إلغاء
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="data-list">
                            <h3>المقالات الموجودة</h3>
                            <div className="list">
                                {articles.map((article) => (
                                    <div key={article.id} className="list-item">
                                        <div className="item-image">
                                            {article.image ? (
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div className="image-placeholder">
                                                <span>لا توجد صورة</span>
                                            </div>
                                        </div>
                                        <div className="item-info">
                                            <h4>{article.title}</h4>
                                            <p>المؤلف: {article.author}</p>
                                            <p>الحالة: {article.published ? 'منشور' : 'مسودة'}</p>
                                            <p>عدد الأقسام: {article.sections ? article.sections.length : 0}</p>
                                            {article.tags && article.tags.length > 0 && (
                                                <p>العلامات: {article.tags.join(', ')}</p>
                                            )}
                                        </div>
                                        <div className="item-actions">
                                            <button onClick={() => handleArticleEdit(article)}>تعديل</button>
                                            <button onClick={() => handleArticleDelete(article.id)} className="delete">حذف</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;