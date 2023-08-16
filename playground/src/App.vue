<script setup lang="ts">
import useForm from './examples/use-form/index.vue'
// import useCEPFrom from './examples/use-CEP-form/index.vue'
</script>

<template>
  <div grid="~ cols-3 gap2">
    <fieldset>
      <legend>useForm</legend>
      <useForm />
    </fieldset>

    <!-- <fieldset>
      <legend>useCEPFrom</legend>
      <useCEPFrom />
    </fieldset> -->
  </div>
</template>

<style>
legend {
  font-family: monospace;
  font-size: 16px;
  font-weight: bold;
}
</style>
