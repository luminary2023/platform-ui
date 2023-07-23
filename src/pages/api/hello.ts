// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { loginRequest } from '../../api/login';
import { cookies } from 'next/headers'

type Data = {
  name: string
}

export default async function longinhandler(
  data
) {
    
const a = await loginRequest(data)
cookies().set('token-test', a.token)

console.log(a, '<<<<>>>>>>>')
return a;
}


