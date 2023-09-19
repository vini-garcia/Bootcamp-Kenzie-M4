import handleError from "./handleError.middleware";
import ordination from "./ordination.middleware";
import pagination from "./pagination.middleware";
import validateBody from "./validateBody.middleware";
import verifyIfIdExists from "./verifyIfIdExists.middleware";
import verifyIfNameExists from "./verifyIfNameExists.middleware";

export default {
  handleError,
  validateBody,
  verifyIfIdExists,
  pagination,
  ordination,
  verifyIfNameExists,
};
