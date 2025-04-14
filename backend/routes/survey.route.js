import { Router } from "express";
import mongoose from "mongoose";

import { formatSurveyQuestionsForCreation } from "../utils/format-survey-details.util.js";
import { formatSurveyResponses } from "../utils/format-survey-responses.util.js";
import { addNewSurvey, addSurveyResponses, getAllSurveys } from "../data-access/surveys.data-access.js";
import {addQuestionsForSurvey, getSurveyQuestions} from "../data-access/questions.data-access.js";
import { getSurveyResults } from "../utils/get-survey-results.util.js";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send({
        message: "Hello"
    })
})

// add a new survey
router.post('/', async (req, res) => {
    try {
        const surveyName = req.body.surveyName;
        const description = req.body.surveyDescription;
        const questions = req.body.questions;

        if (!surveyName || questions?.length < 1) {
            res.status(400).send({
                success: false,
                message: "Invalid request body",
                survey_id: null,
                surveyName: null,
                questions: null
            })
        }

        const { _id: surveyId } = await addNewSurvey(surveyName, description);

        if (surveyId == null) {
            res.status(500).send({
                success: false,
                message: "Error occured while adding a new survey",
                survey_id: null,
                surveyName: null,
                questions: null
            });
        }

        const surveyQuestions = formatSurveyQuestionsForCreation(surveyId, questions);

        const addQuestionsRes = await addQuestionsForSurvey(surveyQuestions);

        if (addQuestionsRes == null) {
            res.status(500).send({
                success: false,
                message: "Error occured while adding a new survey",
                survey_id: null,
                surveyName: null,
                questions: null
            });
        }

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
        const surveyId = new mongoose.Types.ObjectId(req.params.id.substring(1));
        const surveyResponses = req.body;

        const formattedResponses = await formatSurveyResponses(surveyId, surveyResponses);

        await addSurveyResponses(formattedResponses);
        res.status(201).send({
            success: true
        })
    } catch(err) {
        res.status(500).send({
            success: false,
            message: "Error while adding survey responses: " + err,
        })
    }
});

// get survey results
router.get('/:id/results', async (req, res) => {
    try {
        const surveyId = new mongoose.Types.ObjectId(req.params.id.substring(1));
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

// get all surveys
router.get('/getSurveys', async (req, res) => {
    try {
        const allSurveys =  await getAllSurveys();
        res.status(200).send({
            data: allSurveys
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error while getting survey results: " + err,
        })
    }
})

//get survey questions
router.get('/getSurveyQuestions/:id', async (req, res) => {
    try {
        const surveyId = new mongoose.Types.ObjectId(req.params.id.substring(1));
        const surveyQuestions = await getSurveyQuestions(surveyId);
        res.status(200).send({
            data: surveyQuestions
        })
    } catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error while getting survey results: " + err,
        })
    }
})

export default router;