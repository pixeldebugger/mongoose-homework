const {Schema, model} = require('mongoose');


const userSchema = new Schema(
    {
        firstName: {
            type: String,
            min: 4,
            max: 50,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            min: 3,
            max: 60,
            required: true,
            trim: true
        },
        role: {
            type: String,
            enum: ['GUEST','WRITER', 'ADMIN'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        numberOfArticles: {
            type: Number,
            required: false,
            default: 0,
            trim: true
        },
        nickname: {
            type: String,
            required: false,
            trim: true
        }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

userSchema.virtual('articles', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'owner',
})

module.exports = model('User', userSchema);
