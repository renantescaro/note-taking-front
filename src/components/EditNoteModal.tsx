'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, CircularProgress } from '@mui/material';
import { X } from 'lucide-react';
import { useUpdateNote } from '@/hooks/useNotes';
import { createNoteSchema, type CreateNoteData } from '@/schemas/note.schema';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]',
            ' flex items-center justify-center p-4'
          )}
        >
          <Dialog.Content
            className={cn(
              'bg-white rounded-md p-6 shadow-2xl',
              'w-full max-w-[500px] max-h-[90vh]',
              'flex flex-col focus:outline-none',
              'md:w-[80vw] md:max-w-[800px] md:max-h-[85vh]'
            )}
          >
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
              <Dialog.Title className="text-xl font-bold text-gray-900">
                Editar Nota
              </Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-gray-600 outline-none">
                <X size={20} />
              </Dialog.Close>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col flex-1 overflow-hidden"
            >
              <div className="flex flex-col gap-5 py-2 overflow-y-auto pr-1">
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
                  minRows={4}
                  maxRows={10}
                  variant="outlined"
                  {...register('content')}
                  error={!!errors.content}
                  helperText={errors.content?.message}
                />
              </div>

              <div
                className={cn(
                  'flex justify-end gap-3 mt-6 pt-4',
                  'border-t border-gray-100 flex-shrink-0'
                )}
              >
                <Dialog.Close asChild>
                  <Button variant="text" color="inherit">
                    Cancelar
                  </Button>
                </Dialog.Close>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isPending}
                  className={cn(
                    'bg-blue-600 hover:bg-blue-700',
                    'px-6 py-2 normal-case shadow-none'
                  )}
                >
                  {isPending ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Salvar'
                  )}
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
