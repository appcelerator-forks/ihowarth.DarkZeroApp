function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "navigation/" + s : s.substring(0, index) + "/navigation/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    new (require("alloy/widget"))("navigation");
    this.__widgetId = "navigation";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        layout: "vertical",
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.navBar = Ti.UI.createView({
        height: 60,
        backgroundColor: "#f0f0f0",
        id: "navBar"
    });
    $.__views.container.add($.__views.navBar);
    $.__views.pageTitle = Ti.UI.createLabel({
        bottom: 10,
        color: "#000000",
        id: "pageTitle"
    });
    $.__views.navBar.add($.__views.pageTitle);
    $.__views.leftNavButton = Ti.UI.createImageView({
        left: 10,
        bottom: 10,
        height: 20,
        width: 20,
        id: "leftNavButton"
    });
    $.__views.navBar.add($.__views.leftNavButton);
    $.__views.rightNavButton = Ti.UI.createImageView({
        right: 10,
        bottom: 10,
        height: 20,
        width: 20,
        id: "rightNavButton"
    });
    $.__views.navBar.add($.__views.rightNavButton);
    $.__views.shadow = Ti.UI.createView({
        bottom: 0,
        height: 1,
        backgroundColor: "#909090",
        id: "shadow"
    });
    $.__views.navBar.add($.__views.shadow);
    $.__views.content = Ti.UI.createView({
        id: "content"
    });
    $.__views.container.add($.__views.content);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var pageStack = [];
    var leftButtonStack = {};
    var rightButtonStack = {};
    exports.toggleAnimation = function() {
        animationOn != animationOn;
    };
    exports.editNavView = function(navBar) {
        $.navBar.height = navBar.height;
        $.navBar.backgroundColor = navBar.backgroundColor;
        $.shadow.visible = navBar.shadow;
    };
    exports.newLevel = function(content, left, right) {
        $.pageTitle = content.title || null;
        content.controller && $.content.add(Alloy.createController(content.controller).getView());
        $.leftNavButton.image = left.image || null;
        $.leftNavButton.title = left.title || null;
        $.leftNavButton.visible = left.image || left.title ? true : false;
        $.rightNavButton.image = right.image || null;
        $.rightNavButton.title = right.title || null;
        $.rightNavButton.visible = right.image || right.title ? true : false;
        pageStack.push(content);
        leftButtonStack[content.title] = left;
        rightButtonStack[content.title] = right;
    };
    $.leftNavButton.addEventListener("click", function() {
        var content = pageStack[pageStack.length - 1];
        "open" == leftButtonStack[content.title].callbackType ? $.content.add(Alloy.createController(leftButtonStack[content.title].callback).getView()) : "close" == leftButtonStack[content.title].callbackType || leftButtonStack[content].callback();
    });
    $.rightNavButton.addEventListener("click", function() {
        var content = pageStack[pageStack.length - 1];
        "open" == rightButtonStack[content.title].callbackType ? $.content.add(Alloy.createController(rightButtonStack[content.title].callback).getView()) : "close" == rightButtonStack[content.title].callbackType || rightButtonStack[content].callback();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;