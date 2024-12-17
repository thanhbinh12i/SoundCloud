export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
      interface ITrackTop {
            "id": string;
            "title": string;
            "description": string;
            "imgUrl": string;
            "uploader": string;
            "trackUrl": string;
            "countLike": number;
            "category": string;
      }

      interface ITrackComment {
            "id": string,
            "content": string,
            "moment": string,
            "user": string,
            "track": string
      }

      interface IRequest {
            url: string;
            method: string;
            body?: { [key: string]: any };
            queryParams?: any;
            useCredentials?: boolean;
            headers?: any;
            nextOption?: any;
      }

      interface IBackendRes<T> {
            error?: string | string[];
            message: string;
            statusCode: number | string;
            data?: T;
      }

      interface IModelPaginate<T> {
            meta: {
                  current: number;
                  pageSize: number;
                  pages: number;
                  total: number;
            };
            result: T[];
      }
      interface IAuthUser {
            access_token: string;
            refresh_token: string;
            user: IUser
      }
      interface IShareTrack extends ITrackTop {
            isPlaying: boolean;
      }

      interface ITrackContext {
            currentTrack: IShareTrack;
            setCurrentTrack: (v: IShareTrack) => void;
      }
      interface ITrackLike {
            "id": string;
            "user": string;
            "track": string;
      }
}
