
export const GenerateLoadingItems = (count) => {
    let array = [];
    for(let i = 0; i<count; i++){
        array.push({isLoading: true});
    }
    return array;
}