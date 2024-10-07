import {
  CDone,
  CFetchRequest,
  CFetchResponse,
  CRequest,
  CResponse,
} from "../types/type";
export default abstract class Client {
  private static instances;
  private _times;
  protected static readonly classNames: {
    QuanX: (
      name?: string,
      className?: string,
      options?: {
        debug?: boolean;
      }
    ) => QuanXClient;
    Surge: (
      name?: string,
      className?: string,
      options?: {
        debug?: boolean;
      }
    ) => SurgeClient;
  };
  protected name: string;
  protected debug: boolean;
  readonly className: string;
  request: CRequest;
  response: CResponse;
  protected constructor(
    name?: string,
    className?: string,
    options?: {
      debug?: boolean;
    }
  );
  static getInstance(
    name?: string,
    options?: {
      debug?: boolean;
    }
  ): Client;
  abstract init(): void;
  abstract getVal(key: string): string | null | undefined;
  abstract setVal(val: string, key: string): void;
  abstract fetch(request: CFetchRequest): Promise<CFetchResponse>;
  abstract done(done: CDone): void;
  protected createProxy<T extends object, C extends object>(target: T): C;
  protected getFn<T>(t: T, p: string, r: any): any;
  protected setFn<T>(t: T, p: string, v: any, r: any): boolean;
  getJSON(key: string, alter?: object): object;
  setJSON(val: object, key: string): void;
  msg(title?: string, subTitle?: string, desc?: string, url?: string): void;
  log(val: any): void;
  timeStart(label: string): void;
  timeEnd(label: string): void;
  exit(): void;
  reject(): void;
}
export declare class SurgeClient extends Client {
  static clientAdapter: {
    bodyBytes: string;
  };
  protected getFn<T>(t: T, p: string, receiver: any): any;
  protected setFn<T>(t: T, p: string, newValue: any, receiver: any): boolean;
  init(): void;
  getVal(key: string): string | null | undefined;
  setVal(val: string, key: string): void;
  msg(title?: string, subTitle?: string, desc?: string, url?: string): void;
  fetch(request: CFetchRequest): Promise<CFetchResponse>;
  done(cDone: CDone): void;
}
export declare class QuanXClient extends Client {
  static clientAdapter: {
    id: string;
    status: string;
  };
  static transferBodyBytes(
    bodyBytes: Uint8Array | ArrayBuffer | undefined,
    target: "Uint8Array" | "ArrayBuffer"
  ): Uint8Array | ArrayBuffer | undefined;
  init(): void;
  protected getFn<T>(t: T, p: string, receiver: any): any;
  protected setFn<T>(t: T, p: string, newValue: any, receiver: any): boolean;
  getVal(key: string): string | null | undefined;
  setVal(val: string, key: string): void;
  msg(title?: string, subTitle?: string, desc?: string, url?: string): void;
  fetch(request: CFetchRequest): Promise<CFetchResponse>;
  done(cDone: CDone): void;
}

export {};
