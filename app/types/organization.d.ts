export interface OrganizationAttributes {
    id: bigint;
    name: string;
    description: string;
    created_by: bigint;
    updated_by: bigint;
    deleted_by: bigint;
    devices_count: number;
    provisioned_devices_count: number;
    client_email: string;
    client_name: string;
    client_mobile_no: string;
    client_address: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

export type OrganizationCreationAttributes = Pick<
    OrganizationAttributes,
    'name' | 'description' | 'created_by' | 'client_email' |
    'client_mobile_no' | 'client_name' | 'client_address'
>;