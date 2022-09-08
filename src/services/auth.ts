import helper, {Http} from '../helpers/http'
import passport from './passport'
import {parse} from 'cookie'

const auth = ({req, res}: Http) =>
    new Promise(resolve => {

        // Get AUTH_TOKEN from cookie if request is coming from the browser and authorization is not set
        if (!req.headers.authorization) {
            const {_25, _465, _587, _2525} = parse(req.headers?.cookie ?? '')
            if (_25 || _465 || _587 || _2525) req.headers.authorization = _25 || _465 || _587 || _2525
        }

        passport.authenticate('jwt', {session: false}, async (e, payload) => {
            if (e) return helper.response(res, 'unknown', e)
            if (!payload) return helper.response(res, 'unauthorised')

            req.user = payload

            resolve(payload)
        })(req, res)
    })

export default auth
