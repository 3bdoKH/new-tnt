import React, { useState } from 'react'
import './Form.css'

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        carType: '',
        carModel: '',
        year: '',
        inspectionType: '',
        transmission: ''
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
        const message = `مرحباً، أريد حجز موعد

                        البيانات الشخصية:
                        الاسم: ${formData.name}
                        رقم الهاتف: ${formData.contactNumber}
                        
                        بيانات السيارة :
                        نوع السيارة : ${formData.carType}
                        موديل السيارة : ${formData.carModel}
                        سنة الصنع : ${formData.year}
                        نوع ناقل الحركة : ${formData.transmission}
                        نوع الصيانه المطلوب : ${formData.inspectionType}

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
            inspectionType: '',
            transmission: ''
        })
    }

    return (
        <div className="form-split-container" id="form">
            <div className="image-section">
                <img src={require('./form.png')} alt="Car Form" className="form-image" />
            </div>

            <div className="form-section">
                <form className="car-form" onSubmit={handleSubmit}>
                    <h1 className="form-title">أدخل بيانات سيارتك</h1>

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
                        <label>إختر نوع السيارة</label>
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
                        <label>إختر موديل السيارة</label>
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
                        <label>إختر سنة الصنع</label>
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
                        <label>نوع الصيانه المطلوب</label>
                        <div className="input-wrapper">
                            <select name="inspectionType" value={formData.inspectionType} onChange={handleChange} required>
                                <option value="">اختر نوع الصيانه</option>
                                <option value="general">صيانه عامه</option>
                                <option value="engine">صيانه المحرك</option>
                                <option value="brakes">صيانه الفرامل</option>
                                <option value="electrical">صيانه الكهرباء</option>
                                <option value="suspension">صيانه التعليق</option>
                                <option value="diagnostic">صيانه تشخيصيه</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>إختر نوع ناقل الحركة</label>
                        <div className="input-wrapper">
                            <select name="transmission" id="transmission" value={formData.transmission} onChange={handleChange}>
                                <option value="automatic">اوتوماتيك</option>
                                <option value="manual">يدوي</option>
                            </select>

                        </div>
                    </div>

                    <button type="submit" className="search-btn">
                        حجز موعد صيانه
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Form
