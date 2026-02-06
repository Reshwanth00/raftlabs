import { z } from "zod";

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      menuId: z.string(),
      quantity: z.number().min(1),
    })
  ),
  customer: z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    phone: z.string().min(10),
  }),
});

export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
