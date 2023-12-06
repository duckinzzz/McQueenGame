import {createStore} from 'vuex'

export default createStore({
    state: {
        access: '',
        refresh: '',
        username: ''

    },
    getters: {},
    mutations: {
        initializeStore(state: { access: (string | null), refresh: (string | null), username: (string | null) }): void {
            if (localStorage.getItem("access")) {
                state.access = localStorage.getItem("access")
                state.refresh = localStorage.getItem("refresh")
            } else {
                state.access = ''
                state.refresh = ''
            }

        },
        setAccess(state: {
            access: (string | null),
            refresh: (string | null),
            username: (string | null)
        }, access): void {
            state.access = access
        },
        setUserName(state: {
            access: (string | null),
            refresh: (string | null),
            username: (string | null)
        }, username): void {
            state.username = username;
        },
        clearUserName(state: {
            access: (string | null),
            refresh: (string | null),
            username: (string | null)
        }, access): void {
            state.username = '';
        },
        setRefresh(state: {
            access: (string | null),
            refresh: (string | null),
            username: (string | null)
        }, refresh): void {
            state.refresh = refresh
        },
        clearAccess(state: { access: (string | null), refresh: (string | null), username: (string | null) }): void {
            state.access = ''
        },
        clearRefresh(state: { access: (string | null), refresh: (string | null), username: (string | null) }): void {
            state.refresh = ''
        }
    },
    actions: {},
    modules: {}
})
