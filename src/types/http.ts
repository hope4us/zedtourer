import {NextApiRequest, NextApiResponse} from 'next'

export type Req = NextApiRequest & {
    user?: any
    pref?: any
}

type Http = {
    req: Req
    res: NextApiResponse
}

export default Http