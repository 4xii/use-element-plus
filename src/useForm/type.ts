import { type FormInstance } from 'element-plus'
import { type Ref } from 'vue'
import { type FieldPath } from '../common/type/path'
import { type Arrayable } from '../common/type/arrayable'

export type FieldValues = Record<string, any>

export type FormDataType = 'initial' | 'basic'
export type UseFormProps<TFieldValues> = {
  formRef: Ref<FormInstance | undefined>
  initialFormData: TFieldValues
  basicFormData?: TFieldValues
}

export type UseFormResetField<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(option: {
  props?: Arrayable<FieldPath<TFieldName>> | undefined
  type?: FormDataType
}) => void
