import { describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import {
  type FormInstance,
  type FormRules,
} from 'element-plus'
import * as ElementPlus from 'element-plus'
import { mount } from '@vue/test-utils'
import { useForm } from './index'
import { rAF } from '../common/test-utils/tick'

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

  const submitMock = vi.fn();

  const App = defineComponent({
    setup() {
      const formRef = ref<FormInstance>()
      const { formData, resetFields, handleSubmit, handleValidate } = useForm({
        formRef,
        initialFormData: defaultValues,
        basicFormData: basicValues,
      })

      const rules: FormRules = {
        fieldName: [
          {
            required: true,
            message: 'Please input fieldName',
            trigger: 'blur',
          },
        ],
        'nestedField.nestedFieldName': [
          {
            required: true,
            message: 'Please input nestedFieldName',
            trigger: 'change',
          },
        ],
      }

      const handleInitialReset = () => {
        resetFields({ type: 'initial' })
      }

      const handleBasicReset = () => {
        resetFields({ type: 'basic' })
      }

      const submit = handleSubmit(submitMock)

      const validate = async () => {
        console.log('formData.value :>> ', formData.value);
        const res = await handleValidate();
        console.log('res :>> ', res);
      }

      return () => (
        <div>
          <el-form ref={formRef} model={formData.value} rules={rules}>
            <el-form-item
              ref="fieldNameItem"
              prop="fieldName"
              label="fieldName"
            >
              <el-input
                v-model={formData.value.fieldName}
                ref="fieldNameInput"
              />
            </el-form-item>
            <el-form-item
              ref="nestedFieldNameItem"
              prop="nestedField.nestedFieldName"
              label="nestedField"
            >
              <el-input
                v-model={formData.value.nestedField.nestedFieldName}
                ref="nestedFieldNameInput"
              />
            </el-form-item>
          </el-form>
          <button class="initalResetButton" onClick={handleInitialReset}>
            Reset to Initial
          </button>
          <button class="basicResetButton" onClick={handleBasicReset}>
            Reset to Basic
          </button>
          <button class="submitButton" onClick={submit}>
            submit
          </button>
          <button class="validateButton" onClick={validate}>
            validate
          </button>
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
    await wrapper
      .findComponent({ ref: 'fieldNameInput' })
      .setValue('modifiedValue')
    await wrapper
      .findComponent({ ref: 'nestedFieldNameInput' })
      .setValue('modifiedNestedValue')

    // Verify the modified values
    expect(wrapper.findAll('input')[0].element.value).toBe('modifiedValue')
    expect(wrapper.findAll('input')[1].element.value).toBe(
      'modifiedNestedValue'
    )

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
    await wrapper
      .findComponent({ ref: 'fieldNameInput' })
      .setValue('modifiedValue')
    await wrapper
      .findComponent({ ref: 'nestedFieldNameInput' })
      .setValue('modifiedNestedValue')

    // Verify the modified values
    expect(wrapper.findAll('input')[0].element.value).toBe('modifiedValue')
    expect(wrapper.findAll('input')[1].element.value).toBe(
      'modifiedNestedValue'
    )

    // Click the "Reset to Initial" button
    await findSubmitButton().trigger('click')

    // Verify the form values are reset to initial values
    expect(wrapper.findAll('input').map((i) => i.element.value)).toEqual([
      basicValues.fieldName,
      basicValues.nestedField.nestedFieldName,
    ])
  })

  it('calls submit function on form submit', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [ElementPlus],
      },
    })
    const findSubmitButton = () => wrapper.find('.submitButton')
    await wrapper
      .findComponent({ ref: 'fieldNameInput' })
      .setValue('modifiedValue')

    findSubmitButton().trigger('click')

    await rAF()

    expect(submitMock).toHaveBeenCalledWith(
      {
        fieldName: 'modifiedValue',
        nestedField: { nestedFieldName: 'nestedInitialValue' },
      },
      { valid: true, fields: undefined }
    )
  })

  it('calls validate function', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [ElementPlus],
      },
    })
    // vi.useFakeTimers()
    const findSubmitButton = () => wrapper.find('.validateButton')
  
    await wrapper.findComponent({ ref: 'fieldNameInput' }).setValue('')
    await findSubmitButton().trigger('click')
    await nextTick()
    expect(wrapper.findAll('.el-form-item__error')).toHaveLength(1)
  })
})
