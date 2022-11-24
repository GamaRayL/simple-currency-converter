export const getCurrencyData = async () => {
  const browserLang = window.navigator.language.substring(0, 2);
  const api = `https://restcountries.com/v3.1/alpha/${browserLang}`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data[0].currencies;
  } catch (error) {
    return error;
  }
};
