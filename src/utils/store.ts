export function deepMerge(target: any, source: any) {
  if (Array.isArray(target) && Array.isArray(source)) {
    const newTarget = [...target];
    for (const key in source) {
      if (typeof source[key] === "object") {
        newTarget[key] = deepMerge(newTarget[key] || {}, source[key]);
      } else {
        newTarget[key] = source[key] ?? newTarget[key];
      }
    }
  } else if (isObject(target) && isObject(source)) {
    const newTarget = { ...target };
    for (const key in source) {
      if (isObject(source[key])) {
        newTarget[key] = deepMerge(newTarget[key] || {}, source[key]);
      } else {
        newTarget[key] = source[key] ?? newTarget[key];
      }
    }
    return newTarget;
  }
  return undefined;
}

export function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export const isObjectEmpty = (obj: any) => Object.keys(obj).length === 0;

export function throttle(callback: any, wait = 0) {
  let throttleTimer: any;
  let triggerArgs: any;
  let triggerThis: any;
  function trigger() {
    triggerArgs = arguments;
    // @ts-expect-error
    triggerThis = this;
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
      callback.apply(triggerThis, triggerArgs);
      throttleTimer = false;
    }, wait);
  }

  trigger.cancel = () => {
    clearTimeout(throttleTimer);
  };
  trigger.flush = () => {
    clearTimeout(throttleTimer);
    callback.apply(triggerThis, triggerArgs);
  };

  return trigger;
}
