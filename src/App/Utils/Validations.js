export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    const re = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/; //@@V4-\3Z`zTzM{>k
    return re.test(password);
}

export function validatePhoneNumber(num) {
    const re =  /^(\+\d{1,3}[- ]?)?\d{9}$/;
    return re.test(num);
}

export function validateFullName(name) {
    return  name.length > 2 
}

export function validateMultiSelect(name) {
    return  name.length > 0
}

export function isValid(value) {
    return !!value
}

export function isNumber(value){
    return !isNaN(value)
}

export function isSLPhoneNumber(value){
    let re = /^[0-9]\d{9}$/
    return re.test(value)
}


export function validateAll(){

} 