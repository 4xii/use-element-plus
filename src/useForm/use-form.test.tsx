import { describe, expect, it } from 'vitest'
import { defineComponent, ref } from 'vue'
import { type FormInstance } from 'element-plus'
import ElementPlus from 'element-plus'
import { mount } from '@vue/test-utils'
import { useForm } from './index'
import '@testing-library/jest-dom'
describe('useForm', () => {
  const defaultValues = {
    fieldName: 'initialValue',
    nestedField: {
      nestedFieldName: 'nestedInitialValue',
    },
  }

  it('should initialize formData with defaultValues', () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const formRef = ref<FormInstance>()
          const { formData } = useForm({
            formRef,
            initialFormData: defaultValues,
          })
          return () => (
            <el-form ref={formRef} model={formData.value}>
              <el-form-item label="fieldName">
                <el-input
                  v-model={formData.value.fieldName}
                  ref="fieldNameInput"
                />
              </el-form-item>
              <el-form-item label="nestedField">
                <el-input
                  v-model={formData.value.nestedField.nestedFieldName}
                  ref="nestedFieldNameInput"
                />
              </el-form-item>
            </el-form>
          )
        },
      }),
      {
        global: {
          plugins: [ElementPlus],
        },
      }
    )
    expect(wrapper.findAll('input').map((i) => i.element.value)).toEqual([
      defaultValues.fieldName,
      defaultValues.nestedField.nestedFieldName,
    ])
  })
})
