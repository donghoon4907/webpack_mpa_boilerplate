import axios, { AxiosResponse, AxiosError, Method, AxiosRequestConfig } from "axios";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

/**
 * @description  http 요청
 * @param method http 요청 메서드
 * @param url    도메인을 제외한 endpoint
 * @param params 추가 요청 데이터
 */
export function http(method: Method, url: string, params: any) {
    const f = pipe(
        TE.tryCatch<Error, AxiosResponse>(
            () =>
                axios({
                    method,
                    url,
                    params
                }),
            (reason) => new Error(JSON.stringify((reason as AxiosError).response))
        )
    );

    return f();
}

/**
 * @description http 요청 응답 처리
 * @param res http 요청 응답 정보
 */
export function receive(res: E.Either<Error, any>) {
    const { data, status, config } = pipe(
        res,
        E.fold(
            (err) => JSON.parse(err.message),
            (x) => x
        )
    );

    if (status === 200) {
        return data;
    } else {
        return error(status, config);
    }
}

/**
 * @description http 요청 에러 처리
 * @param status http 요청 상태 코드
 * @param config http 요청 설정 정보
 */
function error(status: number, config: AxiosRequestConfig) {
    const { baseURL = "", url, params } = config;

    throw new Error(`status code: ${status}\ncall endpoint: ${baseURL + url}\nparams:\t${JSON.stringify(params, null, 2)}`);
}
