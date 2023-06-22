import { defineStore } from 'pinia'


export const useSelStore = defineStore('select', {
  state:()=>{
    return {
      idb:{},
      id:NaN,
      sel:[],
      trueList:[],
      exem:{
        name:"",
      }
    }
  }
})