import { type FormInstance, type FormValidateCallback } from 'element-plus'
import { type Ref, type UnwrapRef } from 'vue'
import {
  type Arrayable,
  type FieldPath,
  type TupleToObject,
} from '../common/type/index'

export type FieldValues = Record<string, any>

export type FormDataType = 'initial' | 'basic'
export type UseFormProps<TFieldValues> = {
  formRef: Ref<FormInstance | undefined>
  initialFormData: TFieldValues
  basicFormData?: TFieldValues
}

export type UseFormResetField<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(option?: {
  props?: Arrayable<FieldPath<TFieldName>> | undefined
  type?: FormDataType
}) => void

export type UseFormHandleSubmit<TFieldValues extends FieldValues> = (
  submit: (
    values: UnwrapRef<TFieldValues>,
    validRes: TupleToObject<
      Parameters<FormValidateCallback>,
      ['valid', 'fields']
    >
  ) => void
) => () => void

export type UseFormHandleValidate<TFieldValues extends FieldValues> = (
  props?: Arrayable<FieldPath<TFieldValues>> | undefined
) => Promise<boolean | undefined>
