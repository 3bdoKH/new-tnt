import React from 'react'
import './newParts.css'
import { useNavigate } from 'react-router-dom'

const NewParts = () => {
    const navigate = useNavigate()
    
    return (
        <div className='new-parts-container' onClick={() => navigate('/new-parts')}>
            <div className="parts-overlay">
                <div className="parts-content">
                    <h2 className="parts-title">قطع غيار جديدة</h2>
                    <p className="parts-description">قطع أصلية 100% من الشركات المصنعة المعتمدة</p>
                    <div className="parts-features">
                        <span className="feature">✅ ضمان الجودة</span>
                        <span className="feature">🚚 شحن سريع</span>
                        <span className="feature">🔧 دعم فني</span>
                    </div>
                    <button className="parts-btn">
                        تصفح القطع الجديدة
                        <span className="btn-arrow">→</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewParts
