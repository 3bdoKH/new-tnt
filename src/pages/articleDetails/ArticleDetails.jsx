import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ArticleDetails.css';
import { articlesAPI } from '../../utils/api';

const ArticleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(() => {
        if (id) {
            fetchArticle();
        }
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchArticle = async () => {
        try {
            setLoading(true);
            const data = await articlesAPI.getArticleById(id);
            if (data.success) {
                setArticle(data.data);
                // Fetch related articles based on tags
                if (data.data.tags && data.data.tags.length > 0) {
                    fetchRelatedArticles(data.data.tags);
                }
            } else {
                setError('المقال غير موجود');
            }
        } catch (error) {
            setError('خطأ في تحميل المقال: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedArticles = async (tags) => {
        try {
            const data = await articlesAPI.getAllArticles({ published: true });
            if (data.success) {
                // Filter articles that share at least one tag and exclude current article
                // Handle both array of tag objects and array of tag strings
                const tagValues = tags.map(tag => tag.tag || tag);

                const related = data.data.filter(relatedArticle => {
                    if (relatedArticle.id === Number(id)) return false;
                    if (!relatedArticle.tags) return false;

                    // Handle both object tags and string tags
                    const relatedTagValues = relatedArticle.tags.map(tag => tag.tag || tag);

                    // Check if there's at least one tag in common
                    return relatedTagValues.some(tagValue =>
                        tagValues.includes(tagValue)
                    );
                }).slice(0, 3); // Show max 3 related articles

                setRelatedArticles(related);
            }
        } catch (error) {
            console.error('Error fetching related articles:', error);
        }
    };

    const handleBackClick = () => {
        navigate('/articles');
    };

    if (loading) {
        return (
            <div className="article-details-page">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>جاري تحميل المقال...</p>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="article-details-page">
                <div className="error">
                    <h2>خطأ</h2>
                    <p>{error || 'المقال غير موجود'}</p>
                    <div className="error-actions">
                        <button onClick={handleBackClick}>العودة للمقالات</button>
                        <Link to="/">العودة للرئيسية</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="article-details-page">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <div className="container">
                    <Link to="/">الرئيسية</Link>
                    <span> / </span>
                    <Link to="/articles">المقالات</Link>
                    <span> / </span>
                    <span>{article.title}</span>
                </div>
            </div>

            {/* Article Header */}
            <div className="article-header">
                <div className="container">
                    <button className="back-btn" onClick={handleBackClick}>
                        ← العودة للمقالات
                    </button>

                    {article.image && (
                        <div className="article-hero-image">
                            <img src={article.image} alt={article.title} />
                        </div>
                    )}

                    <div className="article-meta">
                        <h1>{article.title}</h1>
                        <div className="meta-info">
                            <span className="author">بواسطة: {article.author}</span>
                            <span className="date">
                                {new Date(article.createdAt).toLocaleDateString('ar-EG', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            {article.updatedAt !== article.createdAt && (
                                <span className="updated">
                                    آخر تحديث: {new Date(article.updatedAt).toLocaleDateString('ar-EG')}
                                </span>
                            )}
                        </div>

                        {article.tags && article.tags.length > 0 && (
                            <div className="article-tags">
                                {article.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag.tag || tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="article-details-content">
                <div className="container">
                    <div className="content-wrapper">
                        <article className="main-content">
                            <div className="article-details-description">
                                <p>{article.description}</p>
                            </div>

                            {article.sections && article.sections.length > 0 && (
                                <div className="article-sections">
                                    {article.sections.map((section, index) => (
                                        <section key={index} className="content-section" id={`section-${index}`}>
                                            <h2>{section.heading}</h2>
                                            <p>{section.paragraph}</p>
                                        </section>
                                    ))}
                                </div>
                            )}
                        </article>

                        {/* Sidebar */}
                        <aside className="sidebar">
                            {/* Table of Contents */}
                            {article.sections && article.sections.length > 0 && (
                                <div className="table-of-contents">
                                    <h3>محتويات المقال</h3>
                                    <ul>
                                        <li>
                                            <a href="#description">وصف المقال</a>
                                        </li>
                                        {article.sections.map((section, index) => (
                                            <li key={index}>
                                                <a href={`#section-${index}`}>{section.heading}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Related Articles */}
                            {relatedArticles.length > 0 && (
                                <div className="related-articles">
                                    <h3>مقالات ذات صلة</h3>
                                    {relatedArticles.map((relatedArticle) => (
                                        <div key={relatedArticle.id} className="related-article">
                                            <Link to={`/article/${relatedArticle.id}`}>
                                                {relatedArticle.image && (
                                                    <img src={relatedArticle.image} alt={relatedArticle.title} />
                                                )}
                                                <h4>{relatedArticle.title}</h4>
                                                <p>{relatedArticle.description.substring(0, 100)}...</p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Share Section */}
                            <div className="share-section">
                                <h3>شارك المقال</h3>
                                <div className="share-buttons">
                                    <button
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: article.title,
                                                    text: article.description,
                                                    url: window.location.href
                                                });
                                            } else {
                                                navigator.clipboard.writeText(window.location.href);
                                                alert('تم نسخ الرابط');
                                            }
                                        }}
                                        className="share-btn"
                                    >
                                        📤 مشاركة
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            {/* Navigation to other articles */}
            <div className="article-navigation">
                <div className="container">
                    <div className="nav-buttons">
                        <Link to="/articles" className="nav-btn">
                            ← جميع المقالات
                        </Link>
                        {relatedArticles.length > 0 && (
                            <Link to={`/article/${relatedArticles[0].id}`} className="nav-btn">
                                المقال التالي →
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;