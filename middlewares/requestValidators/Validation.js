const { checkSchema, validationResult } = require("express-validator");
const validationRules = require("./ValidationRules");

var rejectIfInvalid = (req, res, next) => {
    let err = validationResult(req).array();
    if (err.length) {
        let errors = [];
        err.forEach(error => {
            errors.push(error.msg);
        });
        let responseObject = {
            status: "Error",
            message: errors
        }
        res.send(responseObject);
    }
    return next();
}

const createUserValidate = checkSchema({
    "user_name": {
        trim: true,
        notEmpty: true,
        errorMessage: "User_name is Mandatory"
    },
    "email": {
        trim: true,
        notEmpty: true,
        errorMessage: "email is Mandatory",
        isEmail: {
            bail: true,
            errorMessage: "Please enter a valid email"
        },
    },
    "password": {
        trim: true,
        notEmpty: true,
        errorMessage: "password is Mandatory",
        isLength: {
            errorMessage: 'Password should be at least 8 chars long',
            options: { min: 8 },
        },
    },
    "phone_number": {
        trim: true,
        notEmpty: true,
        errorMessage: "phone_number is Mandatory",
        custom: {
            options: validationRules.isValidPhoneNumber,
            errorMessage: "phone_number should be a valid number",
        },
    },
    "gender": {
        trim: true,
        notEmpty: true,
        errorMessage: "gender is Mandatory",
        custom: {
            options: validationRules.isValidGender,
            errorMessage: "gender should be either Male or Female"
        }
    },
    "language": {
        trim: true,
        notEmpty: true,
        errorMessage: "language is Mandatory",
        custom: {
            options: validationRules.isValidLangugae,
            errorMessage: "language should be either Hindi or English"
        }
    },
    "marital_status": {
        trim: true,
        notEmpty: true,
        errorMessage: "marital_status is Mandatory",
        custom: {
            options: validationRules.isValidMaritalStatus,
            errorMessage: "marital_status can be any of the following values:  Unmarried, Married, Others"
        }
    },
    "date_of_birth": {
        notEmpty: true,
        errorMessage: "date_of_birth is Mandatory",
        custom: {
            options: validationRules.isValidDateOfBirth,
            errorMessage: "date_of_birth should be a valid date of the format: DD-MM-YYYY"
        }
    },
    "time_of_birth": {
        notEmpty: true,
        errorMessage: "time_of_birth is Mandatory",
        custom: {
            options: validationRules.isValidTimeOfBirth,
            errorMessage: "time_of_birth should be a string of the format: xx:xx AM/PM"
        }
    }
});

const createArticleValidate = checkSchema({
    "headline": {
        trim: true,
        notEmpty: true,
        errorMessage: "headline is Mandatory"
    },
    "category": {
        trim: true,
        notEmpty: true,
        errorMessage: "category is Mandatory"
    },
    "author_name": {
        trim: true,
        notEmpty: true,
        errorMessage: "author_name is Mandatory"
    }
})

module.exports = {
    createUserValidate,
    createArticleValidate,
    rejectIfInvalid
}