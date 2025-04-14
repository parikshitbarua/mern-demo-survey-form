import { API_URL } from "./constants";

export const fetchCardDetails = async (setter) => {
    try {
        const res = await fetch(`${API_URL}/getSurveys`);
        const json = await res.json();
        setter(json.data);
    } catch(err) {
        console.log("Error fetching details", err);
    }
}

export const fetchSurveyQuestions = async (surveyId, setter) => {
    try {
        const res =  await fetch(`${API_URL}/getSurveyQuestions/${surveyId}`);
        const json = await res.json();
        setter(json.data);
    } catch(err) {
        console.log("Error in fetching questions", err);
    }
}

export const addNewSurveyService = async (payload) => {
    try {
        const res = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const json = await res.json();
        return json.survey_id;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const submitSurvey = async(surveyId, payload) => {
    const res = await fetch(`${API_URL}/${surveyId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!data?.success) {
        throw Error(data?.message)
    }
}