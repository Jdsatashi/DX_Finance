<template>
  <div>
    <label :class="labelClass" :for="label">{{ label }}</label>
    <select :id="label" :class="selectClass" v-model="selectedValue" @change="onChange">
      <option v-for="item in items" :key="item.value" :value="item.value">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  label: String,
  items: Array,
  labelClass: String,
  selectClass: String,
  defaultValue: Object
});

const emits = defineEmits(['update:value']);
const selectedValue = ref(props.defaultValue ? props.defaultValue.value : props.items[0]?.value);

function onChange() {
  emits('update:value', selectedValue.value);
}
</script>
