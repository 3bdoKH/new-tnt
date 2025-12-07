import React, { useEffect, useState } from 'react';
import './CarWashing.css';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

const CarWashing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carType: '',
    washingType: ''
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.carType || !formData.washingType) {
      alert('الرجاء ملء جميع الحقول');
      return;
    }

    const phoneNumber = '01111132621';
    const message = encodeURIComponent(
      `مرحباً، أريد حجز خدمة غسيل السيارة:\n\nنوع السيارة: ${formData.carType}\nنوع الغسيل: ${formData.washingType}\n\nالسعر: 50 جنيه`
    );

    window.open(`https://wa.me/+2${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="car-washing-page">
      <SEOHead
        title="غسيل السيارة - 50 جنيه"
        description="خدمة غسيل سيارات احترافية بسعر 50 جنيه فقط. نقدم غسيل كيماوي، غسيل جاف، غسيل بالمياه، وغسيل بالبخار. احجز الآن عبر واتساب."
        keywords="غسيل سيارات, غسيل كيماوي, غسيل جاف, غسيل بالمياه, غسيل بالبخار, غسيل سيارات رخيص, TNT Garage, غسيل سيارات المعادي, غسيل سيارات القاهرة"
        url="https://tntgaragede.com/car-washing"
      />

      <div className="washing-hero">
        <button className="back-btn-w" onClick={() => navigate('/')}>
          <span className="btn-arrow">←</span>
          العودة للرئيسية
        </button>

        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">خدمة احترافية</div>
            <h1 className="hero-title">غسيل السيارة</h1>
            <div className="hero-price-wrapper">
              <span className="hero-price">50</span>
              <span className="hero-currency">جنيه</span>
            </div>
            <p className="hero-subtitle">
              احصل على أفضل خدمة غسيل لسيارتك مع فريقنا المحترف
            </p>

            <div className="hero-features-list">
              <div className="hero-feature">
                <div className="feature-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>جودة عالية</span>
              </div>
              <div className="hero-feature">
                <div className="feature-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>خدمة سريعة</span>
              </div>
              <div className="hero-feature">
                <div className="feature-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <span>ضمان الأمان</span>
              </div>
            </div>

            <div className="hero-cta">
              <button className="cta-primary" onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}>
                احجز الآن
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button className="cta-secondary" onClick={() => window.open(`https://wa.me/+201111132621?text=${encodeURIComponent('مرحباً، أريد الاستفسار عن خدمة غسيل السيارة')}`, '_blank')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                تواصل عبر واتساب
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <div className="visual-content">
                <h3>أنواع الغسيل</h3>
                <ul className="visual-list">
                  <li>غسيل كيماوي</li>
                  <li>غسيل جاف</li>
                  <li>غسيل بالمياه</li>
                  <li>غسيل بالبخار</li>
                </ul>
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">500+</div>
                <div className="stat-label">عميل راضي</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">100%</div>
                <div className="stat-label">رضا العملاء</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="washing-types-section">
        <div className="container">
          <h2 className="section-title">أنواع الغسيل المتاحة</h2>
          <div className="types-grid">
            <div className="type-card">
              <h3>غسيل كيماوي</h3>
              <p>غسيل عميق باستخدام مواد كيميائية متخصصة لإزالة الأوساخ العنيدة والبقع الصعبة بشكل احترافي</p>
            </div>
            <div className="type-card">
              <h3>غسيل جاف</h3>
              <p>تنظيف فعال بدون استخدام الماء، مثالي للحفاظ على الطلاء وحماية السيارة من الخدوش</p>
            </div>
            <div className="type-card">
              <h3>غسيل بالمياه</h3>
              <p>الطريقة التقليدية والفعالة لغسيل السيارة بالماء والصابون مع تنظيف شامل من الداخل والخارج</p>
            </div>
            <div className="type-card">
              <h3>غسيل بالبخار</h3>
              <p>تنظيف عميق وتعقيم كامل باستخدام البخار عالي الحرارة للقضاء على البكتيريا والجراثيم</p>
            </div>
          </div>
        </div>
      </div>

      <div className="booking-section" id="booking">
        <div className="container">
          <h2 className="section-title">احجز الآن</h2>
          <div className="booking-content">
            <div className="booking-info">
              <h3>لماذا تختار خدمتنا؟</h3>
              <div className="info-list">
                <div className="info-item">
                  <span>خدمة سريعة وفعالة</span>
                </div>
                <div className="info-item">
                  <span>استخدام مواد آمنة على السيارة</span>
                </div>
                <div className="info-item">
                  <span>فريق عمل محترف</span>
                </div>
                <div className="info-item">
                  <span>اهتمام بالتفاصيل</span>
                </div>
              </div>
            </div>

            <div className="booking-form-wrapper">
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-group-w">
                  <label htmlFor="carType">نوع السيارة</label>
                  <input
                    type="text"
                    id="carType"
                    name="carType"
                    placeholder="مثال: BMW X5 أو Mercedes C200"
                    value={formData.carType}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-w">
                  <label htmlFor="washingType">نوع الغسيل</label>
                  <select
                    id="washingType"
                    name="washingType"
                    value={formData.washingType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">اختر نوع الغسيل</option>
                    <option value="غسيل كيماوي">غسيل كيماوي</option>
                    <option value="غسيل جاف">غسيل جاف</option>
                    <option value="غسيل بالمياه">غسيل بالمياه</option>
                    <option value="غسيل بالبخار">غسيل بالبخار</option>
                  </select>
                </div>
                <button type="submit" className="submit-btn">
                  <span className="btn-icon">💬</span>
                  احجز عبر واتساب
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">مميزات خدمتنا</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>سعر مناسب</h3>
              <p>سعر ثابت وواضح بدون رسوم خفية، مع ضمان أفضل قيمة مقابل المال</p>
            </div>
            <div className="feature-item">
              <h3>الحفاظ على الطلاء</h3>
              <p>نستخدم مواد آمنة ومعتمدة تحافظ على طلاء سيارتك الأصلي</p>
            </div>
            <div className="feature-item">
              <h3>تنظيف شامل</h3>
              <p>نظافة كاملة من الداخل والخارج مع الاهتمام بأدق التفاصيل</p>
            </div>
            <div className="feature-item">
              <h3>توفير الوقت</h3>
              <p>خدمة سريعة وفعالة لا تستغرق وقتاً طويلاً من يومك</p>
            </div>
            <div className="feature-item">
              <h3>نتائج مذهلة</h3>
              <p>سيارتك ستبدو كأنها جديدة تماماً بعد خدمتنا الاحترافية</p>
            </div>
            <div className="feature-item">
              <h3>حجز سهل</h3>
              <p>احجز بسهولة وسرعة عبر واتساب في أي وقت</p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <div className="container">
          <h2 className="section-title">تواصل معنا</h2>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-details">
                <h3>رقم الهاتف</h3>
                <p>01111132621</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-details">
                <h3>واتساب</h3>
                <p>متاح للحجز السريع والاستفسارات</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-details">
                <h3>ساعات العمل</h3>
                <p>يومياً من 9 صباحاً إلى 10 مساءً</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default CarWashing;

