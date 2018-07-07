module.exports = (arr) => {
    arr.sort((a,b)=>{
        return a-b;
    })

    return { primerValor: arr[0] }
}