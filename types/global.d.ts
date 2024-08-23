declare type Nullable<T> = T | null;
declare type Recordable<T = any> = Record<string, T>;
declare type EmitType = (event: string, ...args: any[]) => void;
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
declare interface UploadFileParams {
  file: File;
  fileName: string;
}
interface Window {
  $loadingBar: import('naive-ui').LoadingBarProviderInst;
  $dialog: import('naive-ui').DialogProviderInst;
  $message: import('naive-ui').MessageProviderInst;
  $notification: import('naive-ui').NotificationProviderInst;
}
