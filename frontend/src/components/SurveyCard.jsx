import { Link } from "react-router";

const SurveyCard = ({ cardData }) => {
    return (
        <div className="m-10 p-5 bg-cyan-50 w-96 rounded-2xl justify-center relative">
            <div className="font-bold text-2xl">{ cardData.surveyName }</div>
            <div className="pt-5">This survey is about lorem ipsum donor cant details about the test</div>
            <div className="mt-4 flex justify-between">
                <Link to={`/take-survey/:${cardData._id}`}>
                    <button className="m-2 bg-cyan-500 rounded-2xl">
                        <div className="px-4">Take Survey</div>
                    </button>
                </Link>
                <Link className="w-1/2" to={`/survey-results/:${cardData._id}`}>
                    <button className="m-2 bg-cyan-500 rounded-2xl">
                        <div className="px-4">See Results</div>
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default SurveyCard;