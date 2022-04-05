const URL_GET_DATA = 'https://25.javascript.pages.academy/keksobooking/data';
const URL_SUBMISSION_FORM = 'https://25.javascript.pages.academy/keksobooking';

export const getData = (onSuccess, onFail) => {
  fetch(URL_GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then((ads) => onSuccess(ads))
    .catch((err) => onFail(err));
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    URL_SUBMISSION_FORM,
    {
      method: 'POST',
      body
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
