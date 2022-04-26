import { UserCreationAttributes } from "../types/user";
import { UserInstance } from "../models/users"; // ???

class UserPolicy {
  constructor(private currentUser: UserInstance) {}

  canCreate(UserAttributes: UserCreationAttributes) {
    // if (this.currentUser.isCustomerAdmin()) {
    //     return (
    //         Number(UserAttributes.organization_id) === Number(this.currentUser.organization_id)
    //     )
    // }
    if (this.currentUser.isSuperAdmin()) {
      return this.currentUser.isSuperAdmin();
    }
  }

  canlist() {
    return !!this.currentUser;   // ???
  }

  canUpdate() {
    return this.currentUser.isSuperAdmin();   //
  }

  canDelete() {
    return this.currentUser.isSuperAdmin();
  }
}

export default UserPolicy;
