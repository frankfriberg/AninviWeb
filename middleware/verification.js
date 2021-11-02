export default async function(context) {
  const { error, store } = context

  if (!store.state.client) {
    try {
      await store.dispatch('getClientBySlug', context.params.client)
    } catch (err) {
      error({ statusCode: err.response.status, message: err.response.data })
    }
  }
}
