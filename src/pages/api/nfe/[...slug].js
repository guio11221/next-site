import NfeIo from "./nfeio";


export default async function XmlPage(req, res) {

  const key = req.query;

  var query = key


  if (key == "") {

    return res.json({ message: 'Parâmetro "key" não fornecido na query ' })
  }


  console.log(key.key)
  const nfe = new NfeIo();
  const result = await nfe.cnpj(key.key)
  console.log(result)
  res.json(result)

}

