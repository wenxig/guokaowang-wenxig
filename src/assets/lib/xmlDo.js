import allChooses from "@/assets/json/choose.json";

function toXmlDom(source) {
  var xmlDoc = null;
  if (window.ActiveXObject) {
    var ARR_ACTIVEX = [
      "MSXML4.DOMDocument",
      "MSXML3.DOMDocument",
      "MSXML2.DOMDocument",
      "MSXML.DOMDocument",
      "Microsoft.XmlDom",
    ];
    var XmlDomflag = false;
    for (var i = 0; i < ARR_ACTIVEX.length && !XmlDomflag; i++) {
      try {
        var objXML = new ActiveXObject(ARR_ACTIVEX[i]);
        xmlDoc = objXML;
        XmlDomflag = true;
      } catch (e) {}
    }
    if (xmlDoc) {
      xmlDoc.async = false;
      xmlDoc.loadXML(source);
    }
  } else {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(source, "text/xml");
  }
  return xmlDoc;
}
function convertToJSON(xmlDoc) {
  //准备JSON字符串和缓存（提升性能）
  var jsonStr = "";
  var buffer = new Array();

  buffer.push("{");
  //获取xml文档的所有子节点
  var nodeList = xmlDoc.childNodes;

  generate(nodeList);

  /**
   * 中间函数，用于递归解析xml文档对象，并附加到json字符串中
   * @param node_list xml文档的的nodeList
   */
  function generate(node_list) {
    for (var i = 0; i < node_list.length; i++) {
      var curr_node = node_list[i];
      //忽略子节点中的换行和空格
      if (curr_node.nodeType == 3) {
        continue;
      }
      //如果子节点还包括子节点，则继续进行遍历
      if (curr_node.childNodes.length > 1) {
        buffer.push('"' + curr_node.nodeName + '": {');
        generate(curr_node.childNodes);
      } else {
        var firstChild = curr_node.childNodes[0];

        if (firstChild != null) {
          //nodeValue不为null
          buffer.push(
            '"' + curr_node.nodeName + '":"' + firstChild.nodeValue + '"'
          );
        } else {
          //nodeValue为null
          buffer.push('"' + curr_node.nodeName + '":""');
        }
      }
      if (i < node_list.length - 2) {
        buffer.push(",");
      } else {
        break;
      }
    }
    //添加末尾的"}"
    buffer.push("}");
  }

  jsonStr = buffer.join("");
  return jsonStr;
}

function OBJtoXML(obj) {
  var xml = "";
  for (var prop in obj) {
    xml += obj[prop] instanceof Array ? "" : "<" + prop + ">";
    if (obj[prop] instanceof Array) {
      for (var array in obj[prop]) {
        xml += "<" + prop + ">";
        xml += OBJtoXML(new Object(obj[prop][array]));
        xml += "</" + prop + ">";
      }
    } else if (typeof obj[prop] == "object") {
      xml += OBJtoXML(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? "" : "</" + prop + ">";
  }
  var xml = xml.replace(/<\/?[0-9]{1,}>/g, "");
  return xml;
}

function luaToChoose(data) {
  let datas = data.root.RPscoreInfo;
  let dataObj = [];
  // console.log(datas);
  _.times(10, (i) => {
    i = i + 1;
    if (datas.indexOf(`DX${i == 10 ? "10" : `0${i}`}`) != -1) {
      let statr = datas.indexOf(`DX${i == 10 ? 10 : `0${i}`}`);
      let end = datas.indexOf(`^`, statr);
      if (i < 10) {
        console.log("index<10:      ",datas.substring(statr, end == -1 ? undefined : end));
        dataObj[i - 1] = datas.substring(statr, end == -1 ? undefined : end);
      }
      //每一题的lua字符串 030204180338
      else {
        console.log("index!<10:      ",datas.substring(datas.indexOf(`DX10`)));
        dataObj[9] = datas.substring(datas.indexOf(`DX10`));
      }
    } else {
      dataObj[i - 1] = "";
    }
  });
  console.log(dataObj);

  _.each(dataObj, (d, i) => {
    // DX01|4|55.000000|110.00|2.00|2023/6/24 9:03:36|2
    if (d != "") {
      let indexVal = d.indexOf("|");
      let dataTemp = [];
      let tempObj = {};
      for (let i = 0; i < d.length; i++) {
        let charAt = d.charAt(i);
        if (tempObj[charAt]) {
          tempObj[charAt]++;
        } else {
          tempObj[charAt] = 1;
        }
      }
      _.times(tempObj["|"], (j) => {
        let newIndex = d.indexOf("|", indexVal + 1);
        newIndex = newIndex == -1 ? undefined : newIndex;
        let data = d.substring(indexVal + 1, newIndex);
        indexVal = newIndex;
        data = _.toNumber(data);
        dataTemp[j] = data;
      });
      dataObj[i] = {
        all: [dataTemp[1]],
        name: allChooses[i].name,
        times: dataTemp[0],
        height: dataTemp[2],
      };
    } else {
      dataObj[i] = {
        all: [],
        name: allChooses[i].name,
        times: 0,
        type: "no_data",
      };
    }
  });
  return dataObj;
}

export { toXmlDom, OBJtoXML, convertToJSON, luaToChoose };
