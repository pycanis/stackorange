import { Request } from "express";

export const getRequiredStringParams = <T extends string>(req: Request, params: T[]): Record<T, string> =>
  params.reduce((acc, param) => {
    const value = req.params[param] ?? req.body?.[param] ?? req.query[param];

    if (typeof value !== "string") {
      throw new Error(`${param} has to be defined and string`);
    }

    acc[param] = value;

    return acc;
  }, {} as Record<T, string>);

  export const getRequiredStringArrayParams = <T extends string>(
    req: Request,
    params: T[]
  ): Record<T, string[]> =>
    params.reduce((acc, param) => {
      const value = req.params[param] ?? req.body?.[param] ?? req.query[param];
  
      if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
        throw new Error(`${param} has to be an array of strings`);
      }
  
      acc[param] = value;
  
      return acc;
    }, {} as Record<T, string[]>);