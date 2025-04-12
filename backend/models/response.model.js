import mongoose, { Schema } from "mongoose";

const responseSchema = new Schema({
    surveyResponseId: {
        type: Schema.Types.UUID,
        required: true
    },
    surveyId: {
        type: Schema.Types.ObjectId,
        ref: "Survey",
        required: true
    },
    parentQuestionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },
    questionId: {
        type: Schema.Types.Int32,
        required: true
    },
    answer: {
        type: Schema.Types.Boolean,
        required: true
    }
});

const Response = mongoose.model("Response", responseSchema);

export default Response;