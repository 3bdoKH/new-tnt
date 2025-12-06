import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Articles.css';
import { articlesAPI } from '../../utils/api';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const data = await articlesAPI.getAllArticles({ published: true });
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

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );


    if (loading) {
        return (
            <div className="articles-page">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>جاري تحميل المقالات...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="articles-page">
                <div className="error">
                    <p>{error}</p>
                    <button onClick={fetchArticles}>إعادة المحاولة</button>
                </div>
            </div>
        );
    }

    return (
        <div className="articles-page">
            <div className="articles-header">
                <div className="container">
                    <h1>المقالات</h1>
                    <p>اكتشف أحدث المقالات والنصائح حول صيانة السيارات</p>
                </div>
            </div>

            <div className="articles-content">
                <div className="container">
                    <div className="search-section">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="البحث في المقالات..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="search-icon">🔍</span>
                        </div>
                    </div>

                    <div className="articles-grid">
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article) => (
                                <Link key={article.id} to={`/article/${article.id}`} className="article-card">
                                    <div className="article-image">
                                        {article.image ? (
                                            <img src={article.image} alt={article.title} />
                                        ) : (
                                            <div className="image-placeholder">
                                                <span>📄</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="article-content">
                                        <h3>{article.title}</h3>
                                        <p className="article-description">{article.description}</p>
                                        <div className="article-details-meta">
                                            <span className="author">بواسطة: {article.author}</span>
                                            <span className="date">
                                                {new Date(article.createdAt).toLocaleDateString('ar-EG')}
                                            </span>
                                        </div>
                                        {article.tags && article.tags.length > 0 && (
                                            <div className="article-tags">
                                                {article.tags.map((tag, index) => (
                                                    <span key={index} className="tag">{tag.tag || tag}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="no-articles">
                                <p>لا توجد مقالات متاحة</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Articles;