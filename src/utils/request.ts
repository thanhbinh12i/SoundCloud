// const API_DOMAIN = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
const API_DOMAIN = `http://localhost:3002/`;

interface Options {
      [key: string]: any;
}

interface ResponseData<T = any> {
      data?: T;
      error?: string;
}

export const get = async <T>(path: string): Promise<T> => {
      const response = await fetch(API_DOMAIN + path);
      const result = await response.json();
      return result;
}

export const post = async <T>(path: string, options: Options): Promise<T> => {
      const response = await fetch(API_DOMAIN + path, {
            method: "POST",
            headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
            },
            body: JSON.stringify(options),
      });
      const result = await response.json();
      return result;
}

export const del = async (path: string, id: string | number): Promise<ResponseData> => {
      const response = await fetch(`${API_DOMAIN}${path}/${id}`, {
            method: "DELETE",
      });
      const result: ResponseData = await response.json();
      return result;
}

export const patch = async <T>(path: string, options: Options): Promise<T> => {
      const response = await fetch(API_DOMAIN + path, {
            method: "PATCH",
            headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
            },
            body: JSON.stringify(options),
      });
      const result = await response.json();
      return result;
}