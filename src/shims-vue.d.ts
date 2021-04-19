declare module '*.vue' {
  import Vue from 'vue'
  import { IState } from './store'
  import { Store } from 'vuex'

  interface Vue {
    // $router: VueRouter // 这表示this下有这个东西
    // $route: Route
    $store: Store<IState>
    // $http: any
    // $Message: any
    // $Modal: any
  }
  interface ComponentCustomProperties {
    $store: Store<IState>
  }
  export default Vue
}
