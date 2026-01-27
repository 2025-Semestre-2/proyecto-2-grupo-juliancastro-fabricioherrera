/**
 * @param {string} type 
 * @param {string} value 
 * @returns {string} 
 */
export const validateId = (type, value) => {
  if (!value) return "";
  
  switch (type) {
    case "id":
      return /^\d{9}$/.test(value)
        ? ""
        : "La cédula debe tener 9 dígitos numéricos";
    case "dimex":
      return /^\d{11,12}$/.test(value)
        ? ""
        : "El DIMEX debe tener 11 o 12 dígitos";
    case "passport":
      return /^[a-zA-Z0-9]{6,9}$/.test(value)
        ? ""
        : "El pasaporte debe ser alfanumérico (6–9 caracteres)";
    default:
      return "";
  }
};

/**
 * Valida el formato de correo electrónico
 * @param {string} email - Correo electrónico a validar
 * @returns {string} Mensaje de error o string vacío si es válido
 */
export const validateEmail = (email) => {
  if (!email) return "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
    ? ""
    : "El correo debe tener el formato correo@dominio.extension";
};

/**
 * Valida que el teléfono solo contenga números
 * @param {string} phone - Número de teléfono a validar
 * @returns {string} Mensaje de error o string vacío si es válido
 */
export const validatePhone = (phone) => {
  if (!phone) return "";
  return /^\d+$/.test(phone)
    ? ""
    : "El teléfono solo debe contener números";
};

/**
 * Valida que la fecha de nacimiento sea anterior a la fecha actual
 * @param {string} date - Fecha a validar en formato YYYY-MM-DD
 * @returns {string} Mensaje de error o string vacío si es válido
 */
export const validateBirthdate = (date) => {
  if (!date) return "";
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate < today
    ? ""
    : "La fecha de nacimiento debe ser anterior a hoy";
};

/**
 * Valida que las contraseñas coincidan
 * @param {string} password - Contraseña
 * @param {string} confirmPassword - Confirmación de contraseña
 * @returns {string} Mensaje de error o string vacío si son válidas
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) return "";
  return password === confirmPassword
    ? ""
    : "Las contraseñas no coinciden";
};

/**
 * Valida la fortaleza de la contraseña
 * @param {string} password - Contraseña a validar
 * @returns {string} Mensaje de error o string vacío si es válida
 */
export const validatePasswordStrength = (password) => {
  if (!password) return "";
  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }
  return "";
};

export const validateURL = (url) => {
  if (!url) return "";
  const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  return urlRegex.test(url)
    ? ""
    : "Debe ser una URL válida (ej: https://ejemplo.com)";
};