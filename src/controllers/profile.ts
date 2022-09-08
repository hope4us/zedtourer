import helper, {Http} from '@/helpers/http'

const Profile = {
    get: helper.request(async ({req, res}: Http) => res.send(req.user))
}

export default Profile