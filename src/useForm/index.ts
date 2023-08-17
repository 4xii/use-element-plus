import { reactive, ref } from 'vue'
import { cloneDeep, get, set } from 'lodash'
import { isArray, isString } from '../common/general'
import {
UseFormHandleScrollToField,
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

  const formState = reactive({
    isLoading:false,
    // TODO
  })

  const resetFields: UseFormResetField<TFieldValues> = (
    option = { type: 'initial' ,clearValid:true }
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

    if(option.clearValid){
      if (!formRef.value) return
      formRef.value.clearValidate(props)
    }
  }

  const handleSubmit: UseFormHandleSubmit<TFieldValues> = (submit) => {
    return () => {
      if (typeof submit !== 'function') {
        throw new TypeError('Submit function is required')
      }
      if (!formRef.value) return
      formRef.value.validate(async (valid, fields) => {
        formState.isLoading = true
        await submit(formData.value, { valid, fields })
        formState.isLoading = false
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

  const scrollToField:UseFormHandleScrollToField<TFieldValues> = (prop) =>{
    if (!formRef?.value) return
    formRef?.value.scrollToField(prop)
  }

  return {
    formData,
    resetFields,
    handleSubmit,
    handleValidate,
    scrollToField,
    formState
  }
}
export { useForm }
