// /home/bennison/myLearning/crud/app/queries/device/device-global-search.query.ts
import { DeviceListQueryParams } from "../../types/device";
import { split, intersection, includes } from "lodash";
import Sequelize from "sequelize";

const { Op } = Sequelize;

const globalSearchQuery = (query: DeviceListQueryParams) => {
  const text = query.q;
  const defaultColumns = [
    "id",
    "name",
    "uuid",
    "lan_interfaces",
    "wan_interfaces",
    "organization_id",
    "type",
    "mac_address",
    "os_version",
    "latitude",
    "longitude",
    "description",
  ];
  const columnsFromUser = query.visible_columns; // work well
  const searchQueries: any = [];
  let visibleColumns = defaultColumns;

  if (columnsFromUser) {
    const splitedColumn = split(columnsFromUser, ",");
    console.log("Splited columns is", splitedColumn); // work well
    visibleColumns = intersection(defaultColumns, splitedColumn);
    console.log("Visible columns is", visibleColumns);
  }

  const isColumnAvailable = (name: string) => includes(visibleColumns, name);
  console.log("isColumnAvailable function", isColumnAvailable("id")); // false
  if (isColumnAvailable("id")) {
    const idQuery = Sequelize.where(
      Sequelize.cast(Sequelize.col("Device.id"), "varchar"),
      {
        [Op.iLike]: `%${text}%`,
      }
    );
    searchQueries.push(idQuery);
  }

  if (isColumnAvailable("name")) {
    const nameQuery = { name: { [Op.iLike]: `%${text}%` } };
    searchQueries.push(nameQuery);
  }

  if (isColumnAvailable("uuid")) {
    const UUIDQuery = { name: { [Op.iLike]: `%${text}%` } };
    searchQueries.push(UUIDQuery);
  }
  if (isColumnAvailable("lan_interfaces")) {
    const lanInterfacesQuery = { lan_interfaces: { [Op.contains]: [text] } };
    searchQueries.push(lanInterfacesQuery);
  }
  if (isColumnAvailable("wan_interfaces")) {
    const wanInterfacesQuery = { wan_interfaces: { [Op.contains]: [text] } };
    searchQueries.push(wanInterfacesQuery);
  }
  if (isColumnAvailable("organization_id")) {
    const organizationIdQuery = Sequelize.where(
      Sequelize.cast(Sequelize.col("Device.organization_id"), "varchar"),
      {
        [Op.iLike]: `%${text}%`,
      }
    );
    searchQueries.push(organizationIdQuery);
  }
  if (isColumnAvailable("type")) {
    const typeQuery = { type: { [Op.iLike]: `%${text}%` } };
    searchQueries.push(typeQuery);
  }
  if (isColumnAvailable("mac_address")) {
    const macAddressAuery = { mac_address: { [Op.iLike]: `%${text}%` } };
    searchQueries.push(macAddressAuery);
  }
  if (isColumnAvailable("os_version")) {
    const osVersionQuery = { os_version: { [Op.iLike]: `%${text}%` } };
    searchQueries.push(osVersionQuery);
  }
  if (isColumnAvailable("latitude")) {
    const latitudeQuery = Sequelize.where(
      Sequelize.cast(Sequelize.col("Device.latitude"), "varchar"),
      {
        [Op.iLike]: `%${text}%`,
      }
    );
    searchQueries.push(latitudeQuery);
  }
  if (isColumnAvailable("longitude")) {
    const longitudeQuery = Sequelize.where(
      Sequelize.cast(Sequelize.col("Device.longitude"), "varchar"),
      {
        [Op.iLike]: `%${text}%`,
      }
    );
    searchQueries.push(longitudeQuery);
  }

  if (isColumnAvailable("description")) {
    const descriptionQuery = {
      description: {
        [Op.iLike]: `%${text}%`,
      },
    };
    searchQueries.push(descriptionQuery);
  }

  console.log("Search query is ", searchQueries);
  const result = {
    [Op.or]: searchQueries,
  };

  console.log("Global search result is", result);
  return result;
};

export default globalSearchQuery;

//   /home/bennison/myLearning/crud/app/queries/device/device-global-search.query.ts
