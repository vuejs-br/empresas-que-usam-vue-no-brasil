import axios from 'axios'

const loadCompanies = async () => {
  const { data } = await axios.get('/data.json')

  return data
}

export { loadCompanies }
