
const axios = require('axios');

export function getRequest(url,funcOnResponse,funcOnError,alwaysCalledFunc,params=[]){
  //params are [alwaysCalledFuncParam1,2, etc]
  axios.get(url)
    .then(function (response) {
      // handle success
      console.log(response);
      funcOnResponse(response)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      funcOnError(error)
    })
    .then(function () {
      // always executed
      alwaysCalledFunc()
    });
}

export function postRequest(url,funcOnResponse,funcOnError,data){
  //params are [alwaysCalledFuncParam1,2, etc]
  axios.post(url,data)
    .then(function (response) {
      // handle success
      console.log(response);
      funcOnResponse(response)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      funcOnError(error)
    });
}
