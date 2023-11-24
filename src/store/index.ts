import {createStore} from 'vuex'

export default createStore({
    state: {
        access: '',
        refresh: '',
    },
    getters: {},
    mutations: {
        initializeStore(state: { access: (string | null), refresh: (string | null) }): void {
            if (localStorage.getItem("access")) {
                state.access = localStorage.getItem("access")
                state.refresh = localStorage.getItem("refresh")
            } else {
                state.access = ''
                state.refresh = ''
            }

        },
        setAccess(state: { access: (string | null), refresh: (string|null) }, access): void {
            state.access = access
        },
        setRefresh(state: { access: (string | null), refresh: (string|null) }, refresh): void {
            state.refresh = refresh

        }
    },
    actions: {},
    modules: {}
})
