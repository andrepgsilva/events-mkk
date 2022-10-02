export const actions =  {
  async nuxtServerInit ({ commit, dispatch, state }: { commit: any, dispatch: any, state: any}, { req }: { req: any }) {
    await dispatch('events/addEvents');
  }
}
