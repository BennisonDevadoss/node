// import User from "../models/users"
import User from '../models'
import logger from '../logger'
import { generateTokenforTemp } from '../lib/jwt-handler'

function frameUserLog(activity, currentUser) {
    const { organization } = currentUser;
    return {
        activity,
        user_id: currentUser.id,
        user_name: currentUser.name,
        user_role: currentUser.role,
        organization_name: organization?.name || '',
        organization_id: organization?.id || ''
    }
}
async function create(attributes, currentUser) {
    return User.create(attributes)
        .then((user) => {
            const info = frameUserLog('User Creation', currentUser);
            logger.info(info,
                `User ${currentUser.name} (user_id: ${currentUser.id}, role: ${currentUser.role}) has createed a new user ${user.name} (id: ${user.id}, role: ${user.role})`);
            const tokenParams = {
                userId: user.id,
                email: user.email,
                currentSiginInAt: user.current_sigin_in_at // this is not finished yet
            };
            const token = generateTokenforTemp(tokenParams);
            /* Make reset passsword url here and call invitationLink function here */
            return user;

        })
}
export = {
    create,
}
