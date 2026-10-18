function isPrime(num){

    let primeCount = 0;
    if (num > 1){
        for (let factors = 1; factors <= num; factors++){
            if (num % factors === 0){
                primeCount+=1
            }
        }
    }
    return primeCount === 2;
}

module.exports = {
    isPrime,
}
