export type DeepPartial<T> = T extends BrowserNativeObject | NestedValue
  ? T
  : { [K in keyof T]?: DeepPartial<T[K]> };
