import { z } from "zod";
import { addressCreateSchema, addressSchema } from "../schemas/addresses.schemas";

type Address = z.infer<typeof addressSchema>;

type AddressCreate = z.infer<typeof addressCreateSchema>;

export { Address, AddressCreate };
