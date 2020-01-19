const loadCompanies = async () => {
  const data = await import(/* webpackChunkName: "companies-json" */ '../../../public/data.json')

  return data.default
}

export { loadCompanies }
