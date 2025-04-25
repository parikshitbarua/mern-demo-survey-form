import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchSurveyResultsService } from "../utils/services";

const SurveyResults = () => {
    const [surveyQuestionsBreakUp, setSurveyQuestionsBreakUp] = useState([]);
    const [surveyDetails, setSurveyDetails] = useState({});
    const [errorMessage, setErrorMessage] = useState("Loading...")

    const { id: surveyId } = useParams();

    useEffect(() => {
        const fetchSurveyResults = async() => {
            const surveyResults = await fetchSurveyResultsService(surveyId);
            console.log("fetching", surveyResults);
            if (surveyResults === null) {
                // error
                setErrorMessage("Error");
            } else {
                setErrorMessage("");
                setSurveyQuestionsBreakUp(surveyResults?.breakUpDetails);
                setSurveyDetails((prevState) => {
                    return {
                        name: surveyResults?.surveyName,
                        numberOfSurveyTaken: surveyResults?.overAllDetails?.numberOfSurveyTaken,
                        positiveResponses: surveyResults?.overAllDetails?.positiveResponses,
                        negativeResponses: surveyResults?.overAllDetails?.negativeResponses,
                    }
                });
            }
        } 
        if (setSurveyDetails != null && setSurveyQuestionsBreakUp != null) {     
            fetchSurveyResults();
        }

    },[])

    return (
        <div className="flex flex-col items-center mt-20 px-4 space-y-8 w-full max-w-3xl mx-auto">

            { errorMessage.length > 0 && errorMessage === "" ? { errorMessage } : ""}

            <div className="flex justify-center mb-6">
                <h2 className="text-2xl font-bold text-blue-700 text-center">
                    Survey: { surveyDetails?.name }
                </h2>
            </div>

            {/* Row 1 - Total Surveys (Emphasized Box) */}
            <div className="w-full bg-blue-500 text-white rounded-xl p-6 shadow-xl flex justify-between items-center">
                <div className="text-2xl font-bold">Number of Surveys Taken</div>
                <div className="text-3xl font-extrabold">{ surveyDetails?.numberOfSurveyTaken }</div> {/* example number */}
            </div>

            {/* Row 2 - Total Positive and Negative */}
            <div className="w-full grid grid-cols-2 gap-4">
                <div className="bg-green-100 border border-green-300 rounded-xl p-6 text-center shadow">
                    <div className="text-xl font-semibold text-green-700">Total Positive</div>
                    <div className="text-2xl font-bold text-green-700 mt-2">{ surveyDetails?.positiveResponses }</div>
                </div>
                <div className="bg-red-100 border border-red-300 rounded-xl p-6 text-center shadow">
                    <div className="text-xl font-semibold text-red-700">Total Negative</div>
                    <div className="text-2xl font-bold text-red-700 mt-2">{ surveyDetails?.negativeResponses }</div>
                </div>
            </div>

            { surveyQuestionsBreakUp!= null && surveyQuestionsBreakUp.map((surveyQuestion) => {
                return (<div className="w-full bg-white border border-gray-200 shadow-sm rounded-xl p-6 mt-4" key={ surveyQuestion?.questionId }>
                    {/* Row 3 - Question (Less emphasized) */}
                    <div className="flex justify-center">
                        <div className="text-lg font-medium text-gray-800">
                            { surveyQuestion?.questionId }. { surveyQuestion?.question }
                        </div>
                    </div>

                    {/* Row 4 - Pos/Neg for that Question */}
                    <div className="w-1/2 grid grid-cols-2 gap-4 justify-between mx-auto mt-5">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center shadow">
                            <div className="text-xl font-medium text-green-600">Positive</div>
                            <div className="text-2xl font-bold text-green-700 mt-2">{ surveyQuestion?.positiveResponses }</div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center shadow">
                            <div className="text-xl font-medium text-red-600">Negative</div>
                            <div className="text-2xl font-bold text-red-700 mt-2">{ surveyQuestion?.negativeResponses }</div>
                        </div>
                    </div>
                </div>)
            })}

        </div>
    );
}

export default SurveyResults;