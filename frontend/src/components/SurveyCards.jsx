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
        <>
            { message.length > 0 && message !== "" ? (
                <div className="flex justify-center items-center h-screen">{ message }</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 justify-items-center min-h-screen-20 bg-gray-50">
                    {cardDetails.map((cardData) => (
                        <SurveyCard key={cardData._id} cardData={cardData} />
                    ))}
                </div>
            )}
        </>
    );

}

export default SurveyCards;