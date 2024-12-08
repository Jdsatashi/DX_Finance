<template>
  <ModalCreateCongNo :isVisible="showModal" :users="users" :companies="companies" :updateData="chosenData" @update:isVisible="showModal = $event"/>
  <div class="flex justify-center">
    <div
      class="relative overflow-x-auto shadow-md lg:w-[1280px] w-auto sm:rounded-lg"
    >
      <table
        class="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400"
      >
        <thead class="text-xs text-gray-100 uppercase bg-emerald-600">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all-search" class="sr-only"
                  >checkbox</label
                >
              </div>
            </th>
            <th scope="col" class="px-6 py-3">Id</th>
            <th scope="col" class="px-6 py-3">NHÂN VIÊN</th>
            <th scope="col" class="px-6 py-3">TỪ NGÀY</th>
            <th scope="col" class="px-6 py-3">ĐẾN NGÀY</th>
            <th scope="col" class="px-6 py-3">TỔNG TIỀN CẦN THANH TOÁN</th>
            <th scope="col" class="px-6 py-3">Công ty</th>
            <th scope="col" class="px-6 py-3">GHI CHÚ</th>
            <th scope="col" class="px-6 py-3">
              <button @click="updateShowModal(null)" class="font-bold underline hover:text-red-200">Thêm</button>
              <span class="mx-1">|</span>
              <button class="font-bold underline hover:text-red-200">XOÁ TẤT CẢ</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td colspan="4" class="px-6 py-4 text-center">
                    Tổng tiền:
                </td>
                <td colspan="4" class="px-6 py-4">
                    {{ total_price }}
                </td>
            </tr>
          <tr v-for="data in congNoData" :key="data.id" 
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <td class="px-2 py-4">
                    {{ data.id }}
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ data.nhan_vien }}
                </th>
                <td class="px-2 py-4">
                    {{ data.from_date }}
                </td>
                <td class="px-2 py-4">
                    {{ data.to_date }}
                </td>
                <td class="px-2 py-4">
                    {{ data.pay_money }}
                </td>
                <td class="px-2 py-4">
                    {{ data.company }}
                </td>
                <td class="px-2 py-4">
                    {{ data.note }}
                </td>
                <td class="flex items-center px-6 py-4">
                    <a href="#" @click="updateShowModal(data)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useApiLogin } from '~/composables/apiLogin'; // Đảm bảo đường dẫn đúng
import type { ApiResponse } from "~/interface/ApiClass";

const { login, accessToken } = useApiLogin();
const api_url = api_v2 + 'tai-vu/cong-no/';
const api_user = 'accounts/?get_user=employee&limit=0';
const api_company = 'company/?limit=0';
const api_user_url = api_v1 + api_user;
const api_company_url = api_v1 + api_company;

const total_price = ref(0); 
const showModal = ref(false);
const users = ref([]);
const companies = ref([]);
const api_response = ref({})
const congNoData = ref([])
const chosenData = ref({})

const updateShowModal = async (data) => {
  if (data) {
    console.table(data)
    chosenData.value = await data
  } else {
    chosenData.value = {}
  }
  showModal.value = !showModal.value;
}

const fetchUsers = async () => {
  try {
    const response: ApiResponse = await $fetch(api_user_url, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      }
    });
    // users.value = response.data.map(user => (`${user.id} - ${user.profile.register_name}`));
    users.value = response.data.map(user => ({id: user.id, name: user.profile.register_name}));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const fetchCompanies = async () => {
  try {
    console.log('Check token: ' + `Bearer ${accessToken.value}`);
    const response: ApiResponse = await $fetch(api_company_url, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      }
    });
    // companies.value = response.data.map(company => (`${company.id} - ${company.name}`));
    companies.value = response.data.map(company => ({id: company.id, name: company.name}));
  } catch (error) {
    console.error('Error fetching companies:', error);
  }
};

const fetchCongNo = async () => {
  try{
    const response: ApiResponse = await $fetch(api_url)
    api_response.value = response
    congNoData.value = response.data
    // console.table(congNoData.value)
  } catch (err) {
    console.log("Error when call api cong-no/: " + err)
  }
}

onMounted(async () => {
  // Ensure that the user is logged in before fetching other data
  await login(api_cf_user, api_cf_pw);
  
  // Fetch data only after successful login
  if (accessToken.value) {
    await fetchUsers();
    await fetchCompanies();
    await fetchCongNo()
  }
});
</script>

<style></style>
