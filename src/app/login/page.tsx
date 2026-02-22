'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginData } from '@/schemas/auth.schema';
import { useLogin } from '@/hooks/useAuth';
import {
  TextField,
  Button,
  Card,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const { mutate, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginData) => mutate(data);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Container maxWidth="xs">
        <Card className="p-8 shadow-xl border-0 rounded-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <LogIn className="text-blue-600" size={28} />
            </div>
            <Typography variant="h4" className="font-bold text-gray-900">
              Bem-vindo
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-500 text-center mt-2"
            >
              Acesse sua conta para gerenciar suas notas
            </Typography>
          </div>

          {error && (
            <Alert severity="error" className="mb-6">
              {(error as any).response?.data?.error || 'Erro ao realizar login'}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <TextField
              fullWidth
              label="E-mail"
              variant="outlined"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Senha"
              type="password"
              variant="outlined"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 h-12 text-lg normal-case"
            >
              {isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Typography variant="body2" className="text-gray-600">
              Ainda não tem uma conta?{' '}
              <Link
                href="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Cadastre-se
              </Link>
            </Typography>
          </div>
        </Card>
      </Container>
    </main>
  );
}
