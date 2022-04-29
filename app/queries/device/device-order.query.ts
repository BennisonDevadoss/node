import { DeviceListQueryParams } from '../../types/device';

const orderColumnQuery = (query: DeviceListQueryParams) => {
  const id = query.o_id;
  const name = query.o_name;
  const uuid = query.o_uuid;
  const lanInterfaces = query.o_lan_interfaces;
  const wanInterfaces = query.o_wan_interfaces;
  const organizatoinId = query.o_organization_id;
  const type = query.o_type;
  const macAddress = query.o_mac_address;
  const osVersion = query.o_os_version;
  const latitude = query.o_latitude;
  const longitude = query.o_longitude;
  const description = query.o_description;
  const createdAt = query.o_created_at;
  const updatedAt = query.o_updated_at;
  const orders: any = [];

  if (name) {
    orders.push(['name', name]);
  }
  if (uuid) {
    orders.push(['uuid', uuid]);
  }
  if (lanInterfaces) {
    orders.push(['lan_interfaces', lanInterfaces]);
  }
  if (wanInterfaces) {
    orders.push(['wan_interfaces', wanInterfaces]);
  }
  if (createdAt) {
    orders.push(['created_at', createdAt]);
  }
  if (updatedAt) {
    orders.push(['updated_at', updatedAt]);
  } else {
    orders.push(['updated_at', 'DESC']);
  }
  if (organizatoinId) {
    orders.push(['organization_id', organizatoinId]);
  }
  if (type) {
    orders.push(['type', type]);
  }
  if (macAddress) {
    orders.push(['mac_address', macAddress]);
  }
  if (osVersion) {
    orders.push(['os_version', osVersion]);
  }
  if (latitude) {
    orders.push(['latitude', latitude]);
  }
  if (longitude) {
    orders.push(['longitude', longitude]);
  }
  if (description) {
    orders.push(['description', description]);
  }
  if (id) {
    orders.push(['id', id]);
  } else {
    orders.push(['id', 'DESC']);
  }
  return orders;
};

export default orderColumnQuery;
