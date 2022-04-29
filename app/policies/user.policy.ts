import { UserCreationAttributes } from "../types/user";
import { UserInstance } from "../models/users"; // ???

class UserPolicy {
  constructor(private currentUser: UserInstance) {}

  canCreate(UserAttributes: UserCreationAttributes) {
    if (this.currentUser.isSuperAdmin()) {
      console.log("create policy permisstion", this.currentUser.isSuperAdmin());
      return this.currentUser.isSuperAdmin();
    }
  }

  canlist() {
    return !!this.currentUser; // ???
  }

  canUpdate() {
    console.log(
      "update policy permission",
      this.currentUser.isSuperAdmin() || this.currentUser.isAdmin()
    );
    return this.currentUser.isSuperAdmin() || this.currentUser.isAdmin(); //
  }

  canDelete() {
    console.log("delete policy permission is", this.currentUser.isSuperAdmin());
    return this.currentUser.isSuperAdmin();
  }
}

export default UserPolicy;
