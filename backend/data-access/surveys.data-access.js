import Survey from "../models/survey.model.js";
import Response from "../models/response.model.js";

export const addNewSurvey = async (surveyName, description) => {
    try {
        const newSurvey = new Survey({
            surveyName,
            description
        });
        return await newSurvey.save();
    } catch(err) {
        console.log("Error creating a new survey.", err);
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
    try {
        return await Response
            .insertMany(responses);
    } catch(err) {
        console.log("Failed to add survey reponses", err);
        throw new Error("Failed to add survey reponses" + err);
    }
}