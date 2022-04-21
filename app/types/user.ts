export const enum USER_ROLE {
    SUPER_ADMIN = 'Super Admin',
    CUSTOMER_ADMIN = 'Customer Admin'
}

export interface UserAttributes {
    id: bigint,
    name: string,
    email: string,
    role: USER_ROLE,
    organization_id: bigint | null;
    encrypted_password: string;
    created_at: Date;
    updated_at: Date;
    created_by: bigint
}

export type UserCreationAttributes = Pick<
    UserAttributes, 'name' | 'email' | 'created_by' | 'role' | 'organization_id'>;
    