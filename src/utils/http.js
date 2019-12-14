import { http } from "./request";
export const ajax = params => {
  const { timeout, api, method, data } = params;
  return http({
    timeout,
    api,
    method,
    data
  })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
