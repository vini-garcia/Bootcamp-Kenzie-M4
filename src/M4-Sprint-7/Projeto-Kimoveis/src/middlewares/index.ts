import validateBody from "./validateBody.middleware";
import handleError from "./handleError.middleware";
import verifyIfAddressExists from "./verifyIfAddressExists.middleware";
import verifyIfCategoryIdExists from "./verifyIfCategoryIdExists.middleware";
import verifyIfCategoryNameExists from "./verifyIfCategoryNameExists.middleware";
import verifyIfEmailExists from "./verifyIfEmailExists.middleware";
import verifyIfIsCommercialHour from "./verifyIfIsCommercialHour.middleware";
import verifyIfIsWeekDay from "./verifyIfIsWeekDay.middleware";
import verifyIfRealEstateHaveFreeSchedule from "./verifyIfRealEstateHaveFreeSchedule.middleware";
import verifyIfRealEstateIdExists from "./verifyIfRealEstateIdExists.middleware";
import verifyIfTokenIsValid from "./verifyIfTokenIsValid.middleware";
import verifyIfUserHaveFreeSchedule from "./verifyIfUserHaveFreeSchedule.middleware";
import verifyIfUserIdExists from "./verifyIfUserIdExists.middleware";
import verifyIfUserIsAdmin from "./verifyIfUserIsAdmin.middleware";
import ensureEmailExists from "./ensureEmailExists.middleware";

export {
  validateBody,
  handleError,
  verifyIfAddressExists,
  verifyIfCategoryIdExists,
  verifyIfCategoryNameExists,
  verifyIfEmailExists,
  ensureEmailExists,
  verifyIfIsCommercialHour,
  verifyIfIsWeekDay,
  verifyIfRealEstateHaveFreeSchedule,
  verifyIfRealEstateIdExists,
  verifyIfTokenIsValid,
  verifyIfUserHaveFreeSchedule,
  verifyIfUserIdExists,
  verifyIfUserIsAdmin,
};
