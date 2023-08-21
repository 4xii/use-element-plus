import { reactive, ref } from 'vue'

import {
  type UseInputProps,
} from './type'
const useInput = (
  props: UseInputProps
) => {
  const { defalutValue ,inputRef } = props
  const value = ref(defalutValue);

  const blur = () =>{
    inputRef.value && inputRef.value.blur()
  }

  const clear = () =>{
    inputRef.value && inputRef.value.clear()
  }

  const focus = () =>{
    inputRef.value && inputRef.value.focus()
  }

  const resizeTextarea = () =>{
    inputRef.value && inputRef.value.resizeTextarea()
  }

  const select = () =>{
    inputRef.value && inputRef.value.select()
  }

  const reset = () =>{
    value.value = defalutValue
  }
  return {
    value,
    blur,
    clear,
    focus,
    resizeTextarea,
    select,
    reset
  }
}
export { useInput }
