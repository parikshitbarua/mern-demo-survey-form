import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { fetchSurveyQuestions, submitSurvey } from "../utils/services"
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "../utils/constants";

const TakeSurvey = () => {
    const location = useLocation();
    const { cardData } = location.state || {};

    const { id: surveyId} = useParams();

    const navigate = useNavigate();

    const [surveyQuestions, setSurveyQuestions] = useState([]);
    const [surveyAnswers, setSurveyAnswers] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSurveyQuestions(surveyId, setSurveyQuestions);
    }, []);

    const handleInputChange = (questionID, value) => {
        setSurveyAnswers((prevState) => ({
            ...prevState,
            [questionID]: value
        }));
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const allAnswered = surveyQuestions.every(question => surveyAnswers[question.questionId] != null && Object.keys(surveyAnswers).length === surveyQuestions.length);
        if (!allAnswered) {
            setError("Please answer all questions");
            return;
        }
        setError("");
        const payload = surveyQuestions.map((question) => ({
            questionId: question.questionId,
            answer: surveyAnswers[question.questionId]
        }));
        try {
            await submitSurvey(surveyId,payload);
            toast.success('Response added successfully!',TOAST_CONFIG);
            setTimeout(() => navigate('/'), 1000);
        } catch(err) {
            toast.error(err.toString(),TOAST_CONFIG);
        }
    }

    return (
        <div className="flex flex-col items-center mt-20 px-4">
            {/* Survey Title */}
            <div className="w-full max-w-2xl text-4xl font-bold text-center">
                {cardData.surveyName}
            </div>

            {/* Survey Description */}
            <div className="w-full max-w-2xl text-xl font-semibold text-center mt-8">
                {cardData.description}
            </div>

            {/* Form */}
            <form className="w-full max-w-2xl bg-white p-6 mt-12 rounded-xl shadow-md">
                {surveyQuestions.map((question) => (
                    <div key={question.questionId} className="mb-6 border-b border-gray-200 pb-4">
                        <label className="block text-lg font-medium text-gray-800 mb-2">
                            {question.questionId + '. ' + question?.description}
                        </label>
                        <div className="flex space-x-6">
                            <label className="inline-flex items-center text-gray-700">
                                <input
                                    type="radio"
                                    name={question.questionId}
                                    value="Yes"
                                    checked={surveyAnswers[question.questionId] === true}
                                    onChange={() => handleInputChange(question.questionId, true)}
                                    className="form-radio text-blue-500 h-5 w-5"
                                />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="inline-flex items-center text-gray-700">
                                <input
                                    type="radio"
                                    value="No"
                                    checked={surveyAnswers[question.questionId] === false}
                                    onChange={() => handleInputChange(question.questionId, false)}
                                    className="form-radio text-red-500 h-5 w-5"
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                    </div>
                ))}
                <button
                    className="bg-blue-500 text-white font-medium px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition duration-200"
                    onClick={(e) => handleFormSubmit(e)}
                >
                    Submit
                </button>

                {error.length > 0 && (
                    <div className="text-red-500 mt-4">{error}</div>
                )}
            </form>
        </div>
    );


}

export default TakeSurvey;