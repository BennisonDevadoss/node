import { UserInstance } from '../models/users'; // ???
import { UserCreationAttributes } from '../types/user';

class UserPolicy {
  constructor(private currentUser: UserInstance) {}

  public canCreate(UserAttributes: UserCreationAttributes) {
    if (this.currentUser.isSuperAdmin()) {
      console.log('create policy permisstion', this.currentUser.isSuperAdmin());
      return this.currentUser.isSuperAdmin();
    }
  }

  public canlist() {
    return !!this.currentUser; // ???
  }

  public canUpdate() {
    console.log(
      'update policy permission',
      this.currentUser.isSuperAdmin() || this.currentUser.isAdmin()
    );
    return this.currentUser.isSuperAdmin() || this.currentUser.isAdmin(); //
  }

  public canDelete() {
    console.log('delete policy permission is', this.currentUser.isSuperAdmin());
    return this.currentUser.isSuperAdmin();
  }
}

export default UserPolicy;
