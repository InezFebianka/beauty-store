function formatedPrice(price){
    let toarr = price.toString().split('')
    let output = 'Rp '
    if (toarr.length < 4){
        output += toarr.join('')
        output += ',00'
    } else {
        let temp = []
        
        if(toarr.length % 3 === 0){
            for (let i=1; i<=toarr.length; i++){
                if(i % 3 === 0 && i !==toarr.length){
                    temp.push(toarr[i-1]+'.')
                } else {
                    temp.push(toarr[i-1])
                }
            }
        } else if (toarr.length % 3 === 1){
            for (let i=1; i<=toarr.length; i++){
                if(i % 3 === 1 && i !==toarr.length){
                    temp.push(toarr[i-1]+'.')
                } else {
                    temp.push(toarr[i-1])
                }
            }
        } else {
            for (let i=1; i<=toarr.length; i++){
                if(i % 3 === 2 && i !==toarr.length){
                    temp.push(toarr[i-1]+'.')
                } else {
                    temp.push(toarr[i-1])
                }
            }
        }
        output += temp.join('')
        output += ',00'
    }
    return output
}

module.exports = formatedPrice