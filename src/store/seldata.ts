import { defineStore } from 'pinia'


export const useSelStore = defineStore('select', {
  state:()=>{
    return {
      id:NaN,
      trueList:new Array<string>(),
      exem:{
        name:"",
      }
    }
  }
})