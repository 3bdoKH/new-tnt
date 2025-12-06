import React, { useEffect } from 'react';
import './winch.css';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

const Winch = () => {
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
    const message = encodeURIComponent('مرحباً، أحتاج خدمة ونش انقاذ');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="winch-page">
      <SEOHead
        title="ونش انقاذ"
        description="خدمة ونش انقاذ معتمد وسريع تابع لشركة آمان التابعة لوزارة الداخلية. نصلك أينما كنت خلال 15 دقيقة بحد أقصى. خدمة 24/7 على مدار الساعة لجميع أنحاء الجمهورية. ونش مزود بأجهزة تتبع GPS للأمان التام."
        keywords="ونش انقاذ, سحب سيارات, انقاذ سيارات, ونش معتمد, ونش سريع, ونش آمان, وزارة الداخلية, ونش 24 ساعة, ونش مصر, TNT Garage, ونش المعادي, ونش القاهرة"
        url="https://tntgaragede.com/winch"
      />
      <div className="winch-hero">
        <div className="hero-content">
          <h1 className="hero-title">ونش انقاذ</h1>
          <p className="hero-subtitle">خدمة مجانية تابع لوزارة الخارجية</p>
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
          <div className="car-animation">
            <img src={require('./winch.png')} alt="winch" />
          </div>
        </div>
      </div>

      {/* Aman Section */}
      <div className="aman-section">
        <div className="container">
          <div className="aman-content">
            <div className="aman-image">
              <img src={require('./aman.jpeg')} alt="Aman Winch" />
            </div>
            <div className="aman-text">
              <h2 className="aman-title">ونش انقاذ معتمد وسريع</h2>
              <p className="aman-description">
                ونش انقاذ معتمد وسريع تابع لشركه آمان التابعه لوزاره الداخليه..
                <br />
                <strong>نصلك اينما كنت...</strong>
              </p>
              <div className="aman-features">
                <div className="aman-feature">
                  <span className="feature-icon">✅</span>
                  <span>معتمد من وزارة الداخلية</span>
                </div>
                <div className="aman-feature">
                  <span className="feature-icon">⚡</span>
                  <span>استجابة سريعة</span>
                </div>
                <div className="aman-feature">
                  <span className="feature-icon">📍</span>
                  <span>نصلك أينما كنت</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="services-section">
        <div className="container">
          <h2 className="section-title">خدماتنا</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🚗</div>
              <h3>سحب و انقاذ السيارات</h3>
              <p>نقدم جميع خدمات انقاذ السيارات التي قد تحتاج اليها، سواء سحب أو رفع السيارات</p>
            </div>
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>استجابة سريعة</h3>
              <p>وصول سريع خلال 15 دقيقة بحد أقصى، نعمل 24 ساعة على مدار الساعة</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🛡️</div>
              <h3>ضمان الجودة</h3>
              <p>خدمة مضمونة وموثوقة مع فريق عمل محترف ومدرب</p>
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
                <p>24/7 متاح على مدار الساعة</p>
                <p>طوال أيام الأسبوع</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h3>المنطقة</h3>
                <p>جميع أنحاء الجمهورية</p>
                <p>سواء الطرق السريعه أو الطريق الصحراوي</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <div className="container">
          <h2 className="section-title">كيف تعمل الخدمة</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>اتصل بنا</h3>
              <p>اتصل على أحد أرقامنا المخصصة أو راسلنا على واتساب</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>حدد الموقع</h3>
              <p>أخبرنا بموقع سيارتك بدقة وأخبرنا بنوع المشكلة</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>انتظر الوصول</h3>
              <p>سنصل إليك خلال 15 دقيقة بحد أقصى</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>الإصلاح والنقل</h3>
              <p>نقوم بسحب سيارتك ونقلها إلى أقرب مركز خدمة أو الوجهة المطلوبة</p>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <img src={require('../../logo-tr.png')} alt="TNT Garage Logo" className="winch-logo" />
          <h2 className="section-title"> <span className='tnt-span'>tnt garage </span>مميزات ونش الانقاذ </h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>🏆 نحن اسرع ونش انقاذ</h3>
              <p>وصول خلال 15 دقيقة بحد أقصى</p>
            </div>
            <div className="feature-item">
              <h3>📍 نحن اقرب ونش انقاذ</h3>
              <p>أكثر من 100 ونش منتشر في جميع المناطق</p>
            </div>
            <div className="feature-item">
              <h3>💰 نحن ارخص ونش انقاذ</h3>
              <p>أسعار موحدة على كافة أنحاء الجمهورية</p>
            </div>
            <div className="feature-item">
              <h3>🛡️ أمان تام</h3>
              <p>ونش مزود بأجهزة تتبع GPS للأمان التام</p>
            </div>
            <div className="feature-item">
              <h3>👨‍🔧 طاقم محترف</h3>
              <p>سائقين وناشين احترافي ومدرب على سحب السيارات</p>
            </div>
            <div className="feature-item">
              <h3>⏰ خدمة 24/7</h3>
              <p>نعمل على مدار الساعة كل يوم لمدة 24 ساعة</p>
            </div>
          </div>
        </div>
      </div>

      <div className="back-section">
        <button className="back-btn" onClick={() => navigate('/')}>
          <span className="btn-arrow">←</span>
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
};

export default Winch;
