import {encode} from 'jwt-simple'

import {setSession} from '@/services/session'
import helper, {Http} from '@/helpers/http'
import {transform} from '@/helpers/model'
import valid from '@/utils/valid'
import User from '@/models/user'
import fs from '@/utils/fs'

const getToken = (sub: string) =>
    encode({sub, iat: new Date().getTime()}, process.env.JWT_TOKEN!)

const getUser = (user: any) =>
    transform(user?.toObject ? user.toObject() : transform(user))

const Auth = {
    login: helper.request(async ({req, res}: Http) => {
        const {username, password} = req.body

        if (!username) return helper.response(res, 'invalid', 'Username is required')
        if (!password) return helper.response(res, 'invalid', 'Password is required')

        const user = await User.findOne({$or: [ { email: username }, { phone: username } ] })
        if (!user) return helper.response(res, 'invalid', 'Invalid email or phone number')

        const isMatch = await user.comparePasswords(password)
        if (!isMatch) return helper.response(res, 'invalid', 'Password is incorrect')

        const token = getToken(user?.id)

        if (req.headers.session) {
            if (user.accountType === 'corporate') {
                setSession(res, token)
            } else {
                await setSession(res, token)
            }
        }
        return res.send({token, payload: getUser(user)})
    }),
    register: helper.request(async ({req, res}: Http) => {
        const {body} = req
        const {username, email, phone} = body

        const isEmailValid = valid.email(username)
        const isPhoneValid = valid.phone(username)

        body.email = isEmailValid ? username : email
        body.phone = fs.phone(isPhoneValid ? username : phone)

        if (!body.email) delete body.email
        if (!body.phone) delete body.phone

        if (!valid.fields(User, body)) return helper.response(res, 'invalid', 'Fill in all fields')
        if (!(body.email || body.phone)) return helper.response(res, 'invalid', 'Invalid email or phone number')

        const cond = []
        if (body.phone) cond.push({phone: body.phone})
        if (body.email) cond.push({email: body.email})

        const isMatch: any = await User.findOne({ $or: cond }).lean()

        if (isMatch) return helper.response(res, 'conflict', `User with ${isMatch?.email === body.email ? 'email' : isMatch?.phone === body.phone ? 'phone' : 'username'}`)

        const user = await User.create(body)

        if (!user) return
        const token = getToken(user?.id)

        if (req.headers.session) await setSession(res, token)
        return res.send({token, payload: getUser(user)})
    })
}

export default Auth
