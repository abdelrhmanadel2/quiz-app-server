import { object, string, TypeOf } from "zod";
export const ProjectSchema = object({
  body: object({
    orderNo: string({
      required_error: "Order Number is required",
      invalid_type_error: "Order Number must be String",
    }),
    code: string({
      required_error: "Project code is required",
      invalid_type_error: "Project code must be String",
    }),
    contract: object({
      _id: string({
        required_error: "Project contract is required",
        invalid_type_error: "Contract id must be String",
      }),
      name: string({
        required_error: "Project contract is required",
        invalid_type_error: "Contract name must be String",
      }),
      line: string({
        required_error: "line is required",
        invalid_type_error: "line name must be String",
      }),
      owner: object({
        name: string({
          required_error: "Contract owner name is required",
          invalid_type_error: "Contract owner name must be String",
        }),
        _id: string({
          required_error: "Contract owner Id is required",
          invalid_type_error: "Contract owner Id must be String",
        }),
      }),
    }),
    zone: string({
      required_error: "Project zone is required",
      invalid_type_error: "Project zone must be String",
    }),
    refArea: string({
      required_error:
        "Project Referance Area (centeral or server room) is required",
      invalid_type_error: "Referance Area must be String",
    }),
  }),
});

export type createProjectInput = TypeOf<typeof ProjectSchema>;
