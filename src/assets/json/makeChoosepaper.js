const lodash = require('lodash');
const fs = require('fs');
let p = 209
let sub = fs.readFileSync('./choose.txt').toString()
let main = {
  'id': 5,
  'name': "单选练习六",
  'fullcount': 0,
  'topic': [],
  "type": "单项选择题",
  "level": "普通"
}

lodash.times(48/2,i=>add())
main.fullcount=main.topic.length*2
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
        'b': lodash.trim(nowdata.substring(nowdata.indexOf('B.') + 2, nowdata.indexOf('C.') - 2)),
        'c': lodash.trim(nowdata.substring(nowdata.indexOf('C.') + 2, nowdata.indexOf('D.') - 2)),
        'd': lodash.trim(nowdata.substring(nowdata.indexOf('D.') + 2, nowdata.indexOf('"', nowdata.indexOf('D.'))))
      }
    ]
    return moba
  }
  main.topic.push(moban)
  p++
}
fs.writeFile("output.json", JSON.stringify(main), function (err) {

})