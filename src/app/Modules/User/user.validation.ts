import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(15)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  lastName: z.string().min(1).max(15),
});

const addressValidationSchema = z.object({
  street: z.string({
    required_error: 'Street is required',
    invalid_type_error: 'Street must be a string',
  }),
  city: z.string({
    required_error: 'City is required',
    invalid_type_error: 'City must be a string',
  }),
  country: z.string({
    required_error: 'Country is required',
    invalid_type_error: 'Country must be a string',
  }),
});

const ordersValidationSchema = z.object({
  productName: z.string({
    required_error: 'Product Name is required',
    invalid_type_error: 'Product Name must be a string',
  }),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }),
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number',
  }),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().max(20).min(8),

  fullName: fullNameValidationSchema,

  age: z.number({
    required_error: 'Age is required',
    invalid_type_error: 'Age must be a number',
  }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),

  address: addressValidationSchema,

  orders: z.array(ordersValidationSchema),
});

export default userValidationSchema;
