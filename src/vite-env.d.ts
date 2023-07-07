/// <reference types="vite/client" />
type paperType={
  fullcount: number
  id: number
  level: string
  max?: number
  mean?: number
  name: string
  ok?: boolean
  times?: number
  type: string
}
type chooseType = paperType&{
  
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

}
type fileTreeType = {
  sel?: boolean,
  name: string,
  type: string,
  children: fileTreeType[] | any[]
}
type operateType = paperType&{
  topic: {
    text:string[]
    true: fileTreeType[]
  }
}
