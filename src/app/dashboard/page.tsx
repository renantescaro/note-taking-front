'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import EditNoteModal from '@/components/EditNoteModal';
import DashboardLayout from '@/components/DashboardLayout';
import CreateNoteModal from '@/components/CreateNoteModal';
import { useNotes, useDeleteNote } from '@/hooks/useNotes';
import { Plus } from 'lucide-react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Skeleton,
  Fab,
  IconButton,
} from '@mui/material';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { data: notes, isLoading, error } = useNotes();
  const { mutate: deleteNote } = useDeleteNote();

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <Typography variant="h4" className="font-bold">
          Minhas Notas
        </Typography>
      </div>

      {isLoading ? (
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton
                variant="rectangular"
                height={160}
                className="rounded-xl"
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {notes?.map((note: any) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card
                className={cn(
                  'relative h-full hover:shadow-md',
                  'transition-shadow border',
                  'border-gray-200 rounded-xl overflow-visible'
                )}
              >
                <div className="absolute top-3 right-3 z-10">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <IconButton
                        size="small"
                        className="bg-white/80 hover:bg-white shadow-sm"
                      >
                        <MoreVertical size={18} />
                      </IconButton>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className={cn(
                          'bg-white p-1 rounded-lg shadow-lg',
                          'border border-gray-100 min-w-[140px]',
                          ' z-50 animate-in fade-in zoom-in-95 duration-100'
                        )}
                      >
                        <EditNoteModal
                          note={note}
                          trigger={
                            <DropdownMenu.Item
                              onSelect={(e) => e.preventDefault()}
                              className={cn(
                                'flex items-center gap-2 px-3 py-2',
                                'text-sm text-gray-700 hover:bg-gray-50',
                                'outline-none cursor-pointer rounded-md'
                              )}
                            >
                              <Edit2 size={14} /> Editar
                            </DropdownMenu.Item>
                          }
                        />
                        <DropdownMenu.Item
                          onClick={() => {
                            if (
                              window.confirm(
                                'Tem certeza que deseja excluir esta nota permanentemente?'
                              )
                            ) {
                              deleteNote(note.id);
                            }
                          }}
                          className={cn(
                            'flex items-center gap-2 px-3 py-2',
                            'text-sm text-red-600 hover:bg-red-50',
                            ' outline-none cursor-pointer rounded-md'
                          )}
                        >
                          <Trash2 size={14} /> Excluir
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>

                <CardContent className="pt-6">
                  <Typography
                    variant="h6"
                    className="font-bold mb-2 pr-8 truncate"
                  >
                    {note.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-600 line-clamp-3 mb-4"
                  >
                    {note.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="text-gray-400 block border-t border-gray-50 pt-3"
                  >
                    Atualizado em:{' '}
                    {new Date(note.updated_at).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <CreateNoteModal
        trigger={
          <Fab
            color="primary"
            sx={{ position: 'fixed', bottom: 32, right: 32 }}
            className="bg-blue-600!"
          >
            <Plus />
          </Fab>
        }
      />
    </DashboardLayout>
  );
}
