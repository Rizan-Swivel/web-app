export const dateFromTs = (ts) => {
    let date = new Date(ts);
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
}

export const dateFromDtString = (string) => {
    let ts = Date.parse(string)
    return dateFromTs(ts)
}

export const dateFromMs = (ms) => {
    let date = new Date(ms);
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
}

export function ucFirst(string) {
    if (string){
        let lCaseString = string.toString().toLowerCase()
        return lCaseString.charAt(0).toUpperCase() + lCaseString.slice(1);
    }else {
        return "";
    }


}