<template>
  <div v-if="isVisible">
    <div class="">
      <div
        tabindex="-1"
        class="overflow-y-auto overflow-x-hidden fixed flex justify-center z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-brightness-50"
        @click="clickModalOutSide"
      >
        <div class="relative w-full h-auto max-w-md p-4">
          <!-- Modal content -->
          <div
            class="relative bg-white rounded-lg shadow dark:bg-gray-700"
            @click.stop="clickModal"
          >
            <!-- Modal header -->
            <div
              class="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600"
            >
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Thêm công nợ
              </h3>
              <button
                type="button"
                @click="close"
                class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5">
              <form class="space-y-4" action="#" @submit.prevent="handleSubmit">
                <div v-for="field in inputFields" :key="field.name">
                  <div v-if="field.type === 'select'">
                    <USelectMenu
                      searchable
                      class="w-full"
                      :placeholder="`Chọn ${field.label.toLowerCase()}`"
                      :options="field.items"
                      option-attribute="name"
                      value-attribute="id"
                      @click="console.log(formValues[field.name])"
                      v-model="formValues[field.name]"
                      
                      @focus="errorField[field.name]"
                    />
                  </div>
                  <div v-else>
                    <Input
                      :label="field.label"
                      :labelClass="className.label"
                      :inputProperties="{
                        id: field.name,
                        type: field.type,
                        name: field.name,
                        class: className.input,
                        placeholder: 'Nhập ' + field.label.toLowerCase(),
                        value: formValues[field.name],
                        required: false,
                      }"
                      v-model="formValues[field.name]"
                      @focus="errorField[field.name] = 0"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";

const create_api = api_v2 + "tai-vu/cong-no/";

const props = defineProps({
  isVisible: Boolean,
  users: Array,
  companies: Array,
  updateData: Object,
});

const emits = defineEmits(["update:isVisible"]);

const close = () => {
  emits("update:isVisible", false);
};

const clickModal = () => {
  console.log("Check form data");
};
const clickModalOutSide = () => close();

const className = {
  label: "block text-sm font-medium text-gray-900",
  input:
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
};
const initValueForm = reactive({
  from_date: "",
  to_date: "",
  pay_money: "",
  note: "",
  created_by: "",
  company: "",
});

const errorField = ref({
  from_date: "",
  to_date: "",
  pay_money: "",
  note: "",
  created_by: "",
  company: "",
});

const inputFields = reactive([
  {
    name: "from_date",
    type: "date",
    label: "Từ ngày",
  },
  {
    name: "to_date",
    type: "date",
    label: "Đến ngày",
  },
  {
    name: "pay_money",
    type: "number",
    label: "Tổng tiền cần thanh toán",
  },
  {
    name: "note",
    type: "text",
    label: "Ghi chú",
  },
  {
    name: "created_by",
    type: "select",
    label: "Nhân viên",
    labelClass: className.label,
    selectClass: className.input,
    items: [],
  },
  {
    name: "company",
    type: "select",
    label: "Công ty",
    labelClass: className.label,
    selectClass: className.input,
    items: [],
  },
]);

const formValues: Object = reactive(initValueForm);

const clearFormValues = () => {
  for (const key in initValueForm) {
    formValues[key] = "";
  }
};

watch(
  () => props.users,
  (newUsers) => {
    if (newUsers.length > 0) {
      inputFields.find((f) => f.name === "created_by").items = newUsers;
    }
  },
  { immediate: true }
);

watch(
  () => props.companies,
  (newCompanies) => {
    console.log("Test newCompanies: " + newCompanies);
    if (newCompanies.length > 0) {
      inputFields.find((f) => f.name === "company").items = newCompanies;
    }
  },
  { immediate: true }
);

watch(
  () => props.updateData,
  (newData: Object) => {
    try{
      console.log(newData)
      console.log("Test: " + `${Object.keys(newData).length > 0}`);
      if (Object.keys(newData).length > 0) {
        console.log("__ Case update!");
        for (const key in initValueForm) {
          if (key == 'company') {
            const items_list = inputFields.find((f) => f.name === "company").items
            for (let item of items_list) {
              if (item.name === newData[key]){
                formValues[key] = item.id
                break
              }
            }
          } else {
            formValues[key] = newData[key];
          }
        }
      } else {
        console.log("__ Case create");
        clearFormValues();
      }
    } catch (err) {
      console.log("Lỗi ở đây :)))")
      console.log(err)
    }
  },
  { immediate: true, deep: true }
);

const handleSubmit = async () => {
  try {
    if (Object.keys(props.updateData).length > 0) {
      console.log("Handle updating...");
      const response = await processUpdateApi(formValues, props.updateData?.id);
    } else {
      console.log("Handle creating...");
      const response = await processCreateApi(formValues);
    }
  } catch (error: any) {
    if (error.response) {
      // Nếu có phản hồi từ server nhưng là một mã lỗi
      console.error("Error status:", error.response.status);
      console.error("Error body:", await error.response);
      for (let field in error.response._data) {
        // console.log(`${field}: ${error.response._data[field]}`)
        errorField.value[field] = error.response._data[field][0];
      }
      console.table(errorField.value);
    } else if (error.request) {
      alert("Không nhận được phản hồi từ máy chủ");
    } else {
      alert("Lỗi hệ thống");
    }
  }
};

const processCreateApi = async (sumitValue: Object) => {
  const response = await $fetch(create_api, {
    method: "POST",
    body: sumitValue,
  });
  close();
  alert("Tạo thành công");
  return response;
};

const processUpdateApi = async (
  sumitValue: Object,
  updateId: String | Number
) => {
  const response = await $fetch(`${create_api}${updateId}`, {
    method: "PUT",
    body: sumitValue,
  });
  close();
  alert("Cập nhật thành công");
  return response;
};
</script>

<style></style>
