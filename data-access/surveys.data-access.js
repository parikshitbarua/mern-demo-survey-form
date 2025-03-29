import getDb from "../connections/db.connection.js";

export const addNewSurvey = async (surveyName) => {
    const db = getDb();
    return await db
        .db()
        .collection('surveys')
        .insertOne({ surveyName });
}

export const getSurvey = async (surveyId) => {
    const db = getDb();
    return await db
        .db()
        .collection('surveys')
        .findOne({ _id: surveyId });
}

export const addSurveyResponses = async (responses) => {
    const db = getDb();
    return await db
        .db()
        .collection('responses')
        .insertMany(responses);
}