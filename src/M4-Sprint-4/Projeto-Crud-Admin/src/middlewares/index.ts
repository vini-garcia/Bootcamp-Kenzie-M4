import handleError from "./handleErrors.middlewares";
import verifyIfTokenIsValid from "./validateToken.middleware";
import validateBody from "./validateBody.middleware";
import verifyEmailAlreadyExists from "./verifyEmailAlreadyExists.middleware";
import verifyIfCourseIsFound from "./verifyIfCourseIsFound.middleware";
import verifyIfUserIdAndCourseIdExists from "./verifyIfUserIdAndCourseIdExists.middleware";
import verifyIfUserIsAdmin from "./verifyIfUserIsAdmin.middleware";

export default {
  handleError,
  verifyIfCourseIsFound,
  verifyIfUserIdAndCourseIdExists,
  verifyIfUserIsAdmin,
  validateBody,
  verifyEmailAlreadyExists,
  verifyIfTokenIsValid,
};
