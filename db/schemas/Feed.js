const { Schema } = require("mongoose");

module.exports = (Schema) => {
    const feedSchema = new Schema({
        thumbnailImage: {
            data: Buffer,
            type: String,
            required: true,
            trim: true
        },
        headline: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        authorName: {
            type: String,
            required: true,
            trim: true
        }
    },
        {
            timestamps: true
        });
    return {
        schema: feedSchema,
        name: "feedCollection"
    }
}