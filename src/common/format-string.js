String.prototype.format = function() {
    var s = this;
    for (var i in arguments) {
        var reg = new RegExp("\\{" + i + "\\}", "g");
        s = s.replace(reg, arguments[i]);
    }
    return s;
}