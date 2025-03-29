import getDb from "../connections/db.connection.js";

export const getResponsesForSurvey = async (surveyId) => {
    console.log("surveyId", surveyId);
    const db = getDb();
    return await db
        .db()
        .collection('responses')
        .find({ surveyId: surveyId })
        .toArray();
}