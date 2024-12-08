// composables/apiLogin.ts
import { useState } from '#app';

export const useApiLogin = () => {
  const accessToken = useState<string>('accessToken', () => '');

  async function login(API_USER: string, API_PASSWORD: string) {
    const api_url = api_v1 + 'accounts/admin/';
    console.log('API_USER: ' + API_USER)
    try {
      const response = await $fetch(api_url, {
        method: 'POST',
        body: JSON.stringify({
          email: `${API_USER}@user.name`,
          password: API_PASSWORD
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      accessToken.value = response.access; // Lưu ý rằng response phải có thuộc tính 'access'
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  return { login, accessToken };
};
