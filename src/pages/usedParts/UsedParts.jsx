import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FiShare2 } from 'react-icons/fi';
import './UsedParts.css';
import SEOHead from '../../components/SEOHead';
import { partsAPI } from '../../utils/api';

const UsedParts = () => {
    const [parts, setParts] = useState([]);
    const [filteredParts, setFilteredParts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsedParts();
    }, []);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Filter parts based on search term
        if (searchTerm.trim() === '') {
            setFilteredParts(parts);
        } else {
            const filtered = parts.filter(part =>
                part.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                part.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                part.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                part.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredParts(filtered);
        }
    }, [searchTerm, parts]);

    const fetchUsedParts = async () => {
        try {
            setLoading(true);
            const data = await partsAPI.getAllParts();

            if (data.success) {
                // Filter parts with "used" status
                const usedParts = data.data.filter(part => part.status === 'used');
                setParts(usedParts);
                setFilteredParts(usedParts);
            } else {
                setError('Failed to fetch parts');
            }
        } catch (error) {
            setError('Error fetching parts: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate('/');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const handleWhatsAppContact = (partName) => {
        const phoneNumber = '+201111132621'; // Replace with your actual WhatsApp number
        const message = `مرحبا، أنا مهتم بشراء ${partName} من قطع الغيار الاستيراد. هل يمكنني الحصول على مزيد من المعلومات؟`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleShare = (part) => {
        const shareUrl = `${window.location.origin}/product/${part.id}`;
        const shareTitle = part.name;
        const shareText = `شاهد ${part.name} - ${part.brand} ${part.model} - قطع غيار استيراد`;

        if (navigator.share) {
            navigator.share({
                title: shareTitle,
                text: shareText,
                url: shareUrl
            });
        } else {
            navigator.clipboard.writeText(shareUrl);

            // Show toast notification
            const toast = document.createElement('div');
            toast.textContent = 'تم نسخ الرابط إلى الحافظة';
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            toast.style.color = 'white';
            toast.style.padding = '10px 20px';
            toast.style.borderRadius = '5px';
            toast.style.zIndex = '1000';
            toast.style.fontFamily = 'Cairo, sans-serif';

            document.body.appendChild(toast);

            setTimeout(() => {
                document.body.removeChild(toast);
            }, 3000);
        }
    };

    const loadMoreParts = () => {
        setVisibleCount(prevCount => prevCount + 10);
    };

    if (loading) {
        return (
            <div className="used-parts-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>جاري تحميل قطع الغيار الاستيراد...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="used-parts-page">
                <div className="error-container">
                    <h2>خطأ في التحميل</h2>
                    <p>{error}</p>
                    <button onClick={fetchUsedParts} className="retry-btn">إعادة المحاولة</button>
                </div>
            </div>
        );
    }

    return (
        <div className="used-parts-page">
            <SEOHead
                title="قطع الغيار الاستيراد"
                description="اكتشف مجموعتنا المميزة من قطع الغيار الاستيراد عالية الجودة بأسعار مناسبة لجميع ماركات السيارات الألمانية. قطع غيار BMW، Audi، Volkswagen، Porsche، Lamborghini، Bentley مستعملة. جودة مضمونة وتوصيل سريع في جميع أنحاء مصر."
                keywords="قطع غيار استيراد, قطع غيار مستعملة, قطع غيار BMW مستعملة, قطع غيار Audi مستعملة, قطع غيار Volkswagen مستعملة, قطع غيار Porsche مستعملة, قطع غيار Lamborghini مستعملة, قطع غيار Bentley مستعملة, قطع غيار ألمانية مستعملة, TNT Garage, مصر"
                url="https://tntgaragede.com/used-parts"
            />
            <div className="page-header">
                <button onClick={handleBackClick} className="back-btn">
                    ← العودة للرئيسية
                </button>
                <h1>قطع الغيار الاستيراد</h1>
                <p>اكتشف مجموعتنا المميزة من قطع الغيار الاستيراد عالية الجودة بأسعار مناسبة</p>
            </div>

            {/* Search Bar */}
            <div className="search-container">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="ابحث عن قطع الغيار بالاسم أو الماركة أو الموديل أو الوصف..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button onClick={clearSearch} className="clear-search-btn">
                            ✕
                        </button>
                    )}
                </div>
                {searchTerm && (
                    <div className="search-results-info">
                        <span>تم العثور على {filteredParts.length} نتيجة</span>
                    </div>
                )}
            </div>

            {filteredParts.length === 0 ? (
                <div className="no-parts">
                    {searchTerm ? (
                        <>
                            <h2>لا توجد نتائج للبحث</h2>
                            <p>جرب البحث بكلمات مختلفة أو امسح البحث للعودة لجميع قطع الغيار</p>
                            <button onClick={clearSearch} className="clear-all-btn">مسح البحث</button>
                        </>
                    ) : (
                        <>
                            <h2>لا توجد قطع غيار استيراد متاحة حالياً</h2>
                            <p>سنقوم بإضافة قطع غيار استيراد قريباً</p>
                        </>
                    )}
                </div>
            ) : (
                <div>
                    <div className="parts-grid">
                        {(searchTerm ? filteredParts : filteredParts.slice(0, visibleCount)).map((part) => (
                            <div key={part.id} className="part-card">
                                <div
                                    className="part-image-used"
                                    onClick={() => navigate(`/product/${part.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img src={part.image} alt={part.name} />
                                    <div className="status-badge used">مستعمل</div>
                                </div>
                                <div className="part-info">
                                    <h3
                                        onClick={() => navigate(`/product/${part.id}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {part.name}
                                    </h3>
                                    <p className="brand-model">{part.brand} - {part.model}</p>
                                    <p className="description">{part.description}</p>
                                    <div className="price-section">
                                        <span className="price">{part.price} جنيه</span>
                                        <span className="discount-badge">خصم</span>
                                    </div>
                                    <div className="part-actions">
                                        <div className="action-buttons-row">
                                            <button
                                                className="details-btn"
                                                onClick={() => navigate(`/product/${part.id}`)}
                                            >
                                                عرض التفاصيل
                                            </button>
                                            <button
                                                onClick={() => handleShare(part)}
                                                className="share-btn"
                                                aria-label="مشاركة المنتج"
                                            >
                                                <FiShare2 className="share-icon" />
                                                مشاركة
                                            </button>
                                        </div>
                                        <button
                                            className="contact-btn"
                                            onClick={() => handleWhatsAppContact(part.name)}
                                        >
                                            <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" />
                                            شراء الان عبر الواتساب
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {!searchTerm && filteredParts.length > visibleCount && (
                        <div className="load-more-container">
                            <button onClick={loadMoreParts} className="load-more-btn">
                                عرض المزيد من المنتجات
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="contact-section">
                <h2>هل تحتاج مساعدة؟</h2>
                <p>تواصل معنا للحصول على استشارة مجانية حول قطع الغيار الاستيراد المناسبة لسيارتك</p>
                <div className="contact-buttons">
                    <a className="primary-btn" href='tel:01111132621'>اتصل بنا</a>
                    <a className="secondary-btn" href='https://wa.me/201111132621' target='_blank' rel='noopener noreferrer'>راسلنا على واتساب</a>
                </div>
            </div>
        </div>
    );
};

export default UsedParts;