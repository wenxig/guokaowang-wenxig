/// <reference types="vite/client" />

type chooseType=  {
  fullcount: number
  id: number
  level: string
  max?: number
  mean?: number
  name: string
  ok?: boolean
  times?: number
  topic: {
    choose: {
      a: string
      b: string
      c: string
      d: string
    }
    title: string
    true: string
  }[]
  type: string
}
type fileTreeType = {
sel?: boolean,
  name: string,
  type: string,
  children: fileTreeType[] | any[]
}