import { Router } from "express";
import mongodb from "mongodb";

import { formatSurveyQuestionsForCreation } from "../utils/format-survey-details.util.js";
import { formatSurveyResponses } from "../utils/format-survey-responses.util.js";
import { addNewSurvey, addSurveyResponses } from "../data-access/surveys.data-access.js";
import { addQuestionsForSurvey } from "../data-access/questions.data-access.js";
import { getSurveyResults } from "../utils/get-survey-results.util.js";

const ObjectId = mongodb.ObjectId;
const router = Router();

// add a new survey
router.post('/', async (req, res) => {
    try {
        const surveyName = req.body.surveyName;
        const questions = req.body.questions;

        if (!surveyName || questions?.length < 1) {
            res.status(400).send({
                success: false,
                message: "Ivalid request body",
                survey_id: null,
                surveyName: null,
                questions: null
            })
        }

        const { insertedId: surveyId } = await addNewSurvey(surveyName);

        const surveyQuestions = formatSurveyQuestionsForCreation(surveyId, questions);

        await addQuestionsForSurvey(surveyQuestions);

        res.status(201).send({
            survey_id : surveyId.toString(),
            surveyName,
            questions: surveyQuestions.map(question => {
                return {
                    questionId: question.questionId,
                    description: question.description
                }
            })
        });
    } catch(err) {
        console.log("Error occured while adding a new survey", err);
        res.status(500).send({
            success: false,
            message: "Error occured while adding a new survey",
            survey_id: null,
            surveyName: null,
            questions: null
        })
    }
});

// add survey responses
router.post('/:id', async (req, res) => {
    try {
        const surveyId = new ObjectId(req.params.id);
        const surveyResponses = req.body;

        const formattedResponses = await formatSurveyResponses(surveyId, surveyResponses);

        await addSurveyResponses(formattedResponses);
        res.status(201).send({
            success: true
        })
    } catch(err) {
        console.log("Error while adding survey responses", err);
        res.status(500).send({
            success: false,
            message: "Error while adding survey responses: " + err,
        })
    }
});

// get survey results
router.get('/:id/results', async (req, res) => {
    try {
        const surveyId = new ObjectId(req.params.id);
        const results = await getSurveyResults(surveyId);

        res.status(200).send(results);
    } catch(err) {
        console.log("Error while getting survey results", err);
        res.status(500).send({
            success: false,
            message: "Error while getting survey results: " + err,
        })
    }
});

export default router;