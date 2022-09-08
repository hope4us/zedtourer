import passport from 'passport'
import {ExtractJwt, Strategy} from 'passport-jwt'

import User from '@/models/user'

const opt = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_TOKEN
}

passport.serializeUser((user, done) =>
    done(null, user))

passport.deserializeUser((user: any, done) =>
    done(null, user))

passport.use(new Strategy(opt, async (payload: any, done: any) => {
        try {
            const user = await User.findById(payload.sub)
            return done(null, user || false)
        } catch (e) {
            return done(e, false)
        }
    }
))

export default passport