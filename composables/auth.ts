import { ref } from 'vue'

// Tạo state lưu trữ trạng thái đăng nhập
const isLoggedIn = ref(false);

// Tạo một function để thay đổi trạng thái đăng nhập
export function useAuth() {
  const login = () => {
    isLoggedIn.value = true;
  };

  const logout = () => {
    isLoggedIn.value = false;
  };

  return { isLoggedIn, login, logout }
}