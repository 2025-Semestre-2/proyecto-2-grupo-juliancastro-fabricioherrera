import React from 'react';
import './HotelSection.css';
import HotelCard from '../../components/hotelCard/HotelCard';

const HotelSection = () => {
    const hotels = [
        { id: 1, name: 'Hotel A', description: 'Descripción del Hotel A', image: 'url_a' },
        { id: 2, name: 'Hotel B', description: 'Descripción del Hotel B', image: 'url_b' },
        { id: 3, name: 'Hotel C', description: 'Descripción del Hotel C', image: 'url_c' },
    ];

    return (
        <div className="hotel-section">
            <h2>Hoteles Disponibles</h2>
            <div className="hotel-list">
                {hotels.map(hotel => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                ))}
            </div>
        </div>
    );
};

export default HotelSection;