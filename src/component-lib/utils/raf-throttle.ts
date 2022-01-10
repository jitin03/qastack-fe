function rafThrottle<T extends (...args: any[]) => void>(fn: T): (...args: Parameters<T>) => void {
  let requestId: number | null;

  const throttled = (...args: Parameters<T>): void => {
    if (!requestId) {
      requestId = requestAnimationFrame(() => {
        requestId = null;
        fn(...args);
      });
    }
  };

  return throttled;
}

export default rafThrottle;
