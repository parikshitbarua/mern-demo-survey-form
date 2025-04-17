import mongoose, { Schema } from "mongoose";

const counterSchema = new mongoose.Schema({
    _id: String,
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const userSchema = new Schema({
    userId: {
        type: Schema.Types.Int32,
        unique: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    username: {
        type: Schema.Types.String,
        required: true
    }
});

userSchema.pre('save', async function (next) {
    const doc = this;

    if (doc.isNew && !doc.userId) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'userId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );

            doc.userId = counter.seq;
        } catch (err) {
            return next(err);
        }
    }

    // Manually ensure userId was set
    if (!doc.userId) {
        return next(new Error('Failed to assign userId'));
    }

    next();
});


const User = mongoose.model('User', userSchema);

export default User;