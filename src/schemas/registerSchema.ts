import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Minimal 6 karakter" }),
  name: z
    .string()
    .min(1, {
      message: "Nama tidak boleh kosong",
    })
    .max(50, {
      message: "Nama maksimal 50 karakter",
    }),
  businessName: z
    .string()
    .min(1, {
      message: "Nama bisnis tidak boleh kosong",
    })
    .max(50, {
      message: "Nama bisnis maksimal 50 karakter",
    }),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Nomor telepon minimal 10 digit",
    })
    .max(15, {
      message: "Nomor telepon maksimal 15 digit",
    }),
});
