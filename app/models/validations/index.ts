import { isBoolean } from 'lodash';
import { Op } from 'sequelize';

export function isUUIDUnique(this: any, value: string, next: (err?: string) => void) {
  const MODEL = this.constructor;
  if (value) {
    MODEL.findOne({
      where: { uuid: value }
    })
      .then((result) => {
        if (result) {
          return next('UUID should be unique');
        }
        return next();
      })
      .catch(() => next());
  }
  else {
    next();
  }
}
export function isEmailUnique(this: any, value: string, next: (err?: string) => void) {
  const MODEL = this.constructor;
  if (value) {
    MODEL.findOne({ where: { email: { [Op.iLike]: value } } })
      .then((result: unknown) => {
        if (result) {
          return next('Email should be unique')
        }
        return next();
      })
      .catch(() => next())
  }
  else {
    next();
  }
}

export function isBooleanValidation(field: string,
  value: boolean, next: (err?: string) => void) {
  if (!isBoolean(value)) {
    return next(`${field} should be a boolean`)
  }
  return next();
}

export function isNameUnique(this: any, value: string, next: (err?: string) => void) {
  const MODEL = this.constructor;
  if (value) {
    MODEL.findOne({ where: { name: { [Op.iLike]: value } } })
      .then((result: unknown) => {
        if (result) {
          return next('name should be unique')
        }
      })
    return next();
  }
}