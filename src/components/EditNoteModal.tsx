'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, CircularProgress } from '@mui/material';
import { X } from 'lucide-react';
import { useUpdateNote } from '@/hooks/useNotes';
import { createNoteSchema, type CreateNoteData } from '@/schemas/note.schema';
import { useState } from 'react';

interface EditNoteProps {
  note: { id: string; title: string; content: string };
  trigger: React.ReactNode;
}

export default function EditNoteModal({ note, trigger }: EditNoteProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdateNote();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNoteData>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: note.title,
      content: note.content,
    },
  });

  const onSubmit = async (data: CreateNoteData) => {
    try {
      await mutateAsync({ id: note.id, ...data });
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl z-50">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              Editar Nota
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <TextField
              fullWidth
              label="Título"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              fullWidth
              label="Conteúdo"
              multiline
              rows={4}
              {...register('content')}
              error={!!errors.content}
              helperText={errors.content?.message}
            />

            <div className="flex justify-end gap-3 mt-8">
              <Dialog.Close asChild>
                <Button variant="text" color="inherit">
                  Cancelar
                </Button>
              </Dialog.Close>
              <Button
                type="submit"
                variant="contained"
                disabled={isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Salvar Alterações'
                )}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
