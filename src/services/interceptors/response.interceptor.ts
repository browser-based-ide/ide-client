import { AxiosError } from "axios";
import { loggerService } from "../logger";
import { helper } from "../../app/shared/utils";


interface IServerError {
  code: number;
  message: string;
}

const responseInterceptor = async (err: AxiosError<IServerError>) => {
  let parsedError = helper.getPropertyValue<IServerError>(err, "response.data");

  if (!parsedError) {
    parsedError = {
      code: helper.getPropertyValue<number>(err, "response.status"),
      message: err.message,
    };
  }

  // throw an error to services/ components
  loggerService.error("responseInterceptor", err);
  return await Promise.reject<IServerError>(parsedError);
};

export default responseInterceptor;
