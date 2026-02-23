'use client';

import DashboardLayout from '@/components/DashboardLayout';
import CreateNoteModal from '@/components/CreateNoteModal';
import { useNotes } from '@/hooks/useNotes';
import { Plus } from 'lucide-react';
import { Typography, Grid, Skeleton, Fab } from '@mui/material';
import { cn } from '@/lib/utils';
import DashboardCard from '@/components/DashboardCard';

export default function DashboardPage() {
  const { data: notes, isLoading } = useNotes();

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
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={note.id}
              className={cn('w-full')}
            >
              <DashboardCard note={note} />
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
