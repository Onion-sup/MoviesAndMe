
export function isIDInArray(array, id){
    for(var i=0; i<array.length; i++){
        if (array[i].id === id){
            return true;
        }
    }
    return false;
}