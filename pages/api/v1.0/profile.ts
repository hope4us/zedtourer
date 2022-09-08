import {NextApiRequest, NextApiResponse} from 'next'
import Profile from '@/controllers/profile'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await Profile.get({req, res})
            break
        default:
            res.status(400).json({success: false})
            break
    }
}
