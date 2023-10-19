import { getOdaiList } from "../../repo/odaiRepo";

export default async function GET(req, res) {
  console.log("getRandomOdai");
  const odais = await getOdaiList();
  const officialOdais = odais.filter((odai) => odai.official === true);
  const randomOdai =
    officialOdais[Math.floor(Math.random() * officialOdais.length)];
  res.status(200).json(randomOdai);
  return;
}
