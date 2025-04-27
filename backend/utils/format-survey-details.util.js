import logger from "../log/logManger.js";

export const formatSurveyQuestionsForCreation = (surveyId, questions) => {
    logger.debug("format-survey-details.util.js :: formatSurveyQuestionsForCreation :: surveyId" + surveyId, { userId: 49, route: "/v1/survey" });
    return questions.map((question, index) => {
        return {
            surveyId,
            questionId: index + 1,
            ...question
        }
    });

}