import { defineStore } from 'pinia'


export const useSelStore = defineStore('select', {
  state:()=>{
    return {
      id:NaN,
      trueList:[],
      exem:{
        name:"",
      }
    }
  }
})