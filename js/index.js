new ClipboardJS('.to-copy');
$('.to-copy').click(function () {
    M.toast({
        html: '已复制'
    });
});

var wh = new WordsHide();
$('.start-mixin').click(function () {
    console.time('process');
    var text = $('#textin').val();
    if ($('#if-encrypt')[0].checked) {
        var password = $('#password').val();
    } else {
        var password = '';
    }
    var back = $('#back-mode')[0].checked;
    var ifCompress = $('#if-compress')[0].checked;
    if (back) {
        let match = text.match(wh.symbolsReg);
        let hidden;
        if (match) {
            hidden = match[1];
        } else {
            M.toast({
                html: '未发现隐藏文本'
            });
            return;
        }
        try {
            if (ifCompress) {
                var str = wh.unhideWithCompress(hidden, password);
            } else {
                var str = wh.unhideWithUtf8(hidden, password);
            }
        } catch (e) {
            M.toast({
                html: "解密失败"
            });
            throw e;
        }
        text = text.replace(match[0], str);
    } else {
        if (ifCompress) {
            text = wh.hideWithCompress(text, password);
        } else {
            text = wh.hideWithUtf8(text, password);
        }
        text = '\u0020\u202d' + text + '\u202d\u0020';
    }
    $('pre.result').text(text);
    $('.to-copy').attr('data-clipboard-text', text);
    console.timeEnd('process');
});

$('#if-encrypt').click(function () {
    if ($(this)[0].checked) {
        $('div.password').css('display', 'block');
    } else {
        $('div.password').css('display', 'none');
    }
});

function string2unicode(text, mode2 = false, filter) {
    var result = '';
    if (filter) {
        var reg = new RegExp('[' + filter + ']');
    }
    if (mode2) {
        var list = Array.from(text);
        for (let i of list) {
            if (filter && reg.test(i)) {
                result += i;
            } else {
                result += ustr(i.codePointAt(0));
            }
        }
    } else {
        for (let i in text) {
            if (filter && reg.test(text[i])) {
                result += text[i];
            } else {
                result += ustr(text.charCodeAt(i));
            }
        }
    }
    return result;
}

function ustr(code) {
    var code16 = code.toString(16);
    if (code < 0xf) {
        return "\\u" + "000" + code16;
    } else if (code <= 0xff) {
        return "\\u" + "00" + code16;
    } else if (code <= 0xfff) {
        return "\\u" + "0" + code16;
    } else if (code <= 0xffff) {
        return "\\u" + code16;
    } else {
        return "\\u{" + code16 + "}";
    }
}
