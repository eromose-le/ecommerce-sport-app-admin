import { objectAccessor } from "./ObjectUtils";

export function getTextFieldFormikHelperText(formik: any, key: any, helperText: any) {
  return !!objectAccessor(formik.touched, key) &&
    objectAccessor(formik.errors, key)
    ? objectAccessor(formik.errors, key)
    : helperText;
}

export function getTextFieldFormikError(formik: any, key: any) {
  return (
    !!objectAccessor(formik.touched, key) &&
    !!objectAccessor(formik.errors, key)
  );
}

/**
 *
 * @param {*} formik
 * @param {*} key
 * @returns
 */
export function getTextFieldFormikHelperTextAndErrorProps(
  formik: any,
  key: string,
  helperText?: any
) {
  return {
    error: getTextFieldFormikError(formik, key),
    helperText: getTextFieldFormikHelperText(formik, key, helperText),
  };
}

/**
 *
 * @param {*} formik
 * @param {*} key
 * @returns
 */
export function getTextFieldFormikProps(formik: any, key: string, helperText?: any) {
  return {
    ...formik.getFieldProps(key),
    ...getTextFieldFormikHelperTextAndErrorProps(formik, key, helperText),
  };
}

export function getCheckFieldFormikProps(
  formik: any,
  key: any,
  checkedValue = true
  // unCheckedValue = false
) {
  const textFieldProps = getTextFieldFormikProps(formik, key);

  const value =
    typeof checkedValue === "boolean"
      ? !!textFieldProps.value
      : textFieldProps.value;
  return {
    ...textFieldProps,
    value: value,
    checked: value === checkedValue,
  };
  // return {
  //   checked: !!formik.values[key],
  //   onChange: (e) => formik.setFieldValue(key, e.target.checked),
  // };
}
