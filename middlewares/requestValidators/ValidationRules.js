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
            let values = val.split("-");
            if (values.length === 3) {
                val = new Date(values[2], values[1], values[0]);
                if (isNaN(Date.parse(val)))
                    return false;
                return true;
            }
            return false;
        },
        isValidTimeOfBirth: (val) => {
            let values = val.split(" ");
            let timeValues = values[0].split(":");
            if (["AM", "PM"].includes(values[1]) && (timeValues[0] >= 0 && timeValues[1] >= 0)
                && (timeValues[0] <= 12 && timeValues[1] <= 60)) {
                return true;
            }
            return false;
        },
        isValidPhoneNumber: (val) => {
            val = Number(val);
            if (isNaN(val) || val < 0)
                return false;
            return true;
        }
    }
}

module.exports = validationRules.custom;