import { useState, useEffect } from "react";
import SurveyCard from "./SurveyCard"
import { fetchCardDetails } from "../utils/services";

const SurveyCards = () => {
    const [cardDetails, setCardDetails] = useState([]);

    useEffect(() => {
        fetchCardDetails(setCardDetails);
    },[]);

    return (
        <div className="ml-20 flex-nowrap justify-evenly">
            { cardDetails.map((cardData) =>
                (<SurveyCard key={cardData._id} cardData={cardData} />)
            )}
        </div>
    )
}

export default SurveyCards;