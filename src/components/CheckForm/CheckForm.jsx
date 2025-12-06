import React, { useState } from 'react'
import './CheckForm.css'

const CheckForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        carType: '',
        carModel: '',
        year: '',
        transmission: '',
        currentMileage: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const whatsappNumber = '+201111132621'
        const message = `مرحباً، أريد حجز موعد فحص السيارة

                        البيانات الشخصية:
                        الاسم: ${formData.name}
                        رقم الهاتف: ${formData.contactNumber}
                        
                        بيانات السيارة:
                        نوع السيارة: ${formData.carType}
                        موديل السيارة: ${formData.carModel}
                        سنة الصنع: ${formData.year}
                        نوع ناقل الحركة: ${formData.transmission}
                        
                        معلومات الفحص:
                        عدد الكيلومترات الحالي: ${formData.currentMileage}

                        شكراً لكم`

        const encodedMessage = encodeURIComponent(message)

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

        window.open(whatsappURL, '_blank')

        setFormData({
            name: '',
            contactNumber: '',
            carType: '',
            carModel: '',
            year: '',
            transmission: '',
            currentMileage: '',
        })
    }

    return (
        <div className="check-form-split-container" id="check-form">

            <div className="check-form-section">
                <form className="inspection-form" onSubmit={handleSubmit}>
                    <h1 className="check-form-title">حجز موعد فحص السيارة</h1>

                    <div className="form-group">
                        <label>الاسم الكامل</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="أدخل اسمك الكامل"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>رقم الهاتف</label>
                        <div className="input-wrapper">
                            <input
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="أدخل رقم الهاتف"
                                required
                                style={{ direction: 'rtl' }}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>نوع السيارة</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="carType"
                                value={formData.carType}
                                onChange={handleChange}
                                placeholder="أدخل نوع السيارة"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>موديل السيارة</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="carModel"
                                value={formData.carModel}
                                onChange={handleChange}
                                placeholder="أدخل موديل السيارة"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>سنة الصنع</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                placeholder="أدخل سنة الصنع"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>نوع ناقل الحركة</label>
                        <div className="input-wrapper">
                            <select name="transmission" value={formData.transmission} onChange={handleChange} required>
                                <option value="">اختر نوع ناقل الحركة</option>
                                <option value="automatic">اوتوماتيك</option>
                                <option value="manual">يدوي</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>عدد الكيلومترات الحالي</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="currentMileage"
                                value={formData.currentMileage}
                                onChange={handleChange}
                                placeholder="أدخل عدد الكيلومترات"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="check-search-btn">
                        حجز موعد الفحص
                    </button>
                </form>
            </div>
            <div className="check-image-section">
                <img src={require('./form.png')} alt="Car Inspection" className="check-form-image" />
            </div>
        </div>
    )
}

export default CheckForm
