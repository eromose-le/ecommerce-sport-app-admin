export function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function isPlainObject(value: any) {
  return value?.constructor === Object;
}

export const isObjectEmpty = (obj: any) => Object.keys(obj).length === 0;

export function deepMerge(target: any, source: any) {
  if (Array.isArray(target) && Array.isArray(source)) {
    const newTarget = [...target];
    for (const key in source) {
      if (typeof source[key] === "object") {
        newTarget[key] = deepMerge(newTarget[key] || {}, source[key]);
      } else {
        newTarget[key] = source[key] || newTarget[key];
      }
    }
  } else if (isObject(target) && isObject(source)) {
    const newTarget = { ...target };
    for (const key in source) {
      if (isObject(source[key])) {
        newTarget[key] = deepMerge(newTarget[key] || {}, source[key]);
      } else {
        newTarget[key] = source[key] || newTarget[key];
      }
    }
    return newTarget;
  }
  return undefined;
}

function is(x: any, y: any) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    /* eslint-disable no-self-compare */
    return x !== x && y !== y;
  }
}

export function shallowEqual(objA: any, objB: any) {
  if (is(objA, objB)) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}

/**
 * @template {{}} T
 * @param {T} obj
 * @param {string} desc
 */
export function objectAccessor(obj: any, desc: any) {
  const arr = desc ? desc.split(".") : [];
  let result = obj;
  while (arr.length && (result = result?.[arr.shift()]));
  return result;
}

/**
 * @template {{}} T
 * @param {T} values
 * @param {{allowEmptyArray: boolean}} options
 * @returns
 */
export function removeEmptyProperties(
  values: any,
  options: { allowEmptyArray?: boolean } = {}
) {
  const { allowEmptyArray } = options;
  const newTarget = Array.isArray(values) ? [] : isObject(values) ? {} : values;

  if (typeof newTarget === "object") {
    for (const key in values) {
      const value = values[key];
      if (
        (Array.isArray(value) && (allowEmptyArray || value.length)) ||
        (isObject(value) && Object.entries(value).length !== 0)
      ) {
        newTarget[key] =
          value instanceof File ? value : removeEmptyProperties(value);
      } else if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !Array.isArray(value) &&
        !isObject(value)
      ) {
        newTarget[key] = removeEmptyProperties(value);
      }
    }
  }
  return newTarget;
}

export function objectToFormData(data: any) {
  const fd = new FormData();
  for (const key in data) {
    if (Array.isArray(data[key])) {
      for (const arrData of data[key]) {
        fd.append(key, arrData);
      }
    } else {
      fd.set(key, data[key]);
    }
  }
  return fd;
}

export function normalizeArray(
  array: any[],
  options: {
    getKey?: (arg: any) => string;
    getValue?: (arg1: any, arg2: any) => any;
  } = {}
) {
  const { getKey = ({ id }) => id, getValue = (value) => value } = options;
  return array?.reduce((acc, curr) => {
    const key = getKey(curr);
    acc[key] = getValue(curr, acc[key]);
    return acc;
  }, {});
}

export function objectToArray(obj: object | null | undefined): any[] {
  return obj ? Object.entries(obj) : [];
}

interface keyValueItem {
  key: string;
  value: string;
}

export const formatKeyValuePair = (arrayOfKeyValue: keyValueItem[] = []) => {
  if (!Array.isArray(arrayOfKeyValue) || arrayOfKeyValue.length === 0) {
    // If the array is empty or undefined, return an empty array
    return [];
  }

  try {
    return arrayOfKeyValue
      .map((keyValue) => {
        if (keyValue?.key && keyValue?.value) {
          return {
            [keyValue.key]: keyValue.value,
          };
        }
        // If key or value is missing, we return null or handle as needed
        return null;
      })
      .filter((item) => item !== null); // Filter out null entries
  } catch (error) {
    console.error("Error formatting key-value pair:", error);
    return [];
  }
};