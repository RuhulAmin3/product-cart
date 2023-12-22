export type IGenericErrMessage = {
  path: string | number;
  message: string;
};

export type IGenericErrorResponse = {
  name: string;
  statusCode: number;
  message: string;
  errorMessages: IGenericErrMessage[];
};
