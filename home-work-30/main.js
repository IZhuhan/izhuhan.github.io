/*
 * #1
 *
 * Написати функцію, яка приймає рядок як вхідний параметр і перевіряє,
 * чи є цей рядок валідною електронною адресою за допомогою регулярного виразу.
 * Функція повертає true, якщо електронна адреса валідна, і false в іншому випадку.
 *
 */

function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
}

console.log(isValidEmail('example@example.com')); // Повинно вивести: true
console.log(isValidEmail('invalid-email'));       // Повинно вивести: false

/*
 * #2
 *
 * Написати функцію, яка приймає рядок як вхідний параметр і перевіряє,
 * чи є цей рядок валідним URL веб-сайту за допомогою регулярного виразу.
 * Функція повертає true, якщо URL валідний, і false в іншому випадку.
 *
 */

function isValidUrl(url) {
  const urlPattern = /^(https?):\/\/([^:/]+)(?::(\d+))?([^?#]*)(\?[^#]*)?(#.*)?$/;
  return urlPattern.test(url);
}

console.log(isValidUrl('https://www.example.com')) // Повинно вивести: true
console.log(isValidUrl('invalid-url'))             // Повинно вивести: false