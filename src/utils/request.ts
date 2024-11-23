const API_DOMAIN = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

interface Options {
      [key: string]: any;
}

interface ResponseData {
      [key: string]: any;
}

export const get = async (path: string): Promise<ResponseData> => {
      const response = await fetch(API_DOMAIN + path);
      const result: ResponseData = await response.json();
      return result;
}

export const post = async (path: string, options: Options): Promise<ResponseData> => {
      const response = await fetch(API_DOMAIN + path, {
            method: "POST",
            headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
            },
            body: JSON.stringify(options),
      });
      const result: ResponseData = await response.json();
      return result;
}

export const del = async (path: string, id: string | number): Promise<ResponseData> => {
      const response = await fetch(`${API_DOMAIN}${path}/${id}`, {
            method: "DELETE",
      });
      const result: ResponseData = await response.json();
      return result;
}

export const patch = async (path: string, options: Options): Promise<ResponseData> => {
      const response = await fetch(API_DOMAIN + path, {
            method: "PATCH",
            headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
            },
            body: JSON.stringify(options),
      });
      const result: ResponseData = await response.json();
      return result;
}