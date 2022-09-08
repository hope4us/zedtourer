import {NextApiResponse} from 'next'
import type Http from '../types/http'
import auth from '../services/auth'
import db from '../lib/db'

type StatusTypes = 'conflict' | 'success' | 'created' | 'forbidden' | 'invalid' | 'not-found' | 'unauthorised' | 'unknown'

const httpHelper = {
    request: (callback: (http: Http) => void) => (http: Http) => new Promise(async (resolve: any) => {
        const {req, res} = http
        try {
            await db.connect()
            if (!/upload|login|re(set|gister)/gi.test(req.url as string)) await auth(http)

            await callback(http)
            return resolve()
        } catch (e) {
            console.error('httpHelper:request', e)
            res.status(500).send({error: 'Something went wrong, try again'})
            return resolve()
        }
    }),
    response: (res: NextApiResponse, status: StatusTypes, ...args: any[]) => {
        const {code, data}: any = {
            success: (s: string, a: any = 'successfully') =>
                ({code: 200, data: {message: s + ' ' + a}}),
            created: (data: any) => ({code: 201, data}),
            unauthorised: (error = 'Unauthorised') => ({code: 401, data: {error}}),
            forbidden: (error = 'Forbidden') => ({code: 403, data: {error}}),
            'not-found': (s1 = 'Record', s2 = 'not found') => ({code: 404, data: {error: s1 + ' ' + s2}}),
            invalid: (error: string) => ({code: 422, data: {error}}),
            conflict: (s1 = 'Record', s2 = 'exists') => ({code: 409, data: {error: s1 + ' ' + s2}}),
            unknown: (e: Error) => {
                if (process.env.NODE_ENV === 'development') console.error(e)
                return {code: 500, data: {error: 'Something went wrong, try again.'}}
            }
            // @ts-ignore
        }[status](...args)

        return res.status(code).send(data)
    }
}

export type {Http}

export default httpHelper
