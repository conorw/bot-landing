import Airtable from 'airtable'
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY! }).base(process.env.AIRTABLE_BASE!)

  /* eslint-disable no-param-reassign */
import { NowRequest, NowResponse } from '@vercel/node'


const getBots = async () => {
  try {
    const exists = await base('bots').select().all()
    return exists.map(t => t.fields)
  } catch (error){
    console.log(error)
  }
}

export default async (req: NowRequest, res: NowResponse) => {
    /* On GET request return the information about the agent */
    if (req.method == 'GET'){
        try {
            const bots = await getBots()
            res.send(bots)
        } catch (error){
            res.statusCode = 500
            res.send(error.message)
        }
    } else if (req.method == 'OPTIONS'){
        /* Pass pre-flight HTTP check */
        res.send(200)
    } else {
        /* Send 404 on undefined method */
        res.send(404)
    }
}
