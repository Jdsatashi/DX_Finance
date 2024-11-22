<template>
  <nav :class="className.navbar">
    <div :class="className.nav_content">
      <a href="/" :class="className.nav_logo">
        <img
          src="/assets/images/hinhdx.png"
          class="h-10 lg:h-14"
          alt="Flowbite Logo"
        />
      </a>
      <button
        data-collapse-toggle="navbar-dropdown"
        type="button"
        class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="navbar-dropdown"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
        <ul
          class="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white"
        >
          <li>
            <a href="#" :class="className.nav_item" aria-current="page">Trang chủ</a>
          </li>
          <li>
            <button
              @click="navigateTo('/cong-no')"
              :class="className.nav_item"
              >Công nợ</button
            >
          </li>
          <li>
            <button
              @click="navigateTo('/tien-gui')"
              :class="className.nav_item"
              >Tiền gửi</button
            >
          </li>
          <li class="hidden lg:block">|</li>
          <li :class="isLoggedIn ? '' : 'hidden'">
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              class="flex items-center justify-between w-full px-3 py-2 text-green-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 md:w-auto"
            >
              Chào, {{ username }}
              <svg
                class="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div
              id="dropdownNavbar"
              class="z-10 hidden font-normal bg-white divide-y divide-gray-300 rounded-lg shadow w-52"
            >
              <ul
                class="py-2 text-sm text-gray-700"
                aria-labelledby="dropdownLargeButton"
              >
              <li>
                <a href="#" class="block px-4 py-2 font-medium text-green-600 hover:text-red-600 hover:bg-gray-200">
                  Thông tin tài khoản
                </a>
              </li>
              </ul>
              <div class="py-1">
                <a
                  href="#"
                  @click="logout"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >Đăng xuất</a
                >
              </div>
            </div>
          </li>
          <li v-if="!isLoggedIn">
            <a
              href="#"
              @click="login"
              :class="className.nav_item"
              >Đăng nhập</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useFlowbite } from "@/composables/useFlowbite";
import { useAuth } from "@/composables/auth";
import { useNuxtApp } from '#app';

onMounted(() => {
  useFlowbite(() => {
    initFlowbite();
  });
});

const { $router } = useNuxtApp();
const { isLoggedIn, login, logout } = useAuth();
const username = ref("Johny")

const className = {
  navbar: "fixed top-0 z-20 w-full bg-white border-b border-gray-200",
  nav_content:
    "flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto",
  nav_logo: "flex items-center space-x-3 rtl:space-x-reverse",
  nav_item_active:
    "block px-3 py-2 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0",
    nav_item: "block px-3 py-2 text-green-600 rounded hover:bg-red-500 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0"
};

const navigateTo = (path: string) => {
  console.log("Click navigate cong no")
  $router.push(path);
}
</script>

<style scoped>
</style>
