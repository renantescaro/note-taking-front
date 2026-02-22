import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { LoginData } from '@/schemas/auth.schema';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await api.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      // Armazena o JWT retornado pela API
      localStorage.setItem('auth_token', data.token);
      router.push('/dashboard');
    },
  });
}
