export function isValidSubmission(
  requiredValues: string[],
  setError: (value: boolean) => void
): boolean {
  const isValid = requiredValues.reduce((check, value) => {
    return check === false ? check : value !== '';
  }, true);

  setError(!isValid);
  return isValid;
}
