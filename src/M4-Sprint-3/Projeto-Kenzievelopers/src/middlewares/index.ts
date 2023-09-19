import handleError from "./handleErrors.middlewares";
import verifyEmailAlreadyExists from "./verifyEmailAlreadyExists.middleware";
import verifyIfDeveloperIdExists from "./verifyIfDeveloperIdExists.middleware";
import verifyIfDeveloperInfosAlreadyExists from "./verifyIfDeveloperInfosAlreadyExists.middleware";
import verifyIfIdExists from "./verifyIfIdExists.middleware";
import verifyIfPreferredOSExists from "./verifyIfPreferredOSExists.middleware";
import verifyIfProjectIdExists from "./verifyIfProjectIdExists.middleware";

export default {
  handleError,
  verifyIfProjectIdExists,
  verifyEmailAlreadyExists,
  verifyIfIdExists,
  verifyIfDeveloperInfosAlreadyExists,
  verifyIfPreferredOSExists,
  verifyIfDeveloperIdExists,
};
