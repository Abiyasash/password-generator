const lowercaseCharsCheckbox = document.getElementById("lowercaseCharsCheckbox");
const uppercaseCharsCheckbox = document.getElementById("uppercaseCharsCheckbox");
const numbersCheckbox = document.getElementById("numbersCheckbox");
const symbolsCheckbox = document.getElementById("symbolsCheckbox");

const passwordLengthInput = document.getElementById("passwordLengthInput");
const excludeCharsInput = document.getElementById("excludeCharsInput");

const generatePasswordBtn = document.getElementById("generatePasswordBtn");
const resetBtn = document.getElementById("resetBtn");

resetContent();

generatePasswordBtn.onclick = () => {
  const passwordLength = Number(document.getElementById("passwordLengthInput").value);
  const includeLowercase = document.getElementById("lowercaseCharsCheckbox").checked;
  const includeUppercase = document.getElementById("uppercaseCharsCheckbox").checked;
  const includeNumbers = document.getElementById("numbersCheckbox").checked;
  const includeSymbols = document.getElementById("symbolsCheckbox").checked;

  generatePassword(passwordLength,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols);
};

resetBtn.onclick = () => {
  resetContent();
}

function generatePassword(length,
  includeLowercase,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^*&';
  let excludedChars = document.getElementById("excludeCharsInput").value;
  const excludedCharsArr = Array.from(excludedChars);

  let allowedChars = '';
  let password = '';

  allowedChars += includeLowercase ? lowercaseChars : '';
  allowedChars += includeUppercase ? uppercaseChars : '';
  allowedChars += includeNumbers ? numbers : '';
  allowedChars += includeSymbols ? symbols : '';

  excludedCharsArr.forEach(value => {
    allowedChars = allowedChars.replaceAll(value, '');
  });

  if (!allowedChars) {
    document.getElementById("generatedPassword")
      .textContent = `You need to allow some characters.`;
    return;
  }
  else if (Math.floor(length) !== length || length <= 0) {
    document.getElementById("generatedPassword")
      .textContent = `Invalid password length.`;
    return;
  }
  else if (length < 4) {
    document.getElementById("generatedPassword")
      .textContent = `Password length is too small.`;
    return;
  }
  else if (length > 20) {
    document.getElementById("generatedPassword")
      .textContent = `Password length is too large.`;
    return;
  }


  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  const passwordHTML = `Generated Password: <span id="passwordSpan">${password}</span>`;

  document.getElementById("generatedPassword").innerHTML = passwordHTML;
}

function resetContent() {
  lowercaseCharsCheckbox.checked = true;
  uppercaseCharsCheckbox.checked = true;
  numbersCheckbox.checked = true;
  symbolsCheckbox.checked = true;

  passwordLengthInput.value = '8';
  excludeCharsInput.value = '';

  document.getElementById("generatedPassword").textContent = '';
}
