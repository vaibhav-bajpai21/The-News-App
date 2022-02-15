let validationRules = {
    custom: {
        isValidGender: (val) => {
            if (["Male", "Female"].includes(val))
                return true;
            return false;
        },
        isValidLangugae: (val) => {
            if (["Hindi", "English"].includes(val))
                return true;
            return false;
        },
        isValidMaritalStatus: (val) => {
            if (["Unmarried", "Married", "Others"].includes(val))
                return true;
            return false;
        },
        isValidDateOfBirth: (val) => {
            if (val.hasOwnProperty("day") && val.hasOwnProperty("month") && val.hasOwnProperty("year")) {
                val = new Date(val.day, val.month, val.year);
                if (isNaN(Date.parse(val)))
                    return false;
                return true;
            }
            return false;
        },
        isValidTimeOfBirth: (val) => {
            if (val.hasOwnProperty("value") && val.hasOwnProperty("meridiem") && ["AM","PM"].includes(val.meridiem)) {
                return true;
            }
            return false;
        }
    }
}

module.exports = validationRules.custom;