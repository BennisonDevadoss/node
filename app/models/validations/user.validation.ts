import { USER_ROLES } from "../../config/index";
import { includes, size } from "lodash";
import { PASSWORD_LENGTH } from "../../config";
import { USER_ROLE } from "../../types/user";

export function isPasswordValidation(value: string) {
    if (value) {
        if (size(value) < PASSWORD_LENGTH) {
            throw new Error('password should be greater than or equal to 8')
        }
    }
}

export function isRoleValidation(this: any, value: string, next: (err?: string) => void) {
    if (value) {
        if (!includes(USER_ROLES, value)) {
            return next(`User role should be any one of ${USER_ROLES}`)
        }
        if (this.role === USER_ROLE.CUSTOMER_ADMIN) {
            if (!this.organization_id) {
                return next('Organization should be present')
            }
        }
        if (this.role === USER_ROLE.SUPER_ADMIN) {
            if (this.organization_id) {
                return next('Organization should not be present')
            }
        }
        return next();
    }
    return next();
}

export function isOrgIdValidation(this: any, organizationId: bigint, next: (err?: string) => void) {
    if (organizationId) {
        const Organization = this.sequelize.models.Organization;
        Organization.findOne({
            where: { id: organizationId }
        })
            .then((result) => {
                if (!result) {
                    return next('Invalid organization')
                }
                return next()
            })
            .catch(() => next('Invalid organiation'))
    }
    else {
        return next();
    }
}