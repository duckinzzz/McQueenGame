import {createStore} from 'vuex'

export default createStore({
    state: {
        access: '',
        refresh: '',
    },
    getters: {},
    mutations: {
        initializeStore(state: { access: (string|null), refresh: string }):void {
            if (localStorage.getItem("access")) {
                state.access = localStorage.getItem("access")
            } else {
                state.access = ''
            }

        },
        setAccess(state:{access: (string|null), refresh: string },access):void{
            state.access=access
        }
    },
    actions: {},
    modules: {}
})
