import { NextApiRequest, NextApiResponse } from "next";

//revalidate 설정

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //revalidate를 설정하려는 페이지 설정
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (err) {
    res.status(500).send("Revalidation Faild");
  }
}
