import {serialize} from 'cookie'
import {NextApiRequest, NextApiResponse} from 'next'

const MAX_AGE = 60 * 60 * 24 // 24 hours

const data: any = {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax'
}

export const setSession = (res: NextApiResponse, token: string) => {
    const cookie = serialize('session', token, data)
    res.setHeader('Set-Cookie', cookie)
}

export const clearSession = (req: NextApiRequest, res: NextApiResponse) => {
    const {name} = req.body
    const cookie = serialize(name, '', {maxAge: -1, path: '/'})
    res.setHeader('Set-Cookie', cookie)
}