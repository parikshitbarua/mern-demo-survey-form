import Question from "../models/question.model.js"

export const addQuestionsForSurvey = async (questions) => {
    try {
        return await Question.insertMany(questions);
    } catch(err) {
        console.log("Error inserting questions for survey.", err);
        return null;
    }
}

export const getSurveyQuestions = async (surveyId) => {
    try {
        return await Question
            .find({ surveyId: surveyId})
    } catch(err) {
        console.log("Failed to get Survey Questions", err);
        throw Error("Failed to get survey questions");
    }

}