export const newWindow = async () => {
  await chrome.windows.create({});
};

export const newIncognitoWindow = async () => {
  await chrome.windows.create({ incognito: true });
};
