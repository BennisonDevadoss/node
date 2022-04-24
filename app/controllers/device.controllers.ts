import { FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import * as service from '../services/device.service';
import { DeviceAttributes, DevicePaginator, DeviceUpdateAttributes, DeviceListQueryParams } from '../types'
import { paginatorResult } from '../lib/paginator-result';

interface CreateBody { device: DeviceAttributes }
interface UpdateBody { provisioningDetail: DeviceUpdateAttributes }
function create(req: FastifyRequest, reply: FastifyReply) {
    const { body } = req
    const attribute = (body as CreateBody).device
    service.create(attribute)
        .then((device) => {
            console.log('Device is in the then function', device)
            // if (device)
                reply.code(200).send('Device Created successfully')
        })
        .catch((err) => {
            console.log('error is', err);
            reply.send(err)
        })
}

function update(req: FastifyRequest, reply: FastifyReply) {
    const { body } = req;
    const attributes = (body as UpdateBody).provisioningDetail;
    console.log("attribute is ", attributes);
    service.update(attributes)
        .then((device) => {
            if (device) {
                reply.code(200).send("Device updated successfully!!")
            }
            else {
                reply.code(404).send('Device not found')
            }
        })
        .catch((err: FastifyError) => {
            reply.send(err)
        })
}
function list(req: FastifyRequest, reply: FastifyReply) {

    const query = req.query as DeviceListQueryParams
    console.log('Request query is', query);   //{ q: '1', visible_columns: 'id,name' }
    service.filterAndPagination(query)
        .then((paginator: DevicePaginator) => {
            console.log('paginator is', paginator)  // 
            const devices = paginatorResult(paginator, 'devices');
            console.log('Devices is', devices)
            reply.code(200).send(devices);
        })
        .catch((error: FastifyError) => {
            reply.send(error);
        })
}
export {
    create,
    update,
    list
}
