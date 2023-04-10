import { number, object, string, TypeOf } from "zod";
export const TempEmpSchema = object({
  body: object({
    hrCode: number({
      required_error: "Site name is required",
      invalid_type_error: "Site name must be String",
    }),
    hash: string({
      required_error: "Site code is required",
      invalid_type_error: "Site code must be String",
    }),
    name: object({
      ar: string({
        required_error: "Site contract is required",
        invalid_type_error: "Contract id must be String",
      }),
      en: string({
        required_error: "Site contract is required",
        invalid_type_error: "Contract id must be String",
      }),
    }),
  }),
});

export type createTempEmpInput = TypeOf<typeof TempEmpSchema>;
