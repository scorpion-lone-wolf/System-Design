class FixedWindowCounter {
  private windowSize: number; // size of each window in seconds
  private maxRequest; // maximum request that can be processed in a single window
  private prevWindow; // prev window time in second
  private requestCount; // number of requests in current window

  constructor(windowSize: number, maxRequest: number) {
    this.windowSize = windowSize;
    this.maxRequest = maxRequest;
    this.prevWindow = Math.floor((Date.now() / 1000) / windowSize);
    this.requestCount = 0;
  }

  public allowedRequest(): boolean {
    const runningWindow = Math.floor((Date.now() / 1000) / this.windowSize);

    if (runningWindow != this.prevWindow) {
      this.prevWindow = runningWindow;
      this.requestCount = 0;
    }

    if (this.requestCount < this.maxRequest) {
      this.requestCount++;
      return true;
    }
    return false;
  }
}
