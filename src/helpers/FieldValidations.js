export const required = value => (value ? undefined : 'Required');

export const maxLength = max => value =>
  value && value.length > max
    ? `Cannot be more than ${max} characters.`
    : undefined;
export const maxLength100 = maxLength(100);

export const minLength = min => value =>
  value && value.length < min
    ? `Must be at least ${min} characters.`
    : undefined;

export const min2NewlineDelim = value =>
  value && value.match(/^.+[\r\n].+/)
    ? undefined
    : `Must have at least 2 options separated by line breaks`;
