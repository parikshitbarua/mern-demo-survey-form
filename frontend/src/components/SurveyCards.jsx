import { useState, useEffect } from "react";
import SurveyCard from "./SurveyCard"
import { fetchCardDetails } from "../utils/services";

const SurveyCards = () => {
    const [cardDetails, setCardDetails] = useState([]);

    useEffect(() => {
        fetchCardDetails(setCardDetails);
    },[]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 justify-items-center min-h-screen bg-gray-50">
        {cardDetails.map((cardData) => (
                <SurveyCard key={cardData._id} cardData={cardData} />
            ))}
        </div>
    );

}

export default SurveyCards;