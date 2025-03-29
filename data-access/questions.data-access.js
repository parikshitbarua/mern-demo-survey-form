import getDb from "../connections/db.connection.js";

export const addQuestionsForSurvey = async (questions) => {
    const db = getDb();
    return await db
        .db()
        .collection('questions')
        .insertMany(questions);
}

export const getSurveyQuestions = async (surveyId) => {
    const db = getDb();
    return await db
        .db()
        .collection('questions')
        .find({ surveyId: surveyId})
        .toArray();
}