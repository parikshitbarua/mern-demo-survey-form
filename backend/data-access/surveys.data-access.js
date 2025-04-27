import Survey from "../models/survey.model.js";
import Response from "../models/response.model.js";
import logger from "../log/logManger.js";

export const addNewSurvey = async (surveyName, description) => {
    try {
        logger.debug("surveys.data-access.js :: addNewSurvey :: surveyName" + surveyName, { userId: 49, route: "/v1/survey" });
        const newSurvey = new Survey({
            surveyName,
            description
        });
        return await newSurvey.save();
    } catch(err) {
        logger.error("surveys.data-access.js :: addNewSurvey :: Error adding a new survey, surveyName: " + surveyName,
            { userId: 49, route: "/v1/survey", errorCode: 500, stack: err.stack }
        );
        return null;
    }
}

export const getAllSurveys = async () => {
    try {
        return await Survey
            .find();
    } catch(err) {
        console.log("Failed to fetch all surveys");
        throw Error("Failed to fetch all surveys" + err);
    }

}

export const getSurvey = async (surveyId) => {
    try {
        return await Survey
            .findOne({ _id: surveyId });
    } catch(err) {
        console.log("Failed to get survey details");
        throw Error("Failed to get survey details" + err);
    }

}

export const addSurveyResponses = async (responses) => {
    logger.debug("surveys.data-access.js :: addSurveyResponses", { userId: 49, route: "/v1/survey" });
    try {
        return await Response
            .insertMany(responses);
    } catch(err) {
        logger.error("surveys.data-access.js :: addSurveyResponses :: Error adding responses",
            { userId: 49, route: "/v1/survey/:id", errorCode: 500, stack: err.stack }
        );
        throw new Error("Failed to add survey reponses" + err);
    }
}