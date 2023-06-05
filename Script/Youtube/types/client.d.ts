declare interface CRequest extends BRequest<string> {
  id?: string
  bodyBytes?: Uint8Array
}

// $.response
declare interface CResponse extends BResponse<string> {
  id: string
  bodyBytes?: Uint8Array
}

// $.done
declare interface CDone extends BDone<number, string> {
  bodyBytes?: Uint8Array
  response?: Omit<CDone, 'response'>
}

declare interface CFetchRequest extends FetchRequest<Uint8Array> {
  id?: string
}

declare interface CFetchResponse extends FetchResponse<Uint8Array> {
  id?: string
}

declare interface ConversionRule<T> {
  key: keyof T
  newKey?: keyof T
  convert: (value: any) => any
}
