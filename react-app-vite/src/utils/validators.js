export function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function validatePassword(password) {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return "Password must contain at least one special character.";
  if (!/\d/.test(password))
    return "Password must contain at least one number.";
  return null;
}
