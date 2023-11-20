import { ZodFirstPartySchemaTypes, z } from "zod";

export const isZodType = <T extends ZodFirstPartySchemaTypes>(
  a: unknown,
  type: T,
): a is z.infer<typeof type> => {
  return type.safeParse(a).success;
};

export const filterZodTypedArray = <T extends ZodFirstPartySchemaTypes>(
  a: unknown[],
  type: T,
) => {
  return a.filter((item): item is z.infer<typeof type> =>
    isZodType(item, type),
  );
};
