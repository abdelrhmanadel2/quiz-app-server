import { object, string, TypeOf } from "zod";
export const ClientSchema = object({
  body: object({
    name: string({
      required_error: "Client name is required",
      invalid_type_error: "Client name must be String",
    }),
  }),
});

export type ClientInput = TypeOf<typeof ClientSchema>;
