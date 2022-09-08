import {NextApiRequest, NextApiResponse} from 'next'

const middleware = (handler: any) => (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) =>
        handler(req, res, (result: any) =>
            result instanceof Error ? reject(result) : resolve(result)))

export default middleware