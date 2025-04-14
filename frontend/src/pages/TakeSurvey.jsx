import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { fetchSurveyQuestions, submitSurvey } from "../utils/services"
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "../utils/constants";

const TakeSurvey = () => {
    const { id: surveyId} = useParams();

    const navigate = useNavigate();

    const [surveyQuestions, setSurveyQuestions] = useState([]);
    const [surveyAnswers, setSurveyAnswers] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("surveyId", surveyId);
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
        <div className="justify-right">
            <form>
                { surveyQuestions.map((question) => (
                    <div key={ question.questionId } className="m-6 p-4 border-b-black">
                        <label>{question.questionId + '. ' + question?.description} </label>
                        <div>
                            <label className="m-2">
                                <input
                                    type="radio"
                                    name={ question.questionId }
                                    value="Yes"
                                    checked={ surveyAnswers[question.questionId] === true }
                                    onChange={ () => handleInputChange(question.questionId, true)}
                                />{" "}
                                Yes
                            </label>
                            <label className="m-2">
                                <input
                                    type="radio"
                                    value="No"
                                    checked={ surveyAnswers[question.questionId] === false}
                                    onChange={ () => handleInputChange(question.questionId, false)}
                                />{" "}
                                No
                            </label>
                        </div>
                    </div>

                ))}
                <button
                    className="m-10 bg-cyan-500 rounded-2xl"
                    onClick={ (e) => handleFormSubmit(e) }
                >
                    <div className="px-4">Submit</div>
                </button>
            </form>
            { error.length > 0 &&
                (<div className="text-red-500 m-6 p-4">
                    { error }
                </div>)}
        </div>
    )
}

export default TakeSurvey;