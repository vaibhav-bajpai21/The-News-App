const { Schema } = require("mongoose");
const TimeOfBirthSchema = require("../sub_schemas/TimeOfBirthSchema");

//Username, Email, Password, Phone Number, Date of Birth, Time of Birth , Gender, Marital Status, Language and Profile picture
module.exports = (Schema) => {
    const userSchema = new Schema({
        userName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true
        },
        gender: {
            type: String,
            required: true,
            trim: true,
            enum: ["Male", "Female"]
        },
        language: {
            type: String,
            required: true,
            trim: true,
            enum: ["Hindi", "English"]
        },
        maritalStatus: {
            type: String,
            required: true,
            trim: true,
            enum: ["Unmarried", "Married", "Others"]
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        timeOfBirth: {
            type: TimeOfBirthSchema
        },
        profileImage: {
            data: Buffer,
            type: String,
            required: true,
            trim: true
        }
    },
        {
            timestamps: true
        });
    return {
        schema: userSchema,
        name: "userCollection"
    }
}