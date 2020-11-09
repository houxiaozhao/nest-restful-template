export enum ApiErrorCode {
  TIMEOUT = -1, // 系统繁忙
  SUCCESS = 0, // 成功

  UNAUTHORIZED = 10000,
  ID_INVALID = 10001, // id无效
  USER_DUPLICATE = 10002,
}
