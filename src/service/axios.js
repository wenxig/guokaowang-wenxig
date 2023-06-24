export default function post(url, data, callback) {
  if (import.meta.env.DEV) {
    console.log("开发");
    fetch(url, {
      method: "post",
      body: data,
    })
      .then((d) => d.text())
      .then((d) => {
        callback(JSON.parse(convertToJSON(toXmlDom(d))),d);
      });
  } else {
    console.log("生产");
    $.post(
      `http://121.22.72.189:8081/hgqlx${url.substr(4)}`,
      data,
      function (backData) {
        callback(JSON.parse(convertToJSON(backData)),backData);
      }
    );
  }
}

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
            '"' +
              curr_node.nodeName +
              '":"' +
              firstChild.nodeValue +
              '"'
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
