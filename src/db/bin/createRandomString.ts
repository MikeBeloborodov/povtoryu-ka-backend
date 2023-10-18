const randomSmallLetter = () => {
  return String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1) + 65));
};

const randomBigLetter = () => {
  return String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1) + 97));
};

const randomNumber = () => {
  return String.fromCharCode(Math.floor(Math.random() * (57 - 48 + 1) + 48));
};

export const randomString = () => {
  let result = "";
  for (let i = 0; i < 15; i++) {
    const coin = Math.floor(Math.random() * 3);
    if (coin % 2) {
      result += randomBigLetter();
    }
    if (coin % 3) {
      result += randomNumber();
    } else {
      result += randomSmallLetter();
    }
  }
  return result;
};
