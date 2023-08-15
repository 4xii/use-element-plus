import { describe, expect, it } from 'vitest'
import { defineComponent, ref } from 'vue'
import { type FormInstance } from 'element-plus'
import * as ElementPlus from 'element-plus'
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

  const basicValues = {
    fieldName: 'basicValue',
    nestedField: {
      nestedFieldName: 'basicNestedValue',
    },
  }

  const App = defineComponent({
    setup() {
      const formRef = ref<FormInstance>()
      const { formData, resetFields } = useForm({
        formRef,
        initialFormData: defaultValues,
        basicFormData: basicValues,
      })

      const handleInitialReset = () => {
        resetFields({ type: 'initial' })
      }

      const handleBasicReset = () => {
        resetFields({ type: 'basic' })
      }

      return () => (
        <div>
          <el-form ref={formRef} model={formData.value}>
            <el-form-item label="fieldName">
              <el-input v-model={formData.value.fieldName} ref="fieldNameInput" />
            </el-form-item>
            <el-form-item label="nestedField">
              <el-input
                v-model={formData.value.nestedField.nestedFieldName}
                ref="nestedFieldNameInput"
              />
            </el-form-item>
          </el-form>
          <button class="initalResetButton" onClick={handleInitialReset}>Reset to Initial</button>
          <button class="basicResetButton" onClick={handleBasicReset}>Reset to Basic</button>
        </div>
      )
    },
  })

  it('should initialize formData with defaultValues', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [ElementPlus],
      },
    })
    expect(wrapper.findAll('input').map((i) => i.element.value)).toEqual([
      defaultValues.fieldName,
      defaultValues.nestedField.nestedFieldName,
    ])
  })

  it('should reset formData to initial values', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [ElementPlus],
      },
    })

    const findSubmitButton = () => wrapper.find('.initalResetButton')
    
    // Modify the form values
    await wrapper.findComponent({ ref: 'fieldNameInput' }).setValue('modifiedValue')
    await wrapper.findComponent({ ref: 'nestedFieldNameInput' }).setValue('modifiedNestedValue')

    // Verify the modified values
    expect(wrapper.findAll('input')[0].element.value).toBe('modifiedValue');
    expect(wrapper.findAll('input')[1].element.value).toBe('modifiedNestedValue')

    // Click the "Reset to Initial" button
    await findSubmitButton().trigger('click')

    // Verify the form values are reset to initial values
    expect(wrapper.findAll('input').map((i) => i.element.value)).toEqual([
      defaultValues.fieldName,
      defaultValues.nestedField.nestedFieldName,
    ])
  })

  it('should reset formData to basic values', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [ElementPlus],
      },
    })

    const findSubmitButton = () => wrapper.find('.basicResetButton')
    
    // Modify the form values
    await wrapper.findComponent({ ref: 'fieldNameInput' }).setValue('modifiedValue')
    await wrapper.findComponent({ ref: 'nestedFieldNameInput' }).setValue('modifiedNestedValue')

    // Verify the modified values
    expect(wrapper.findAll('input')[0].element.value).toBe('modifiedValue');
    expect(wrapper.findAll('input')[1].element.value).toBe('modifiedNestedValue')

    // Click the "Reset to Initial" button
    await findSubmitButton().trigger('click')

    // Verify the form values are reset to initial values
    expect(wrapper.findAll('input').map((i) => i.element.value)).toEqual([
      basicValues.fieldName,
      basicValues.nestedField.nestedFieldName,
    ])
  })
})
