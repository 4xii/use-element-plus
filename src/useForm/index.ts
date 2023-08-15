import { ref } from 'vue'
import { cloneDeep, get, set } from 'lodash'
import { isArray, isString } from '../common/general'
import {
  type FieldValues,
  type UseFormProps,
  type UseFormResetField,
} from './type'
const useForm = <TFieldValues extends FieldValues = FieldValues>(
  props: UseFormProps<TFieldValues>
) => {
  /** form使用的表单数据 */
  const { initialFormData, basicFormData } = props

  const formData = ref(cloneDeep(initialFormData))

  const resetFields: UseFormResetField<TFieldValues> = (
    option = { type: 'initial' }
  ) => {
    const { props, type } = option

    if (type === 'basic' && !basicFormData) {
      return
    }

    const resetData = type === 'basic' ? basicFormData : initialFormData

    const resetValue = (prop: string | string[]) => {
      set(formData.value, prop, get(cloneDeep(resetData), prop))
    }

    if (!props) {
      formData.value = cloneDeep(resetData)
    } else if (isString(props)) {
      resetValue(props)
    } else if (isArray(props)) {
      props.forEach((keyPath) => {
        resetValue(keyPath)
      })
    }
  }

  return {
    formData,
    resetFields,
  }
}
export { useForm }
