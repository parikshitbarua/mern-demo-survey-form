import { getSurvey } from "../data-access/surveys.data-access.js";
import { getResponsesForSurvey } from "../data-access/responses.data-access.js";
import { getSurveyQuestions } from "../data-access/questions.data-access.js";

export const getSurveyResults = async (surveyId) => {
    const surveyDetails = await getSurvey(surveyId);
    console.log("surveyDetails", surveyDetails);
    const surveyQuestions = await getSurveyQuestions(surveyId);
    const surveyResponses = await getResponsesForSurvey(surveyId);
    const { overAllDetails, breakUpDetails} = calculateSurveyResults(surveyDetails, surveyQuestions, surveyResponses);
    return {
        surveyName: surveyDetails.surveyName,
        overAllDetails,
        breakUpDetails
    }
}

const calculateSurveyResults = (surveyDetails, surveyQuestions, surveyResponses) => {
    let overAllDetails = {
        numberOfSurveyTaken: 0,
        positiveResponses: 0,
        negativeResponses: 0
    };

    let breakUpDetails = [];
    let surveyResponseIds = [];

    surveyResponses.forEach(response => {
        if (!surveyResponseIds.includes(response.surveyResponseId)) {
            overAllDetails.numberOfSurveyTaken++;
            surveyResponseIds.push(response.surveyResponseId);
        }
        response.answer ? overAllDetails.positiveResponses++ : overAllDetails.negativeResponses++;

        const parentQuestion = surveyQuestions.find((question) => {
            return question._id.toString() === response.parentQuestionId.toString();
        });
        console.log(parentQuestion);
        const detail = breakUpDetails.find(detail => detail != null ? detail.questionId === parentQuestion.questionId : null);
        if(!detail) {
            breakUpDetails.push({
                questionId: parentQuestion.questionId,
                question: parentQuestion.description,
                positiveResponses: response.answer ? 1 : 0,
                negativeResponses: response.answer ? 0 : 1
            })
        } else {
            response.answer ? detail.positiveResponses +=  1 : detail.negativeResponses += 1;
        }
    });

    return {
        overAllDetails,
        breakUpDetails
    }
}