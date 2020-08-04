# WordsHide

一个加密隐藏文本的工具，通过将文本编码为不可见的`Unicode`控制符，实现对该段文本的隐藏。可将该文本插入到普通文本中，复制粘贴不会丢失，解码后可见。

## 使用

- [示例网页](https://hide.texice.xyz)，使用说明见网页下方
- JavaScript:

```javascript
//首先引入WordsHide.js

//实例化WordsHide对象
var wh = new WordsHide();

var str = "Hello World";	//需要隐藏的文本
var password = "123";	//加密密码

//加密编码，返回隐藏文本
var hidden = wh.hideWithCompress(str, password);//压缩模式
var hidden2 = wh.hideWithUtf8(str, password);//UTF-8编码模式

console.log(hidden);	//输出: ""，不可见
console.log(hidden2);	//输出: ""，不可见

//用对应的方式解码
var str1 = wh.unhideWithCompress(hidden, password);
var str2 = wh.unhideWithUtf8(hidden2, password);

console.log(str1);	//输出: "Hello World"
console.log(str2);	//输出: "Hello World"
```

