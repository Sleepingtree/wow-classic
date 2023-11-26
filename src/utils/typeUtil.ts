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

export const nullishPredicate = <T>(i: T | null | undefined): i is T => {
  return i !== null && i !== undefined;
};
