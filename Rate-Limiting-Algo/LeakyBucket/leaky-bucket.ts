class LeakyBucket {
  private bucketCapacity: number; // Maximum capacity the bucket can hold
  private leakRate: number; // Rate at which request leaked (requests/sec)
  private lastLeak: number; // Last time we leaked from the bucket (in milliseconds)
  private bucket: number[];// Array to hold request timestamp

  constructor(bucketCapacity: number, leakRate: number) {
    this.bucketCapacity = bucketCapacity;
    this.leakRate = leakRate;
    this.lastLeak = Date.now();
    this.bucket = [];
  }

  public allowRequest():boolean{

    const now = Date.now();

    //  calculate the time elapsed since the last requests
    const leakTime = Math.floor((now - this.lastLeak)/1000); // Convert to seconds

    const leaked = leakTime*this.leakRate; // calculate leaked requests

    if(leaked>0){
      // Remove the leaked requests from the bucket
      this.bucket.splice(0,Math.min(this.bucket.length , leaked));
      this.lastLeak = now;
    }

    // Check if the bucket has capacity for a new request
    if(this.bucket.length < this.bucketCapacity){
      this.bucket.push(now); // Add the new request
      return true; // Request is allowed
    }
    return false;
  }
}
