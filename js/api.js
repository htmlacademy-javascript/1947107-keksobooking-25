export const getData = (onSuccess, onFail) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking/data',
  )
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
    'https://25.javascript.pages.academy/keksobooking',
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
