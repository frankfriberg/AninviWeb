import { Middleware } from '@nuxt/types'

const verifyEvent: Middleware = async (context) => {
  const { error, store } = context

  if (!store.state.event) {
    try {
      await store.dispatch('getEventBySlug', context.params.event)
    } catch (err) {
      if (err instanceof Error) return error(err)
      console.log(err)
    }
  }
}

export default verifyEvent
