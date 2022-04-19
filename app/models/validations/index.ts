import Sequelize from 'sequelize';

export function isUUIDUnique(this: any, value: string, next: (err?: string) => void) {
  const MODEL = this.constructor;
  if (value) {
    MODEL.findOne({
      where: { uuid: { [Sequelize.Op.iLike]: value } }
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
