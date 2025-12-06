import React from 'react'
import './usedParts.css'
import { useNavigate } from 'react-router-dom'

const UsedParts = () => {
    const navigate = useNavigate()
    
    return (
        <div className='used-parts-container' onClick={() => navigate('/used-parts')}>
            <div className="parts-overlay">
                <div className="parts-content">
                    <h2 className="parts-title">قطع غيار استيراد</h2>
                    <p className="parts-description">قطع استيراد عالية الجودة بأسعار منافسة</p>
                    <div className="parts-features">
                        <span className="feature">💰 أسعار منافسة</span>
                        <span className="feature">✅ فحص شامل</span>
                        <span className="feature">🌍 استيراد أوروبي</span>
                    </div>
                    <button className="parts-btn">
                        تصفح قطع الاستيراد
                        <span className="btn-arrow">→</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UsedParts
