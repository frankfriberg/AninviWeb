export default async function(context) {
  const { $axios, error, redirect } = context
  return (
    $axios
      .get(`client/${context.params.client}`)
      // TODO: [AN-6] Add client to store
      .then((client) => client)
      .catch((err) => {
        error({ statusCode: err.response.status, message: err.response.data })
      })
  )
}
