import React from 'react'
import './CarWashing.css'
import { useNavigate } from 'react-router-dom'

const CarWashing = () => {
    const navigate = useNavigate()

    return (
        <div className='car-washing-container' onClick={() => navigate('/car-washing')}>
            <div className="washing-overlay">
                <div className="washing-content">
                    <div className="washing-features">
                        <span className="feature">غسيل كيماوي</span>
                        <span className="feature">غسيل جاف</span>
                        <span className="feature">غسيل بالمياه</span>
                        <span className="feature">غسيل بالبخار</span>
                    </div>
                    <div className="washing-center">
                        <h2 className="washing-title">غسيل السيارة</h2>
                        <p className="washing-price">50 جنيه</p>
                    </div>
                    <div className="washing-action">
                        <button className="washing-btn">
                            احجز الآن
                            <span className="btn-arrow">←</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarWashing

