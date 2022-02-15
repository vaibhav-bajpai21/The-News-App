module.exports = {
    value: {
        type: String,
        required: true,
        trim: true
    },
    meridiem: {
        type: String,
        required: true,
        trim: true,
        enum: ["AM", "PM"]
    }
}