/*
 * Written by Ole Henrik Stabell - ole@henrikstabell.com
 */

var cs = new CSInterface();
console.log(cs);
var hostEnv = cs.getHostEnvironment();

// Fires when the dom is ready.
document.addEventListener("DOMContentLoaded", function (event) {
    // Perform CSS updates based on users selections
    var appSkin = hostEnv.appSkinInfo.appBarBackgroundColor;

    // DEBUG: In case Audition reports incorrect or out of spectrum colors.
    console.log(appSkin.color.red + " " + appSkin.color.green + " " + appSkin.color.blue);
    var red = Math.round(appSkin.color.red);
    var green = Math.round(appSkin.color.green);
    var blue = Math.round(appSkin.color.blue);
    var colorRGB = "#" + red.toString(16) + green.toString(16) + blue.toString(16);

    document.body.style.background = colorRGB;

    // Modify stylesheet depending on RGB values reported by Audition
    if (appSkin.color.red == "74.9955") {
        swapCSS('dark');
    } else {
        swapCSS('darker');
    }

    cs.addEventListener("com.adobe.csxs.events.ThemeColorChanged", themeChangedEventListener);

});

function themeChangedEventListener(event) {
    // Change background color on Audition preference change
    console.log('background color change detected.');
    changeThemeColor();
}

// Swap the actual CSS files depending on Audition color theme
function swapCSS(cssfilename) {
    if ($("#ccstyleTheme").length)
        $("#ccstyleTheme").remove();
    var link = document.createElement('link');
    $("head").append('<link id="ccstyleTheme" href="css/styles-' +
        cssfilename + '.css" rel="stylesheet" type="text/css" />');
}

// Generate RGB colors from Audition data.
function changeThemeColor() {
    var hostEnv = cs.getHostEnvironment();
    var UIColorObj = new UIColor();

    UIColorObj = hostEnv.appSkinInfo.appBarBackgroundColor;
    var red = Math.round(UIColorObj.color.red);
    var green = Math.round(UIColorObj.color.green);
    var blue = Math.round(UIColorObj.color.blue);
    var alpha = Math.round(UIColorObj.color.alpha);
    var colorRGB = "#" + red.toString(16) + green.toString(16) + blue.toString(16);

    document.body.style.background = colorRGB;

    // Modify stylesheet depending on RGB values reported by Audition
    if (UIColorObj.color.red == "74.9955") {
        swapCSS('dark');
    } else {
        swapCSS('darker');
    }
}

// Invoke extendscript commands using a JS function (saves time when programming.)
function invokeCommand(command) {
    var cs = new CSInterface();
    cs.evalScript('app.invokeCommand(Application.' + command + ')');
}