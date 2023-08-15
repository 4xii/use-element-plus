export const extend = Object.assign

export const remove = <T>(arr: T[], el: T) => {
  const i = arr.indexOf(el)
  if (i > -1) {
    arr.splice(i, 1)
  }
}

const hasOwnProperty = Object.prototype.hasOwnProperty

export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)

export const isArray = Array.isArray

export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === '[object Map]'

export const isSet = (val: unknown): val is Set<any> =>
  toTypeString(val) === '[object Set]'

export const isDate = (val: unknown): val is Date => val instanceof Date

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isNumber = (val: unknown): val is number => typeof val === 'number'

export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

export const isError = (val: unknown): val is Error => val instanceof Error

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const objectToString = Object.prototype.toString

export const toTypeString = (value: unknown): string =>
  objectToString.call(value)

export const sameString = (str1: string, str2: string): boolean => {
  return str1 === str2
}

/**
 * Greater Than Zero
 */
export const arrayLengthGTZ = (array: Array<unknown>): boolean => {
  return isArray(array) && array.length > 0
}

export const safeJSONParse = <T = unknown>(data: string): T | {} => {
  let res: T | {}
  try {
    res = JSON.parse(data)
  } catch {
    res = {}
  }

  return res
}
