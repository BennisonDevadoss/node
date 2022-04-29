import { StringNullableChain } from 'lodash';

export const DEVICE_TYPE = {
  G1: 'G1',
  RASPBERRY_PI: 'Raspberry_Pi',
  VIRTUAL_CPE: 'Virtual CPE',
};

export interface DeviceAttributes {
  name: string;
  uuid: string; // change is on 27/04/2022
  organization_id: bigint;
  type: string;
  lan_interfaces: string[]; // Updated the lan_interface to lan_interfaces
  wan_interfaces: string[]; // Updated the wan_interface to wan_interfaces  ===> Updated to plural
  mac_address: string;
  os_version: string;
  package_version: string;
  latitude: number;
  longitude: number;
  description: string;
}

export type DeviceCreateAttributes = Pick<
  DeviceAttributes,
  | 'name'
  | 'uuid'
  | 'organization_id'
  | 'type'
  | 'latitude'
  | 'longitude'
  | 'description'
>;

export interface DeviceCreateParams {
  name: string;
  uuid: string;
  organization_id: bigint;
  type: string;
  latitude: number;
  longitude: number;
  description: string;
}

// export const DEVICE_TYPE = ['G1', 'Raspberry Pi', 'virtual CPE'];

export interface DeviceProvisionParams {
  lan_interfaces: string[];
  wan_interfaces: string[];
  mac_address: string;
  os_version: string;
  package_version: string;
  model: string;
  uuid: string;
  // update(attributes: DeviceUpdateAttributes);
}

export type DeviceUpdateAttributes = Pick<
  DeviceProvisionParams,
  | 'uuid'
  | 'model'
  | 'os_version'
  | 'mac_address'
  | 'wan_interfaces'
  | 'lan_interfaces'
  | 'package_version'
>;

export interface DeviceUpdateParams {
  lan_interfaces: string[];
  wan_interface: string[];
  mac_address: string;
  os_version: string;
  package_version: string;
  model: string;
  uuid: string;
}

export interface DeviceListQueryParams {
  q?: string;
  page?: number;
  per_page?: number;
  id?: number;
  name?: string;
  uuid?: StringNullableChain;
  lan_interfaces?: string;
  wan_interfaces?: string;
  type?: string;
  mac_address?: string;
  os_version?: string;
  package_version?: string;
  visible_columns?: string;
  organizatoin_id?: number;
  latitude?: number;
  longitude?: number;
  description?: string;
  o_id?: string;
  o_name?: string;
  o_uuid?: string;
  o_lan_interfaces?: string;
  o_wan_interfaces?: string;
  o_organization_id?: number;
  o_type?: string;
  o_mac_address?: string;
  o_os_version?: string;
  o_package_version?: string;
  o_latitude?: number;
  o_longitude?: number;
  o_description?: string;
  o_created_at?: string;
  o_updated_at?: string;
}

export interface DevicePaginator {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  data: DeviceAttributes[];
}

export interface DeivceRowsAndCounts {
  count: number;
  rows: any[];
}
