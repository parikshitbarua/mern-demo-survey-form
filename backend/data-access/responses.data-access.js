import Response from "../models/response.model.js";

export const getResponsesForSurvey = async (surveyId) => {
    try {
        return await Response
            .find({ surveyId: surveyId })
    } catch(err) {
        console.log("Failed to get responses for the survey", err);
        throw Error("Failed to get responses for the survey" + err);
    }

}