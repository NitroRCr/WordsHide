var wh = new WordsHide();

$().ready(function () {
    setHideMode();
    new ClipboardJS('.back-to-copy,.hide-to-copy');
    $('.back-to-copy,.hide-to-copy').click(function () {
        M.toast({
            html: '已复制'
        });
    });
})

$('.start-mixin').click(function () {
    if ($('#if-encrypt')[0].checked) {
        var password = $('#password').val();
    } else {
        var password = '';
    }
    var ifHide = $('#hide-mode')[0].checked;
    var ifCompress = $('#if-compress')[0].checked;
    if (!ifHide) {
        let input = $('#back-textin').val(),
            text = input,
            match = text.match(wh.SYMBOL_REG),
            hidden;
        if (match) {
            hidden = match[0];
        } else {
            M.toast({
                html: '未发现隐藏文本'
            });
            return;
        }
        try {
            var str = wh.unhide(hidden, password);
        } catch (e) {
            M.toast({
                html: "解密失败"
            });
            throw e;
        }
        text = text.replace(hidden, str);
        $('.back-results .light-text').text(input.replace(hidden, string2unicode(hidden)));
        $('.back-results .result').text(str);
        $('.back-to-copy').attr('data-clipboard-text', text);
    } else {
        let input = $('#hide-textin').val(),
            text = input,
            pre = $('#text-pre').val() || ' ',
            after = $('#text-after').val() || ' ';
        if (ifCompress) {
            text = wh.hideWithCompress(text, password);
        } else {
            text = wh.hideWithUtf8(text, password);
        }
        $('.hide-results .light-text').text(pre + string2unicode(text) + after);
        $('.hide-results .result').text(pre + text + after);
        $('.hide-to-copy').attr('data-clipboard-text', pre + text + after);
    }
});

$('#if-encrypt').click(function () {
    if ($(this)[0].checked) {
        $('div.password').css('display', 'block');
    } else {
        $('div.password').css('display', 'none');
    }
});
$('#hide-mode').click(function () {
    if ($(this)[0].checked) {
        setHideMode();
    }
});
$('#back-mode').click(function () {
    if ($(this)[0].checked) {
        setBackMode();
    }
})

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

function setHideMode() {
    $('div.hide-inputs').css('display', 'block');
    $('div.hide-results').css('display', 'block');
    $('div.back-inputs').css('display', 'none');
    $('div.back-results').css('display', 'none');
    $('.switch>label').css('display', 'block');
}

function setBackMode() {
    $('div.hide-inputs').css('display', 'none');
    $('div.hide-results').css('display', 'none');
    $('div.back-inputs').css('display', 'block');
    $('div.back-results').css('display', 'block');
    $('label.if-compress').css('display', 'none');
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
