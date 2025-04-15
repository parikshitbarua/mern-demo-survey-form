import {useEffect, useState} from "react";
import SurveyCard from "./SurveyCard"
import {fetchCardDetails} from "../utils/services";

const SurveyCards = () => {
    const [cardDetails, setCardDetails] = useState([]);
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        const fetch = async () => {
            const cardData = await fetchCardDetails();
            await setCardDetails(cardData);
            if (cardData.length === 0) {
                setMessage("No Surveys Found");
            } else if (!cardData) {
                setMessage("Failed to load card data");
            } else {
                setMessage("")
            }
        }
        fetch();
    },[]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 justify-items-center min-h-screen bg-gray-50">
            { message.length > 0 && message !== "" ? <div className="flex justify-center">{ message }</div> : ""}
        {cardDetails.map((cardData) => (
                <SurveyCard key={cardData._id} cardData={cardData} />
            ))}
        </div>
    );

}

export default SurveyCards;