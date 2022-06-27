function uniqueArr(array) {
    let unique = [
        ...new Map(array.map((item)=>[item["id"],item])).values(),
    ]
    return unique;
}

export {uniqueArr};
