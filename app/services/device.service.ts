import db from '../models';
import { DeviceCreateAttributes, DeviceUpdateAttributes, DeviceListQueryParams } from '../types';
const { Device } = db;
import { DEVICE_TYPE } from '../types'
import { paginate } from '../controllers/lib/paginator-result'
import { size } from 'lodash' // This package doesn't work 
import globalSearchQuery from '../queries/device/device-global-search.query';
import columnSearchQuery from '../queries/device/device-column-search.query';
/* npm install lodash
npm install --save @types/lodash */

const Q_MINIMUM_SIZE = 1;
async function create(DeviceAttributes: DeviceCreateAttributes) {
    // console.log("is create working??", db);
    console.log('Device', DeviceAttributes);
    const currentDevice = await Device
        .findOne({ where: { uuid: DeviceAttributes.uuid } });
    // .then((currentDevice) => {
    console.log('currentDevice is', currentDevice);
    if (!(DeviceAttributes.type === DEVICE_TYPE.G1 || DeviceAttributes.type === DEVICE_TYPE.RASPBERRY_PI || DeviceAttributes.type === DEVICE_TYPE.VIRTUAL_CPE)) {
        throw new Error("Device name is not valid!!")
    }
    if (currentDevice) {
        throw new Error("Device ID already exists!!!")
    }
    return await Device.create(DeviceAttributes);
}

async function update(attributes: DeviceUpdateAttributes) {
    console.log('attributes=================', attributes);
    console.log("attribute.uuid is", attributes.uuid)
    const device = await Device.findOne({
        where: {
            uuid: attributes.uuid
        },
    });
    console.log("Device is ", device);
    if (device) {
        const updateAttributes = {
            lan_interfaces: attributes.lan_interfaces,
            wan_interfaces: attributes.wan_interfaces,
            mac_address: attributes.mac_address,
            os_version: attributes.os_version,
            package_version: attributes.package_version,
            type: attributes.model,
            uuid: attributes.uuid
        }
        console.log('OS_Version is ', updateAttributes);
        console.log('UpdateAttribute is ', updateAttributes.type)
        console.log(device.type === updateAttributes.type)
        if (device.type === updateAttributes.type) {

            console.log("DEVICE IS ", device);
            console.log("db is ", Device);
            console.log('UpdateAttributes: ', updateAttributes)

            await device.update(updateAttributes);
        }
        else {
            throw new Error('Device not found !!!')
        }
    }
    else {
        throw new Error('Device not found!!!');
    }
}

function filterAndPagination(query: DeviceListQueryParams) {
    const { q } = query;
    console.log('query is', q)
    console.log('Visible coulmns is', query.visible_columns);
    const visibleColumns = query.visible_columns
    const page = query.page && query.page > 0 ? query.page : 1;   // query.page should be provided on the url query
    console.log('page is', page)
    const perPage = query.per_page && query.per_page > 0 ? query.per_page : 2  // query.perpage should be provided on the url query
    console.log('Per page is', perPage)
    const offset = (page - 1) * perPage // if page is 2 then the offset value is (2 - 1) * perpage(2) ==> 1 * 2 ==> 2  ==> offset = 2
    const limit = perPage;

    // if (!visibleColumns) {
    //     const devices = {
    //         count: 0,
    //         rows: []
    //     };
    //     console.log('if visible column is null device is', devices)
    //     const result = paginate(devices, perPage, page) // set typescript 
    //     return Promise.resolve(result);
    // }

    const queries = size(q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {}; // do this after
    console.log('Queries validation is true, get output', queries);
    const columnQuery = columnSearchQuery(query)
    console.log('Columns query is', columnQuery);

    return Device.findAndCountAll({
        limit,
        offset,
        where: {
            ...queries, ...columnQuery
        }
    }).then((devices) => {
        // console.log('Devices is', devices)
        const result = paginate(devices, perPage, page);
        return result;
    })
}

export {
    create,
    update,
    filterAndPagination
};
// /home/bennison/myLearning/chiefnet/backend-server-master/app/queries/device/device-global-search.query.ts
