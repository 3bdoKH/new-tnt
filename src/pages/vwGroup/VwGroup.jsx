import React, { useEffect } from 'react';
import './VwGroup.css';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';

const VwGroup = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);
    const handleContactClick = () => {
        const phoneNumber = '+01111132621';
        window.open(`tel:${phoneNumber}`, '_blank');
    };

    const handleWhatsAppClick = () => {
        const phoneNumber = '+01111132621';
        const message = encodeURIComponent('مرحباً، أريد معلومات عن خدمات ڤولكس واجن جروب');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="vwgroup-page">
            <div className="vwgroup-hero">
                <div className="hero-content">
                    <h1 className="hero-title">ڤولكس واجن جروب</h1>
                    <p className="hero-subtitle">توكيل ڤولكس واجن جروب صيانه ما بعد الضمان</p>
                    <p className="hero-description">
                        الوكيل المعتمد من شركه وطنيه التابع لوزاره الداخليه
                    </p>
                    <div className="hero-buttons">
                        <button className="contact-btn" onClick={handleContactClick}>
                            <span className="btn-icon">📞</span>
                            اتصل الآن
                        </button>
                        <button className="whatsapp-btn" onClick={handleWhatsAppClick}>
                            <span className="btn-icon">💬</span>
                            واتساب
                        </button>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="brand-animation">
                        <img src={require('../../volks-front.png')} alt="Volkswagen Group" />
                    </div>
                </div>
            </div>

            <div className="brands-section">
                <div className="container">
                    <h2 className="section-title">نحن نقوم بصيانه جميع موديلات ڤولكس ڤاجن</h2>
                    <div className="brands-grid">
                        <div className="brand-card">
                            <div className="brand-image">
                                <img src={require('../../volks-side.png')} alt="Volkswagen" />
                            </div>
                            <h3>ڤولكس</h3>
                            <p>صيانة شاملة لجميع موديلات فولكس واجن</p>
                        </div>
                        <div className="brand-card">
                            <div className="brand-image">
                                <img src={require('../../audi-side.png')} alt="Audi" />
                            </div>
                            <h3>اودي</h3>
                            <p>خدمة صيانة احترافية لسيارات أودي</p>
                        </div>
                        <div className="brand-card">
                            <div className="brand-image">
                                <img src={require('../../skoda-side.png')} alt="Skoda" />
                            </div>
                            <h3>سكودا</h3>
                            <p>صيانة وتشخيص شامل لسيارات سكودا</p>
                        </div>
                        <div className="brand-card">
                            <div className="brand-image">
                                <img src={require('../../seat-side.png')} alt="Seat" />
                            </div>
                            <h3>سيات</h3>
                            <p>خدمات صيانة متخصصة لسيارات سيات</p>
                        </div>
                        <div className="brand-card">
                            <div className="brand-image">
                                <img src={require('../../porsche-side.png')} alt="Porsche" />
                            </div>
                            <h3>بورش</h3>
                            <p>صيانة فاخرة لسيارات بورش الرياضية</p>
                        </div>
                        <div className="brand-card">
                            <div className="brand-image">
                                <img src={require('../../lambo-side.png')} alt="Lamborghini" />
                            </div>
                            <h3>لامبورجيني</h3>
                            <p>خدمة صيانة استثنائية للسيارات الفاخرة</p>
                        </div>
                        <div className="brand-card">
                            <div className="brand-image">
                                <img src={require('../../bently-side.png')} alt="Bentley" />
                            </div>
                            <h3>بينتلي</h3>
                            <p>صيانة فاخرة لسيارات بنتلي الفاخرة</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="services-section">
                <div className="container">
                    <h2 className="section-title">خدماتنا</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">🔧</div>
                            <h3>صيانة شاملة</h3>
                            <p>صيانة دورية وشاملة لجميع موديلات فولكس واجن جروب</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">⚡</div>
                            <h3>تشخيص إلكتروني</h3>
                            <p>تشخيص دقيق باستخدام أحدث الأجهزة الإلكترونية</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">🛡️</div>
                            <h3>ضمان الجودة</h3>
                            <p>خدمة مضمونة بجودة عالية وأسعار منافسة</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">👨‍🔧</div>
                            <h3>فنيين متخصصين</h3>
                            <p>فريق عمل محترف ومدرب على جميع الموديلات</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">🔋</div>
                            <h3>قطع غيار أصلية</h3>
                            <p>قطع غيار أصلية معتمدة من الشركة المصنعة</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">📋</div>
                            <h3>صيانة ما بعد الضمان</h3>
                            <p>خدمة صيانة احترافية بعد انتهاء فترة الضمان</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-section">
                <div className="container">
                    <h2 className="section-title">تواصل معنا</h2>
                    <div className="contact-info">
                        <div className="contact-item">
                            <div className="contact-icon">📞</div>
                            <div className="contact-details">
                                <h3>أرقام الهاتف</h3>
                                <p>01111132621</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">🕒</div>
                            <div className="contact-details">
                                <h3>ساعات العمل</h3>
                                <p>8:00 ص - 10:00 م</p>
                                <p>طوال أيام الأسبوع</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">📍</div>
                            <div className="contact-details">
                                <h3>الموقع</h3>
                                <p>مركز صيانة معتمد</p>
                                <p>جميع أنحاء الجمهورية</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Form />
            <div className="back-section">
                <button className="back-btn" onClick={() => navigate('/')}>
                    <span className="btn-arrow">←</span>
                    العودة للرئيسية
                </button>
            </div>
        </div>
    );
};

export default VwGroup;
