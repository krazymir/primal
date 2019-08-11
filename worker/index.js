const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

function primeCalc(index) {
    if (isNaN(index) || !Number.isInteger(index) || index < 1 || index > keys.maxIndex) return 0;
    let num = 3;
    let primes = [2];
    while(primes.length < index) {
        let numIsPrime = true;
        for(let i = 1; i < primes.length; i++){
            if (num / primes[i] < 3) {
                break;
            }
            if (num % primes[i] == 0) {
                numIsPrime = false;
                break;
            }
        }
        if (numIsPrime) primes.push(num);
        num = num + 2;
    }
    return primes[primes.length - 1];
}

sub.on('message', (channel, message) => {
    redisClient.hset('values', message, primeCalc(parseInt(message)));
});
sub.subscribe('insert');