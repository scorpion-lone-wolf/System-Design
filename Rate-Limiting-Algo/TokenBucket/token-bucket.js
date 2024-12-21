"use strict";
class TokenBucket {
    constructor(capacity, fillRate) {
        this.bucketMaxCapacity = capacity;
        this.bucketFillRate = fillRate;
        this.tokenCount = capacity; // start with a full bucket
        this.lastTime = Date.now(); // Initialize the last time
    }
    allowRequest(tokens = 1) {
        // step 1 : Check how much time has passed since the last request
        const now = Date.now();
        const timePassedInSecond = (now - this.lastTime) / 1000;
        // step 2 : // Refill tokens based on the time passed
        this.tokenCount = Math.min(this.bucketMaxCapacity, this.tokenCount + (timePassedInSecond * this.bucketFillRate));
        this.lastTime = now;
        // check if enough tokenCount is available for the next request
        if (this.tokenCount >= tokens) {
            this.tokenCount -= tokens; // consume the token
            return true;
        }
        return false;
    }
}
const limiter = new TokenBucket(10, 1);
for (let i = 1; i <= 15; ++i) {
    setTimeout(() => {
        console.log(limiter.allowRequest()); // First 11 req will be allowed as each request will take 100 milliseconds => 100 * 10 = 1000 milliseconds(1sec)
    }, i * 100);
}
setTimeout(() => {
    setTimeout(() => {
        console.log(limiter.allowRequest(6));
    }, 5000);
}, 1500);
