import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

type ComponentsTypes = 'qx-button'

export interface IComponentsBasic {
  id: number
  propValue: string
  name: ComponentsTypes
  selected?: boolean
  style: {
    width: string
    height: string
    left: string
    top: string
    zIndex: number
  }
}

export interface IButton extends IComponentsBasic {
  propValue: string
  style: {
    color: string
    fontSize: string
    borderWidth: string
    borderRadius: string
    borderStyle: string
    // textAlign: 'center',
    backgroundColor: string
  } & IComponentsBasic['style']
}

export type IComponents = IButton

export interface IState {
  currentComponent?: IComponents
  canvasList: IComponents[]
  currentIndex?: number
}

export default new Vuex.Store({
  state: {
    currentComponent: undefined,
    canvasList: [],
    currentIndex: undefined,
  } as IState,
  mutations: {
    setCurrentIndex(state, index: number) {
      state.currentIndex = index
    },
    setCurrent(state, component: IComponents) {
      state.currentComponent = component
    },
    addCanvasList(state, component: IComponents): void {
      state.canvasList.push(component)
    },
  },
  actions: {},
  modules: {},
})
