import { defineStore } from 'pinia'


export const useSelStore = defineStore('select', {
  state:()=>{
    return {
      sel:[],
      exem:{
        name:"",
        doTime:NaN
      }
    }
  }
})