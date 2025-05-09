import { getSurveyQuestions } from "../data-access/questions.data-access.js";
import { v4 as uuidv4 } from 'uuid';
import logger from "../log/logManger.js";

export const formatSurveyResponses = async (surveyId, responses) => {
    const surveyResponseId = uuidv4();
    const surveyQuestions = await getSurveyQuestions(surveyId);
    logger.debug("format-survey-responses.util.js :: formatSurveyResponses : Formatting survey response", { userId: 49, route: "/v1/survey/:id" });

    if (surveyQuestions.length === 0) {
        throw Error("No questions found for the given survey");
    }

    if (surveyQuestions.length < responses.length) {
        throw Error("Too may responses for the given survey");
    }

    return responses.map((response) => {
        const { _id: parentQuestionId } = surveyQuestions.find(question => {
            return question.questionId === response.questionId;
        });
        if ( parentQuestionId == null ) {
            throw Error(`Invalid response, no question found for survey with ${response.questionId}`);
        }
        return {
            surveyResponseId,
            surveyId,
            parentQuestionId,
            ...response
        }
    });
}