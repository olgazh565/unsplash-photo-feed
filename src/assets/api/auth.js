import {
  SCOPE,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  RESPONSE_TYPE,
  URL_AUTH_START,
  URL_AUTH_TOKEN,
} from './const';

// Первоначальный URL для получения кода
const searchParams = new URLSearchParams('');

searchParams.append('client_id', CLIENT_ID);
searchParams.append('response_type', RESPONSE_TYPE);
searchParams.append('redirect_uri', REDIRECT_URI);
searchParams.append('scope', SCOPE);

export const urlAuth = `${URL_AUTH_START}${searchParams.toString()}`;

// Получение кода из адресной строки
export const getAuthCode = () => {
  let code;

  if (location.search.includes('code')) {
    code = new URLSearchParams(location.search.substring(1))
      .get('code');
  }
  return code;
};

// URL для получения токена
const searchParamsToken = new URLSearchParams('');

searchParamsToken.append('client_id', CLIENT_ID);
searchParamsToken.append('redirect_uri', REDIRECT_URI);
searchParamsToken.append('client_secret', CLIENT_SECRET);
searchParamsToken.append('code', getAuthCode());
searchParamsToken.append('grant_type', 'authorization_code');

export const urlAuthToken = `${URL_AUTH_TOKEN}${searchParamsToken.toString()}`;

