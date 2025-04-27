import Question from "../models/question.model.js"
import logger from "../log/logManger.js";

export const addQuestionsForSurvey = async (questions) => {
    logger.debug("questions.data-access.js :: addQuestionsForSurvey", { userId: 49, route: "/v1/survey" });
    try {
        return await Question.insertMany(questions);
    } catch(err) {
        logger.error("questions.data-access.js :: addQuestionsForSurvey :: Error adding questions for survey:",
            { userId: 49, route: "/v1/survey", errorCode: 500, stack: err.stack }
        );
        return null;
    }
}

export const getSurveyQuestions = async (surveyId) => {
    logger.debug("questions.data-access.js :: getSurveyQuestions", { userId: 49, route: "/v1/survey/:id" });
    try {
        return await Question
            .find({ surveyId: surveyId})
    } catch(err) {
        logger.error("questions.data-access.js :: getSurveyQuestions :: Error fetching question for surveyId: " + surveyId,
            { userId: 49, route: "/v1/survey/:id", errorCode: 500, stack: err.stack }
        );
        throw Error("Failed to get survey questions");
    }

}