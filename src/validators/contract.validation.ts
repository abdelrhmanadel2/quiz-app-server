import { date, object, string, TypeOf } from "zod";
export const ContractSchema = object({
  body: object({
    name: string({
      required_error: "Contract name is required",
      invalid_type_error: "Contract name must be String",
    }),
    docNo: string({
      required_error: "Contract number is required",
      invalid_type_error: "Contract number must be String",
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
    line: string({
      required_error: "Contract line is required",
      invalid_type_error: "Contract line must be String",
    }),
    startDate: string({
      required_error: "Contract start date is required",
      invalid_type_error: "Contract start date must be Date",
    }),
    endDate: string({
      required_error: "Contract end date is required",
      invalid_type_error: "Contract end date must be Date",
    }),
    // documentUrl: string({
    //   required_error: "Contract documet Url is required",
    //   invalid_type_error: "Contract documet Url must be String",
    // }),
  }),
});

export type ContractInput = TypeOf<typeof ContractSchema>;
