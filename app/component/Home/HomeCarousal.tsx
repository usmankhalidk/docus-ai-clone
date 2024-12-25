import React from 'react'
import Carousel from './Carousal'
import cardData from "../../Json/Carousal.json"
const HomeCarousal = () => {
    return (
        <>
            <Carousel
                cards={cardData?.Home?.data}
                title={cardData?.Home?.title}
                description={cardData?.Home?.description}
            />

        </>
    )
}

export default HomeCarousal