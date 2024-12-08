<template>
  <div class="input-wrapper">
    <label :for="inputProperties.id" :class="labelClass">{{ label }}</label>
    <input :id="inputProperties.id"
           :type="inputProperties.type"
           :name="inputProperties.name"
           :class="inputProperties.class"
           :placeholder="inputProperties.placeholder"
           :required="inputProperties.required"
           v-model="value"/>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

// Define the props the component accepts
const props = defineProps({
  label: String,
  labelClass: String,
  inputProperties: Object,
  modelValue: [String, Number] // Assuming value could be String or Number
});

const emits = defineEmits(['update:modelValue']);

// Use a computed property to handle v-model
const value = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val)
});
</script>

<style></style>
