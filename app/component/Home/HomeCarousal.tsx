import React from 'react'
import Carousel from './Carousal'
import cardData from "../../Json/Carousal.json"
const HomeCarousal = () => {
    return (
        <>
            <Carousel
                cards={cardData}
                title="Make Informed Health Decisions"
                description="We have all you need to better understand your health and make informed and accurate decisions about your well-being."
            />

        </>
    )
}

export default HomeCarousal