import { ref } from 'vue'
import { cloneDeep, get, set } from 'lodash'
import { isArray, isString } from '../common/general'
import {
  type FieldValues,
  type UseFormHandleSubmit,
  type UseFormHandleValidate,
  type UseFormProps,
  type UseFormResetField,
} from './type'
const useForm = <TFieldValues extends FieldValues = FieldValues>(
  props: UseFormProps<TFieldValues>
) => {
  /** form使用的表单数据 */
  const { initialFormData, basicFormData, formRef } = props

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

  const handleSubmit: UseFormHandleSubmit<TFieldValues> = (submit) => {
    return () => {
      if (typeof submit !== 'function') {
        throw new TypeError('Submit function is required')
      }
      if (!formRef.value) return
      formRef.value.validate((valid, fields) => {
        submit(formData.value, { valid, fields })
      })
    }
  }

  /** 主动校验 */
  const handleValidate: UseFormHandleValidate<TFieldValues> = async (
    props?
  ) => {
    if (!formRef?.value) return
    const res = await (props
      ? formRef.value.validateField(props)
      : formRef.value.validate())
    return res
  }

  return {
    formData,
    resetFields,
    handleSubmit,
    handleValidate,
  }
}
export { useForm }
