import React, { useState, useEffect } from "react";
import "./Home.css";
import NewParts from "../components/newParts/newParts";
import UsedParts from "../components/usedParts/usedParts";
import CarWashing from "../components/CarWashing/CarWashing";
import Form from "../components/Form/Form";
import BMW from "../components/BMW/BMW";
import VW from "../components/VW/VW";
import CheckForm from "../components/CheckForm/CheckForm";
import SEOHead from "../components/SEOHead";

const cars = [
  {
    name: "BMW",
    featured: "bmw-side",
    showcase: "bmw-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Volkswagen",
    featured: "volks-side",
    showcase: "volks-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Audi",
    featured: "audi-side",
    showcase: "audi-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Bentley",
    featured: "bently-side",
    showcase: "bently-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Rolls-Royce",
    featured: "rolls-side",
    showcase: "rolls-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Lamborghini",
    featured: "lambo-side",
    showcase: "lambo-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Mini Cooper",
    featured: "mini-side",
    showcase: "mini-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Porsche",
    featured: "porsche-side",
    showcase: "porsche-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Skoda",
    featured: "skoda-side",
    showcase: "skoda-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Seat",
    featured: "seat-side",
    showcase: "seat-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
]

const Home = () => {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentCar = cars[currentCarIndex];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCarIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex >= cars.length ? 0 : nextIndex;
        });
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <SEOHead
        title="الرئيسية"
        description="TNT Garage - متجر قطع غيار السيارات الألمانية في مصر. قطع غيار جديدة ومستعملة لجميع ماركات BMW و Volkswagen Group. خدمة ونش انقاذ 24/7، فحص السيارات، صيانة السيارات الألمانية. توصيل سريع في جميع أنحاء مصر."
        keywords="قطع غيار سيارات, قطع غيار BMW, قطع غيار أودي, قطع غيار فولكس فاجن, قطع غيار بورش, قطع غيار لامبورغيني, قطع غيار بنتلي, قطع غيار جديدة, قطع غيار مستعملة, قطع غيار استيراد, ونش انقاذ, سحب سيارات, فحص سيارات, صيانة سيارات, TNT Garage, مصر, المعادي, القاهرة"
        url="https://tntgaragede.com/"
      />
      <div className="car-showcase">
        <div className="lower-showcase">
          <div className="main-title">
            <img src={require('../logo-tr.png')} alt="TNT Garage Logo" className="brand-logo" />
          </div>
          <div className="interactive-bar">
            <button className="order-btn" onClick={() => window.location.href = '#form'}>حجز صيانه</button>
            <button className="order-btn" onClick={() => window.location.href = '/new-parts'}>قطع غيار جديده</button>
            <button className="order-btn" onClick={() => window.location.href = '/used-parts'}>قطع غيار مستعمله</button>
            <button className="order-btn" onClick={() => window.location.href = '#inspection'}>فحص السيارات</button>
          </div>
          <div className="featured-car">
            <img
              src={require(`../${currentCar.featured}.png`)}
              alt={`${currentCar.name} - Featured German Car`}
              className={`featured-car-image ${isAnimating ? 'car-fade-out' : 'car-fade-in'}`}
            />
            <div className="car-name-display">
              <h3
                className={`car-name ${isAnimating ? 'name-fade-out' : 'name-fade-in'}`}
                key={currentCar.name}
              >
                {currentCar.name}
              </h3>
            </div>
          </div>
        </div>
        <div className="upper-showcase">
          <div className="car-image-container">
            <img
              src={require(`../${currentCar.showcase}.png`)}
              alt={`${currentCar.name} - Premium German Car`}
              className={`showcase-car ${isAnimating ? 'showcase-fade-out' : 'showcase-fade-in'}`}
            />
          </div>
          <div className="separator"></div>
          <p className="car-description">
            Experience the pinnacle of German engineering with our premium selection of BMW and Volkswagen vehicles.
            Each car represents the perfect blend of luxury, performance, and cutting-edge technology.
          </p>
        </div>
      </div>
      <BMW />
      <VW />
      <div className="brands-section">
        <div className="container">
          <h2 className="brands-title">German Automotive Excellence</h2>
          <div className="brands-grid">
            <div className="brand-card" onClick={() => window.location.href = '/bmw-group'}>
              <div className="brand-icon">🔧</div>
              <h3>BMW Group</h3>
              <p>Premium performance and luxury engineering</p>
            </div>
            <div className="brand-card" onClick={() => window.location.href = '/vw-group'}>
              <div className="brand-icon">⚡</div>
              <h3>Volkswagen Group</h3>
              <p>Reliability and advanced technology</p>
            </div>
          </div>
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Parts Delivered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </div>
      </div>


      <Form />

      {/* Car Washing Section */}
      <div className="car-washing-section">
        <div className="container">
          <div className="washing-section-header">
            <h2 className="washing-section-title">خدمة غسيل السيارات</h2>
            <p className="washing-section-subtitle">احصل على أفضل خدمة غسيل لسيارتك بأسعار منافسة</p>
          </div>
          <CarWashing />
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>Services</h2>
          <div className="parts-container">
            <NewParts />
            <UsedParts />
          </div>
        </div>
      </div>
      <div className="inspection-section" id="inspection">
        <div className="container">
          <div className="inspection-content">
            <div className="inspection-header">
              <h2 className="inspection-title">فحص شامل للسيارات المستعملة قبل الشراء</h2>
              <div className="inspection-icon">🔍</div>
            </div>
            <div className="inspection-description">
              <p>
                نقدّم خدمة الكشف الفني المتكامل على السيارات المستعملة لضمان حالتها الفنية قبل إتمام عملية الشراء.
                نقوم بفحص المحرك، الفتيس، الشاسيه، الكهرباء، العفشة، والدهان باستخدام أحدث الأجهزة،
                مع تقديم تقرير مفصل عن حالة السيارة لتساعدك في اتخاذ قرارك بثقة واطمئنان.
              </p>
            </div>
            <div className="inspection-features">
              <div className="inspection-feature">
                <span className="feature-icon">⚙️</span>
                <span>فحص المحرك</span>
              </div>
              <div className="inspection-feature">
                <span className="feature-icon">🔧</span>
                <span>فحص الفتيس</span>
              </div>
              <div className="inspection-feature">
                <span className="feature-icon">🏗️</span>
                <span>فحص الشاسيه</span>
              </div>
              <div className="inspection-feature">
                <span className="feature-icon">⚡</span>
                <span>فحص الكهرباء</span>
              </div>
              <div className="inspection-feature">
                <span className="feature-icon">🛠️</span>
                <span>فحص العفشة</span>
              </div>
              <div className="inspection-feature">
                <span className="feature-icon">🎨</span>
                <span>فحص الدهان</span>
              </div>
            </div>
          </div>
        </div>
        <CheckForm />
      </div>
    </div>
  );
};

export default Home; 