import { Router } from "express";
import mongoose from "mongoose";

import { formatSurveyQuestionsForCreation } from "../utils/format-survey-details.util.js";
import { formatSurveyResponses } from "../utils/format-survey-responses.util.js";
import { addNewSurvey, addSurveyResponses, getAllSurveys } from "../data-access/surveys.data-access.js";
import { addQuestionsForSurvey, getSurveyQuestions } from "../data-access/questions.data-access.js";
import { getSurveyResults } from "../utils/get-survey-results.util.js";
import { validateTokenMiddleware } from "../utils/middleware/auth.middleware.js";
import logger from "../log/logManger.js";

const router = Router();

router.get('/', validateTokenMiddleware, (req, res) => {
    res.status(200).send({
        message: "Hello, welcome to the EZSurvey API"
    });
});

// add a new survey
router.post('/', async (req, res) => {
    try {
        const surveyName = req.body.surveyName;
        const description = req.body.surveyDescription;
        const questions = req.body.questions;
        logger.info("survey.route.js : Adding a new survey: " + surveyName, { userId: 49, route: "/v1/survey" });

        if (!surveyName || questions?.length < 1) {
            logger.info("Invalid request:", { userId: 49, route: "/v1/survey" });
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
        logger.info("survey.route.js :: survey added : surveyId: " + surveyId, { userId: 49, route: "/v1/survey" });
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
        logger.error("survey.route.js :: Error adding a survey, surveyName",
            { userId: 49, route: "/v1/survey", errorCode: 500, stack: err.stack }
        );
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
    const surveyId = new mongoose.Types.ObjectId(req.params.id.substring(1));
    try {
        logger.info("survey.route.js :: Adding a new response for surveyId: " + surveyId, { userId: 49, route: "/v1/survey/:id" });
        const surveyResponses = req.body;

        const formattedResponses = await formatSurveyResponses(surveyId, surveyResponses);

        await addSurveyResponses(formattedResponses);
        res.status(201).send({
            success: true
        })
    } catch(err) {
        logger.error("survey.route.js :: Error adding survey responses for surveyId: " + surveyId,
            { userId: 49, route: "/v1/survey/:id", errorCode: 500, stack: err.stack }
        );
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
        logger.info("survey.route.js :: Getting survey results for SurveyID: " + req.params.id.substring(1), { userId: 49, route: "/v1/survey/:id/results" });
        const results = await getSurveyResults(surveyId);
        logger.info("survey.route.js :: Results fetched successfully for SurveyID: " + req.params.id.substring(1), { userId: 49, route: "/v1/survey/:id/results" });
        res.status(200).send(results);
    } catch(err) {
        logger.error("survey.route.js :: Error fetching survey results for SurveyID: " + req.params.id.substring(1),
            { userId: 49, route: "/v1/survey/:id/results", errorCode: 500, stack: err.stack }
        );
        res.status(500).send({
            success: false,
            message: "Error while getting survey results: " + err,
        })
    }
});

// get all surveys
router.get('/getSurveys', async (req, res) => {
    try {
        logger.info("survey.route.js :: Getting all surveys", { userId: 49, route: "/v1/survey/getSurveys"});
        const allSurveys =  await getAllSurveys();
        res.status(200).send({
            data: allSurveys
        });
    } catch (err) {
        logger.error("survey.route.js :: Error fetching surveys",
            { userId: 49, route: "/v1/survey/getSurveys", errorCode: 500, stack: err.stack }
        );
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
        logger.info("survey.route.js :: Getting survey questions for surveyId: " + surveyId, { userId: 49, route: "/v1/survey/getSurveyQuestions/:id"});
        const surveyQuestions = await getSurveyQuestions(surveyId);
        res.status(200).send({
            data: surveyQuestions
        })
    } catch(err) {
        logger.error("survey.route.js :: Error fetching surveys questions",
            { userId: 49, route: "/v1/survey/getSurveyQuestions/:id", errorCode: 500, stack: err.stack }
        );
        res.status(500).send({
            success: false,
            message: "Error while getting survey results: " + err,
        })
    }
})

export default router;