import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema ({
    questionId: {
        type: Schema.Types.Int32,
        required: true
    },
    surveyId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Survey"
    },
    description: {
        type: Schema.Types.String,
        required: true,
    }
});

const Question = mongoose.model("Question", questionSchema);

export default Question;