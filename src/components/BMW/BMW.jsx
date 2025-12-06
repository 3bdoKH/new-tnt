import React, { useState, useEffect } from 'react'
import './BMW.css'
import { useNavigate } from 'react-router-dom'
const BMW = () => {
    const navigate = useNavigate()
    const brands = [
        { name: 'BMW', image: '/images/bmw/bmw.jpeg' },
        { name: 'Mini', image: '/images/bmw/mini.jpeg' },
        { name: 'Rolls-Royce', image: '/images/bmw/Rolls-Royce.jpeg' }
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1
                return nextIndex >= brands.length ? 0 : nextIndex
            })
        }, 2000) 

        return () => clearInterval(interval)
    }, [brands.length])

    const getDisplayBrands = () => {
        const firstBrand = brands[currentIndex]
        const secondBrand = brands[(currentIndex + 1) % brands.length]
        return [firstBrand, secondBrand]
    }

    const displayBrands = getDisplayBrands()

    return (
        <div className="bmw-container" onClick={() => navigate('/bmw-group')}>
            <h2>BMW Group</h2>
            <div className="bmw-brands">
                {displayBrands.map((brand, index) => (
                    <div key={`${brand.name}-${currentIndex}-${index}`} className="brand-item">
                        <img 
                            src={brand.image} 
                            alt={brand.name} 
                            className="brand-image"
                        />
                        <h3 className="brand-name">{brand.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BMW
