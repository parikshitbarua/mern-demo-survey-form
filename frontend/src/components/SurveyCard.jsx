import { Link } from "react-router";

const SurveyCard = ({ cardData }) => {
    return (
        <div className="m-4 p-6 w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300 ease-in-out">
            <div className="font-semibold text-2xl text-gray-800">{ cardData.surveyName }</div>

            <div className="pt-4 text-gray-600">
                { cardData.description }
            </div>

            <div className="mt-6 flex justify-between items-center">
                <Link to={`/take-survey/${cardData._id}`} state={{ cardData }}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200">
                        Take Survey
                    </button>
                </Link>

                <Link to={`/survey-results/${cardData._id}`}>
                    <button className="px-4 py-2 bg-gray-100 text-blue-600 border border-blue-500 rounded-lg shadow hover:bg-blue-50 transition duration-200">
                        See Results
                    </button>
                </Link>
            </div>
        </div>
    );

}

export default SurveyCard;