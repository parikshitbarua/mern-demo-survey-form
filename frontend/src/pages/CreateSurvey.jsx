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
            setTimeout(() => {navigate(`../take-survey/:${surveyId}`)}, 1000);
        } else {
            toast.error("Failed to Create Survey", TOAST_CONFIG);
        }
    }

    return (
        <div className="flex justify-center min-h-screen bg-gray-50">
            <form className="mx-4 w-1/2">
                <div className="mt-12">
                    <label className="font-semibold text-xl text-gray-800 mx-4">Survey Name</label>
                    <div className="m-4">
                        <input
                            type="text"
                            placeholder="Survey Name"
                            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            value={surveyName}
                            onChange={(e) => (setSurveyName(e.target.value))}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <label className="font-semibold text-xl text-gray-800 mx-4">Description</label>
                    <div className="m-4">
                        <input
                            type="text"
                            placeholder="Survey Description"
                            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            value={surveyDescription}
                            onChange={(e) => (setSurveyDescription(e.target.value))}
                        />
                    </div>
                </div>

                <div className="mt-20">
                    { questions.map((question, index) => {
                        return (
                            <div key={index}>
                                <label className="font-semibold text-xl text-gray-800 mx-4">Question { index + 1 }</label>
                                <button
                                    type="button"
                                    className="m-2 bg-cyan-500 rounded-2xl"
                                    onClick={() => removeQuestion(index)}
                                >
                                    <div className="px-6 text-black"> - </div>
                                </button>
                                <div className="m-4">
                                    <input
                                        type="text"
                                        placeholder="Desription"
                                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                        value={ question.description }
                                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="justify-between">
                    <button
                        className="m-2 bg-cyan-500 rounded-2xl"
                        onClick={(e) => submitSurvey(e)}
                    >
                        <div className="px-6 text-black">Submit Survey</div>
                    </button>
                    <button
                        type="button"
                        className="m-2 bg-cyan-500 rounded-2xl"
                        onClick={addNewQuestion}
                    >
                        <div className="px-6 text-black">+ Add Question</div>
                    </button>
                </div>
                { error.length > 0 && <div className="text-red-500">{ error }</div> }
            </form>
        </div>
    )

}

export default CreateSurvey;