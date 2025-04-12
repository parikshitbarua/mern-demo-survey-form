export const formatSurveyQuestionsForCreation = (surveyId, questions) => {
    return questions.map((question, index) => {
        return {
            surveyId,
            questionId: index + 1,
            ...question
        }
    });

}