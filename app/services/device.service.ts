import { size } from 'lodash';
import { paginate } from '../lib/paginator-result';
import AssociationValidationError from '../lib/validation-association-error-msg';
import db from '../models';
import columnSearchQuery from '../queries/device/device-column-search.query';
import globalSearchQuery from '../queries/device/device-global-search.query';
import orderColumnQuery from '../queries/device/device-order.query';
// import orders from "../queries/device/device-order.query";
import {
  DeviceCreateAttributes,
  DeviceListQueryParams,
  DeviceUpdateAttributes,
} from '../types';

const { Device } = db;
const Q_MINIMUM_SIZE = 1;
/* npm install lodash
npm install --save @types/lodash */

async function getById(id) {
  return await Device.findOne({
    where: {
      uuid: id,
    },
  });
}

async function create(DeviceAttributes: DeviceCreateAttributes) {
  const isDevice = await getById(DeviceAttributes.uuid);
  return await Device.create(DeviceAttributes);
}

async function update(attributes: DeviceUpdateAttributes) {
  const device = await getById(attributes.uuid);
  console.log('Device is ', device);
  if (device && device.type === attributes.model) {
    return await device.update(attributes);
  }
  throw new AssociationValidationError(
      `Device type is not matched to uuid ${attributes.uuid}`
    );

}

function filterAndPagination(query: DeviceListQueryParams) {
  const { q } = query;
  const visibleColumns = query.visible_columns;
  const page = query.page && query.page > 0 ? query.page : 1; // query.page should be provided on the url query
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 2; // query.perpage should be provided on the url query
  const offset = (page - 1) * perPage; // if page is 2 then the offset value is (2 - 1) * perpage(2) ==> 1 * 2 ==> 2  ==> offset = 2
  const limit = perPage;

  const queries = size(q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {}; // do this after
  const columnQuery = columnSearchQuery(query);
  const orders = orderColumnQuery(query);

  return Device.findAndCountAll({
    limit,
    offset,
    where: {
      ...queries,
      ...columnQuery,
    },
    order: orders,
  }).then((devices) => {
    // console.log('Devices is', devices)
    const result = paginate(devices, perPage, page);
    return result;
  });
}

export { create, update, filterAndPagination };
