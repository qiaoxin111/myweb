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
    width: number
    height: number
    left: number
    top: number
    zIndex: number
    rotate: number
  }
}

export interface IButton extends IComponentsBasic {
  propValue: string
  style: {
    color: string
    fontSize: number
    borderWidth: number
    borderRadius: number
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
// TODO: 这里应该怎么声明
interface CompAndIndex {
  component: IComponents
  index: number
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
    changeComponent(state, data: CompAndIndex) {
      state.canvasList.splice(data.index, 1, data.component)
      // state.canvasList[data.index] = data.component
      // state.canvasList[data.index].style.left = data.component.style.left
      // state.canvasList[data.index].style.top = data.component.style.top
    },
  },
  actions: {},
  modules: {},
})
