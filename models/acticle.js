const { Schema, model} = require('mongoose');

const articleSchema = new Schema(
    {
        title: {
            type: String,
            min: 5,
            max: 400,
            required: true,
            text: true,
            trim: true
        },
        subtitle: {
            type: String,
            min: 5,
            required: false,
            trim: true
        },
        description: {
            type: String,
            min: 5,
            max: 5000,
            required: true,
            trim: true
        },
        owner: {
            type: Schema.ObjectId,
            ref: "User"
        },
        category: {
            type: String,
            required: true,
            enum: ['sport','games', 'history'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true},

        updatedAt: {
            type: Date,
            default: Date.now,
            required: true},
    }
);

articleSchema.index({ title: 'text' })
articleSchema.virtual('writer', {
    ref: 'User',
    localField: 'owner', // Of post collection
    foreignField: '_id',    // Of user collection
})

module.exports = model('Article', articleSchema);
