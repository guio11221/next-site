import axios from 'axios'
import https from 'https'

const instance = axios.create({ // tirar o problema da autorização..!!
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

class NfeIo {
  constructor() {
   this.apiCnpj = `https://www.receitaws.com.br/v1/cnpj`
  }
  async cnpj(cnpj) {

    
    try {
      const response = await instance.get(`${this.apiCnpj}/${cnpj}`)
      return response.data

    } catch (error) {

      console.error(error)

      return error.response.data.message
    }
  }
}


export default NfeIo