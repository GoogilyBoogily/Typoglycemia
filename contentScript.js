function forEachTextNode(func, node) {
    node = node || document.body;
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType == 3) {
            func(node.childNodes[i]);
        } else if (node.childNodes[i].childNodes) {
            arguments.callee(func, node.childNodes[i]);
        }
    }
}
forEachTextNode(function (node) {
    var src, out, match;
    src = node.textContent;
    out = '';
    while (true) {
        if (match = src.match(/^\w+/)) {
            match = match[0];
            if (match.length > 2) { /* this is where the magic happens */
                out += match[0] + match.substr(1, match.length - 2).split('').sort(function () {
                    return Math.random() * 2 - 1
                }).join('') + match[match.length - 1];
            } else {
                out += match;
            }
            src = src.substr(match.length);
            continue;
        }
        if (match = src.match(/^\W+/)) {
            match = match[0];
            out += match;
            src = src.substr(match.length);
            continue;
        }
        break;
       }
    node.textContent = out;
});