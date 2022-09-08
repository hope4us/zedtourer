import {NextApiRequest, NextApiResponse} from 'next'
import Auth from '@/controllers/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            await Auth.login({req, res})
            break
        default:
            res.status(400).json({success: false})
            break
    }
}
