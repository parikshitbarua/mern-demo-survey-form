import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { addNewSurveyService } from "../utils/services";
import { TOAST_CONFIG } from "../utils/constants";
const CreateSurvey = () => {
    const [surveyDescription, setSurveyDescription] = useState("");
    const [surveyName, setSurveyName] = useState("");
    const [questions, setQuestions] = useState([{
        description: ""
    }]);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleQuestionChange = (index, value) => {
        const updatedQuestion = {
            description: value
        }
        setQuestions((prevState) => {
            return [...prevState.slice(0, index), updatedQuestion, ...prevState.slice(index + 1)]
        })
    }

    const addNewQuestion = () => {
        setQuestions((prevState) => {
            return [...prevState, { description: ""}]
        })
    }

    const removeQuestion = (index) => {
        setQuestions((prevState) => {
            const questions = [...prevState];
            if (questions.length === 1) {
                setError("")
                return questions;
            }
            questions.splice(index, 1);
            return questions;
        })
    }

    const submitSurvey = async (e) => {
        e.preventDefault();

        if (surveyName === "" || surveyDescription === "") {
            setError(surveyName === "" ? "Please Enter Survey Name" : "Please enter Survey Description");
            return;
        }
        if (questions.some(q => q.description === "")) {
            setError("Please fill all the questions, or delete questions which are not filled");
            return;
        }
        setError("");
        const payload = {
            surveyName,
            surveyDescription,
            questions
        }
        const surveyId = await addNewSurveyService(payload);
        if (surveyId) {
            toast.success("New Survey Created", TOAST_CONFIG);
            const cardData = {
                surveyName,
                description: surveyDescription
            }
            setTimeout(() => {
                navigate(`../take-survey/${surveyId}`,{
                    state: { cardData }
                }
            )} , 1000);
        } else {
            toast.error("Failed to Create Survey", TOAST_CONFIG);
        }
    }

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 py-12 px-4">
            <form className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md">
                {/* Survey Name */}
                <div className="mb-8">
                    <label className="block text-xl font-semibold text-gray-800 mb-2">Survey Name</label>
                    <input
                        type="text"
                        placeholder="Survey Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={surveyName}
                        onChange={(e) => setSurveyName(e.target.value)}
                    />
                </div>

                {/* Survey Description */}
                <div className="mb-12">
                    <label className="block text-xl font-semibold text-gray-800 mb-2">Description</label>
                    <input
                        type="text"
                        placeholder="Survey Description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={surveyDescription}
                        onChange={(e) => setSurveyDescription(e.target.value)}
                    />
                </div>

                {/* Questions */}
                <div className="space-y-8">
                    {questions.map((question, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6">
                            <div className="flex justify-between items-center">
                                <label className="text-xl font-semibold text-gray-800">
                                    Question {index + 1}
                                </label>
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700 transition"
                                    onClick={() => removeQuestion(index)}
                                >
                                    ✕
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Description"
                                className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                value={question.description}
                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-12">
                    <button
                        type="button"
                        className="bg-blue-500 text-white font-medium px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition duration-200"
                        onClick={addNewQuestion}
                    >
                        + Add Question
                    </button>
                    <button
                        className="bg-blue-500 text-white font-medium px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition duration-200"
                        onClick={(e) => submitSurvey(e)}
                    >
                        Submit Survey
                    </button>
                </div>

                {/* Error Message */}
                {error.length > 0 && (
                    <div className="text-red-500 mt-6 font-medium">{error}</div>
                )}
            </form>
        </div>
    );


}

export default CreateSurvey;