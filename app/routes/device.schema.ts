const createDeviceSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['device'],
            properties: {
                device: {
                    type: 'object',
                    required: ['name', 'uuid', 'organization_id', 'type'],
                    properties: {
                        name: { type: 'string' },
                        uuid: { type: 'string' },
                        organization_id: { type: 'number' },
                        type: { type: 'string' },
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        description: { type: 'string' }
                    }
                }
            }
        }
    },
    response: {
        201: {
            description: 'Successful response',
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                uuid: { type: 'string' },
                type: { type: 'string' },
                latitude: { type: 'number' },
                longitude: { type: 'number' },
                description: { type: 'string' }
            }
        }
    },
    422: {
        description: 'Validation error!!',
        type: 'object',
        properties: {
            errors: { type: 'string', items: { type: 'string' } }
        }
    },
    500: {
        description: 'Something went wrong',
        type: 'Object',
        properties: {
            errors: { type: 'string', items: { type: 'string' } }
        }
    }
}

const updateDeviceSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['provisioningDetail'],
            properties: {
                provisioningDetail: {
                    type: 'object',
                    required: ['uuid', 'model', 'lan_interfaces', 'wan_interfaces', 'os_version', 'package_version'],
                    properties: {
                        uuid: { type: 'number' },
                        model: { type: 'string' },
                        lan_interfaces: { type: 'array' },
                        wan_interfaces: { type: 'array' },
                        os_version: { type: 'string' },
                        package_version: { type: 'string' }
                    }
                }
            }
        },
        response: {
            201: {
                description: 'Successful response',
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    uuid: { type: 'number' },
                    name: { type: 'string' },
                    type: { type: 'string' },
                    lan_interfaces: { type: 'array' },
                    wan_interfaces: { type: 'array' },
                    os_version: { type: 'string' },
                    package_version: { type: 'number' },
                    description: { type: 'string' }
                }
            },
            422: {
                description: 'Validataion Error!!',
                type: 'object',
                properties: {
                    error: { type: 'string', items: { type: 'string' } }
                }
            },
            500: {
                description: 'Something went to worng',
                type: 'object',
                properties: {
                    error: { type: 'string', items: { type: 'string' } }
                }
            }
        }
    }
}

const listDeviceSchema = {
    schema: {
        // description: 'Request',
        // type: 'object',
        // properties: {
        querystring: {
            type: 'object',
            properties: {
                page: { type: 'number' },
                perPage: { type: 'number' },
                q: { type: 'string' },
                id: { type: 'number' },
                name: { type: 'string' },
                uuid: { type: 'string' },
                organization_id: { type: 'string' },
                type: { type: 'string' },
                lan_interfaces: { type: 'string' },
                wan_interfaces: { type: 'string' },
                os_version: { type: 'string' },
                package_version: { type: 'string' },
                mac_address: { type: 'string' },
                latitude: { type: 'number' },
                longitude: { type: 'number' },
                description: { type: 'string' }
            }
        }
    }
}
// }
export {
    createDeviceSchema,
    updateDeviceSchema,
    listDeviceSchema
}
