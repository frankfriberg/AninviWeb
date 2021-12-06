const auth = (context) => {
  const { store, redirect } = context

  if (!store.state.auth.user) {
    return redirect('/login')
  }
}

export default auth
