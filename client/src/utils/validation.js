const emailPattern =
  /^[a-z][a-z0-9._%+-]*@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function isValidEmail(value = '') {
  return emailPattern.test(value.trim());
}

