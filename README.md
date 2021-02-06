# WordsHide

一个加密隐藏文本的工具，通过将文本编码为不可见的`Unicode`控制符，实现对该段文本的隐藏。可将该文本插入到普通文本中，复制粘贴不会丢失，解码后可见。

## 使用

- [示例网页](https://hide.krytro.com)
- 部署为静态网站
- JavaScript:

```javascript
//由于用到了seedrandom.js和pako.js，必须先引入它们
//然后引入WordsHide.js

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

### 用途

编码隐藏后的文本通常不可见， 但在某些应用（如`QQ PC版`和`windows记事本`）上仍然可以看到控制符。

你可以用隐藏文本加密储存信息，秘密传达消息或是为文章添加隐藏水印等。

### 两种模式

`UTF-8`编码模式将文本以`UTF-8`格式编码为16进制后，再编码为Unicode控制符。

压缩模式会使用[pako.js](https://github.com/nodeca/pako)提供的`gzip`方法将文本压缩为二进制文本（`binaryString`）后，再编码为Unicode控制符。

隐藏后的文本，实际大小会比原文本大得多。对于一般的长文本(>5kB)，它们的大小关系大约如下：

| 文本类型 | 原文本大小 | UTF-8模式隐藏后大小 | 压缩模式隐藏后大小 |
| -------- | ---------- | ------------------- | ------------------ |
| 一般中文 | 1          | 6                   | 3                  |
| 一般英文 | 1          | 6                   | 2                  |

对于长文本，压缩模式可以显著减少隐藏后文本的实际大小；但对于短文本，压缩后文本往往会更长。对于长度大于50的文本，建议使用压缩模式。

### 加密

加密是必选的，你可以将任意文本作为密码。默认密码为空字符串。

加密后文本并不能保证绝对安全，不要尝试用它储存机密性信息。

## 原理

原理上面也有提及。将文本编码为不可见的`Unicode控制符`，实现对文本的隐藏。

所有用到的Unicode控制符：

`\u200b-\u200f`, `\u202a-\u202e`, `\u2060-\u206f`

关于编码和加密的原理，请翻阅源码

## 特别感谢

使用到的开源库：

- [pako](https://github.com/nodeca/pako)
- [seedrandom](https://github.com/davidbau/seedrandom)