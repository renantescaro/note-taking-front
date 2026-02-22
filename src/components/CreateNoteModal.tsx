'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { X } from 'lucide-react';
import { useCreateNote } from '@/hooks/useNotes';
import { createNoteSchema, type CreateNoteData } from '@/schemas/note.schema';
import { useState } from 'react';

export default function CreateNoteModal({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateNote();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNoteData>({
    resolver: zodResolver(createNoteSchema),
  });

  const onSubmit = async (data: CreateNoteData) => {
    try {
      await mutateAsync(data);
      reset();
      setOpen(false); // Fecha o modal após sucesso
    } catch (e) {
      console.error('Erro ao criar nota', e);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl z-50 focus:outline-none animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              Nova Nota
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <TextField
              fullWidth
              label="Título"
              variant="outlined"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              fullWidth
              label="Conteúdo"
              multiline
              rows={4}
              variant="outlined"
              {...register('content')}
              error={!!errors.content}
              helperText={errors.content?.message}
            />

            <div className="flex justify-end gap-3 mt-8">
              <Dialog.Close asChild>
                <Button variant="text" color="inherit" disabled={isPending}>
                  Cancelar
                </Button>
              </Dialog.Close>
              <Button
                type="submit"
                variant="contained"
                disabled={isPending}
                className="bg-blue-600 hover:bg-blue-700 px-8 rounded-lg normal-case"
              >
                {isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Criar Nota'
                )}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
