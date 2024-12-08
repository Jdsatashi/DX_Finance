<template>
    <div class="relative">
      <input
        type="text"
        placeholder="Type to search..."
        v-model="searchQuery"
        @input="filterOptions"
        class="w-full p-2 border rounded"
      />
      <select v-model="selected" class="w-full p-2 mt-1 border rounded" size="5">
        <option v-for="option in filteredOptions" :key="option.value" :value="option.value">
          {{ option.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue';
  
  const props = defineProps({
    options: Array,
    value: String
  });
  
  const emits = defineEmits(['update:value']);
  
  const searchQuery = ref('');
  const selected = ref(props.value);
  
  const filteredOptions = computed(() => {
    if (!searchQuery.value) {
      return props.options;
    }
    return props.options.filter(option => 
      option.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  watch(selected, (newVal) => {
    emits('update:value', newVal);
  });
  
  function filterOptions() {
    // This function is triggered on input but filtering is handled by computed property
  }
  </script>
  
  <style scoped>
  .select-wrapper {
    position: relative;
    width: 100%;
  }
  select {
    width: 100%;
  }
  </style>
  