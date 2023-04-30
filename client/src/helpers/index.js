export function capitalizeFirstLetter(text) {

    // converting first letter to uppercase
    const capitalized = text.charAt(0).toUpperCase() + text.slice(1);

    return capitalized;
}

export function convertStatisticsNameToUri(name) {
    let splitedArray = name.split(" ");
    let uri = splitedArray[0];
    
    if (splitedArray.length > 1)
        uri = `${splitedArray[1]}?status=${splitedArray[0]}`;
    
    return uri;
}