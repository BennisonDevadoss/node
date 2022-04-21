import { toUpper } from 'lodash';
import Sequelize from 'sequelize'
import { DeviceListQueryParams } from '../../types/device';

const { Op } = Sequelize;

const columnSearchQuery = (query: DeviceListQueryParams) => {
    console.log('column searchQuery function is', query)
    const { name, uuid, id, type, organizatoin_id, mac_address, os_version } = query; // did differently
    const lanInterfaces = toUpper(query.lan_interfaces);
    const wanInterfaces = toUpper(query.wan_interfaces);
    const searchQueries: any = []
    console.log('column search Query ID is', id);
    console.log('column search name in query', name);
    if (id) {
        const idQuery = Sequelize.where(
            Sequelize.cast(Sequelize.col('Device.id'), 'varchar'), {
            [Op.iLike]: `%${id}%`
        }
        );
        searchQueries.push(idQuery)
    }
    if (name) {
        console.log('is name work', name)
        const nameQuery = { name: { [Op.iLike]: `%${name}%` } };
        searchQueries.push(nameQuery)
    }
    if (uuid) {   // hardwareIdQuery
        console.log('is UUID working??', uuid)
        const UUIDQuery = { uuid: uuid };
        searchQueries.push(UUIDQuery)
    }
    if (lanInterfaces) {
        const lanInterfacesQuery = {
            lan_interfaces: { [Op.contains]: [lanInterfaces] }
        };
        searchQueries.push(lanInterfacesQuery);
    }
    if (wanInterfaces) {
        const wanInterfacesQuery = {
            wan_interfaces: { [Op.contains]: [wanInterfaces] }
        };
        searchQueries.push(wanInterfacesQuery)
    }
    if (organizatoin_id)  // did differently....
    {
        const organizationQuery = Sequelize.where(
            Sequelize.cast(Sequelize.col('Device.organization_id'), 'varchar'), {
            [Op.iLike]: `%${organizatoin_id}%`
        })
        searchQueries.push(organizationQuery)
    }
    if (type) {
        const typeQuery = { type: { [Op.iLike]: `%${type}%` } };
        searchQueries.push(typeQuery);
    }
    if (mac_address) {
        const macAddressQuery = {
            mac_address: { [Op.iLike]: `%${query.mac_address}%` }
        };
        searchQueries.push(macAddressQuery)
    }
    if (os_version) {
        const osVersionQuery = {
            osVersion: { [Op.iLike]: `%${os_version}%` }
        };
        searchQueries.push(osVersionQuery);
    }
    if (query.latitude) {
        const latitudeQuery = {
            latitude: { [Op.iLike]: `${query.latitude}` }
        };
        searchQueries.push(latitudeQuery)
    }
    if (query.longitude) {
        const longitudeQuery = {
            longitude: { [Op.iLike]: `${query.longitude}` }
        }
    }
    console.log('column searchQuery is', searchQueries);
    const result = {
        [Op.and]: [searchQueries]
    };

    console.log('Column result is', result)
    return result;
}

export default columnSearchQuery; 
