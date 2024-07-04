import { z } from "zod";

export const getCountSchema = z.object({
  id: z.string(),
});

export const updateCountSchema = z.object({
  id: z.string(),
});

export const createCommentSchema = z.object({
  name: z.string(),
  comment: z.string(),
});
