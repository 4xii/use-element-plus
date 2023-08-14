import { describe, expect, it } from 'vitest'
import { defineComponent, ref } from 'vue'
import { type FormInstance } from 'element-plus'
import ElementPlus from 'element-plus'
import { render } from '@testing-library/vue'
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
    const {container} = render(
      defineComponent({
        setup() {
          const formRefMock = ref<FormInstance>();
          const { formData } = useForm({ formRefMock, defaultValues });
          return {
            formData,
          }
        },
        template: 
        `<div>
          <el-form
            ref="formRefMock"
            :model="formData"
          >
            <el-form-item label="Name">
              <el-input v-model="formData.fieldName" />
            </el-form-item>
            <el-form-item label="nestedField">
              <el-input v-model="formData.nestedField.nestedFieldName" />
            </el-form-item>
          </el-form>
        </div>`,
      })
      ,
      {
        global: {
          plugins: [ElementPlus],
        },
      }
    );
    console.log('container :>> ', container);
    // todo get formData
    expect(formData.value).toEqual(defaultValues)
  })

})
