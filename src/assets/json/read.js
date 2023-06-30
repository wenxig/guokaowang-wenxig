const lodash = require('lodash');
const fs = require('fs');
const { log } = require('console');
let arr = []
let p = 1
let sub = fs.readFileSync('./choose.txt').toString()
let chinese=['一']

let main = [
  {
    'id': p,
    'name': p,
    'fullcount': 0,
    'topic': []
  }
]
lodash.times(10,()=>{
  add()
})
function add(){
  let nowdata = sub.substring(sub.indexOf(p), sub.indexOf(p + 1) != -1 ? sub.indexOf(p + 1) - 3 : undefined)
  let moban = {
    'title': nowdata.substring(nowdata.indexOf('"') + 1, nowdata.indexOf('A.') - 1),
    'choose': choose(),
    'true': (nowdata.charAt(nowdata.length - 1)).toLocaleLowerCase()
  }
  function choose() {
    let moba = [
      {
        'a': lodash.trim(nowdata.substring(nowdata.indexOf('A.') + 2, nowdata.indexOf('B.') - 2)),
        'b': nowdata.substring(nowdata.indexOf('B.') + 2, nowdata.indexOf('C.') - 2),
        'c': nowdata.substring(nowdata.indexOf('C.') + 2, nowdata.indexOf('D.') - 2),
        'd': nowdata.substring(nowdata.indexOf('D.') + 2, nowdata.indexOf('"', nowdata.indexOf('D.')))
      }
    ]
    return moba
  }
  main[0].topic.push(moban)
  p++
}
fs.writeFile("output.json", JSON.stringify(main), function (err) {

})