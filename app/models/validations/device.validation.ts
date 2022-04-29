import { includes } from "lodash";
import { DEVICE_TYPE } from "../../config";

export function isTypeValidation(value: string, next: (err?: string) => void) {
  if (value) {
    if (!includes(DEVICE_TYPE, value)) {
      next(`Device type should be any one of the ${DEVICE_TYPE}`);
    } else {
      next();
    }
  } else {
    next();
  }
}
