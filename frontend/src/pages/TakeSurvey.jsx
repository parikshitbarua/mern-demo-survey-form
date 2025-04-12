import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { fetchSurveyQuestions } from "../utils/services"

const TakeSurvey = () => {
    const { id: surveyId} = useParams();

    const [surveyQuestion, setSurveyQuestions] = useState([]);

    useEffect(() => {
        fetchSurveyQuestions(surveyId, setSurveyQuestions);
    }, []);

    return (
        <div className="justify-right">
            <form>
                { surveyQuestion.map((question) => (
                    <div key={ question._id } className="m-6 p-4 border-b-black">
                        <label>{ question?.description} </label>
                        <div>
                            <input type="radio" className="m-2"/> Yes
                            <input type="radio" className="m-2 p-2"/> No
                        </div>
                    </div>

                ))}
                <button className="m-10 bg-cyan-500 rounded-2xl">Submit</button>
            </form>
        </div>
    )
}

export default TakeSurvey;