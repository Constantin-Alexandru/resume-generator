const consoleLog = (msg: unknown): void => {
  console.log(msg);
};

const post = async (route: string, data: unknown): Promise<unknown> => {
  return await request("POST", route, data);
};

const _delete = async (route: string, data: unknown): Promise<unknown> => {
  return await request("DELETE", route, data);
};

const get = async (route: string): Promise<unknown> => {
  return await request("GET", route, undefined);
};

const patch = async (route: string, data: unknown): Promise<unknown> => {
  return await request("PATCH", route, data);
};

const request = async (
  method: string,
  route: string,
  data: unknown
): Promise<unknown> => {
  const path = "http://localhost:9000" + route;
  return await fetch(path, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      consoleLog(res);
      return await res.json();
    })
    .then((res) => {
      consoleLog(res);
      return res;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default {
  post,
  get,
  patch,
  _delete,
  request,
};
