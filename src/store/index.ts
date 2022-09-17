export const actions =  {
  nuxtServerInit ({ commit, dispatch }: { commit: any, dispatch: any}, { req }: { req: any }) {
    dispatch('events/addEvents');
  }
}
