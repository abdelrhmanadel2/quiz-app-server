import { object, string, TypeOf } from "zod";
export const SiteSchema = object({
  body: object({
    name: string({
      required_error: "Site name is required",
      invalid_type_error: "Site name must be String",
    }),
    code: string({
      required_error: "Site code is required",
      invalid_type_error: "Site code must be String",
    }),
    project: string({
      required_error: "Site contract is required",
      invalid_type_error: "Contract id must be String",
    }),
  }),
});

export type createSiteInput = TypeOf<typeof SiteSchema>;
