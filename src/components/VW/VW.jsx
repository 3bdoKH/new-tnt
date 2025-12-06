import React, { useState, useEffect } from 'react'
import './VW.css'
import { useNavigate } from 'react-router-dom'
const VW = () => {
    const navigate = useNavigate()
    const brands = [
        { name: 'Volkswagen', image: '/images/vw/volks.jpeg' },
        { name: 'Audi', image: '/images/vw/audi.jpeg' },
        { name: 'Seat', image: '/images/vw/seat.jpeg' },
        { name: 'Skoda', image: '/images/vw/skoda.jpeg' },
        { name: 'Cupra', image: '/images/vw/cupra.jpeg' },
        { name: 'Lamborghini', image: '/images/vw/lamborghini.jpeg' },
        { name: 'Porsche', image: '/images/vw/porsche.jpeg' },
        { name: 'Bently', image: '/images/vw/bently.jpeg' },
        { name: 'Ducati', image: '/images/vw/ducati.jpeg' },
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
        <div className="vw-wrapper">
            <div className="vw-container" onClick={() => navigate('/vw-group')}>
                <h2>Volkswagen Group</h2>
                <div className="vw-brands">
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
        </div>
    )
}

export default VW
