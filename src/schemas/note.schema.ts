import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z
    .string()
    .min(1, 'O título é obrigatório')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
  content: z
    .string()
    .min(1, 'O conteúdo é obrigatório')
    .max(5000, 'A nota é muito longa (máx 1000 caracteres)'),
});

export type CreateNoteData = z.infer<typeof createNoteSchema>;
