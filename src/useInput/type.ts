import { InputInstance } from "element-plus"
import { Ref } from "vue"

export type UseInputProps = {
  inputRef: Ref<InputInstance | undefined>,
  defalutValue?:string | number,
}
