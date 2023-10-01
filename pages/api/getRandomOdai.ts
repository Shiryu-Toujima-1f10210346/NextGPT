import { getOdaiList } from "../../repo/odaiRepo";

export default async function GET(req, res) {
  const odais = await getOdaiList();
  const randomOdai = odais[Math.floor(Math.random() * odais.length)];
  res.status(200).json(randomOdai);
  return;
}
