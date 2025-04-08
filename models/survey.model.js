import mongoose, { Schema } from "mongoose";

const surveySchema = new Schema({
    surveyName: {
        type: Schema.Types.String,
        required: true
    }
});

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;