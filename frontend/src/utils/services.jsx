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
        console.log(json.data);
        setter(json.data);
    } catch(err) {
        console.log("Error in fetching questions", err);
    }
}