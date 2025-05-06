export const IsRequiredValidationFailed = (value) => {
    return !value ? true : false
};

export const IsRequiredDateValidationFailed = (value) => {
    if(!value?.year || value?.year === "YYYY"){
        return true;
    }
    if(!value?.month || value?.month === "MM"){
        return true;
    }
    if(!value?.day || value?.day === "DD"){
        return true;
    }
    return false;
}
export const IsRequiredTimeValidationFailed = (value) => {
    if(!value?.hour || value?.hour === "HH"){
        return true;
    }
    if(!value?.minute || value?.minute === "MM"){
        return true;
    }
    return false;
}

export const IsFileSizeValidationFailed = (value, requiredFileSize) => {
    if(value.size <= requiredFileSize){
        return false;
    }
    return true;
}

export const IsFileTypeValidation = (value, type) => {
    const types = type.split(",")
    return types.includes(value?.type)
}