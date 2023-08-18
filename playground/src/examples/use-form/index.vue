<script lang="ts" setup>
import { ref } from 'vue'
import { useForm } from 'use-element-plus'
import { type FormInstance, type FormRules } from 'element-plus'

const props = defineProps({
  onSubmit:Function
})

const formRef = ref<FormInstance>()

const defaultValues = {
  fieldName: 'initialValue',
  nestedField: {
    nestedFieldName: 'nestedInitialValue',
  },
}

const basicValues = {
  fieldName: '',
  nestedField: {
    nestedFieldName: 'basicNestedValue',
  },
}

const {
  formData,
  handleSubmit,
  resetFields,
  handleValidate,
  // scrollToField
} = useForm({ formRef, initialFormData: defaultValues, basicFormData: basicValues })

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

const submit = handleSubmit((value, fields) => {
  props.onSubmit && props.onSubmit(value, fields);
})

const validate = async () => {
  await handleValidate();
}
</script>

<template>
  <el-form ref="formRef" :model="formData" :rules="rules">
    <el-form-item ref="fieldNameItem" prop="fieldName" label="fieldName">
      <el-input v-model="formData.fieldName" ref="fieldNameInput" />
    </el-form-item>
    <el-form-item ref="nestedFieldNameItem" prop="nestedField.nestedFieldName" label="nestedField">
      <el-input v-model="formData.nestedField.nestedFieldName" ref="nestedFieldNameInput" />
    </el-form-item>
  </el-form>
  <button class="initalResetButton" @click="handleInitialReset">
    Reset to Initial
  </button>
  <button class="basicResetButton" @click="handleBasicReset">
    Reset to Basic
  </button>
  <button class="submitButton" @click="submit">
    submit
  </button>
  <button class="validateButton" @click="validate">
    validate
  </button>
</template>
