/* eslint-disable */
(function () {
    var scriptHost = (function (scripts) {
        var script = document.getElementById('iwaiter-popup'),
            fullsrc;

        if (script.getAttribute.length !== undefined) {
            src = script.src
        } else {
            src = script.getAttribute('src', -1)
        }

        return src.replace(/(http:\/\/.*?\/).*/g, '$1');
    }());

    function getCurrentScript() {
        var scripts = document.getElementsByTagName('script'),
            script = scripts[scripts.length - 1];
        return script;
    }

    function downloadPlugins() {
        var script = getCurrentScript();
        var mobileDetectScript = document.createElement('script');
        mobileDetectScript.src = scriptHost + "bower_components/mobile-detect/mobile-detect.js";
        script.parentNode.insertBefore(mobileDetectScript, script);

        var modalScript = document.createElement('script');
        modalScript.src = scriptHost + "scripts/other/jsModal-master/js/jsmodal-1.0d.js";
        script.parentNode.insertBefore(modalScript, script);

        var headID = document.getElementsByTagName("head")[0];
        var cssNode = document.createElement('link');
        cssNode.rel = 'stylesheet';
        cssNode.href = scriptHost + 'scripts/other/jsModal-master/css/jsmodal-dark.css';
        headID.appendChild(cssNode);
    }

    downloadPlugins();
}());

function iwaiterPopup(width, height) {
    var md = new MobileDetect(window.navigator.userAgent);
    var displayHeight = document.documentElement.clientHeight;
    var width, height;
    console.log(displayHeight);
    // set popup height 100% for small screens
    if (displayHeight < 700) {
        height = "90vh"
    } else {
        height = height || "70vh";
    }
    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;//width || "1020px";
    var scriptHost = (function (scripts) {
        var script = document.getElementById('iwaiter-popup'),
            fullsrc;

        if (script.getAttribute.length !== undefined) {
            src = script.src
        } else {
            src = script.getAttribute('src', -1)
        }

        return src.replace(/(http:\/\/.*?\/).*/g, '$1');
    }());

    function getCurrentScript() {
        var scripts = document.getElementsByTagName('script'),
            script = scripts[scripts.length - 1];
        return script;
    }

    if (md.mobile()) {
        document.location.href = scriptHost;
    } else {
        Modal.open({
            content: '<iframe id="main-ifr" src="' + scriptHost + 'popup" width="100%" height="100%"></iframe>',
            draggable: true,
            width: '100%',
            height: '100%',
            openCallback: function () {
                try {
                    var gobj = window[window.GoogleAnalyticsObject];
                    var iframe = document.getElementById("main-ifr");
                    var tracker, linker;
                    if (gobj) {
                        tracker = gobj.getAll()[0];
                        linker = new window.gaplugins.Linker(tracker);
                        iframe.src = linker.decorate(iframe.src);
                    }
                } catch (e) { }

                var elem = document.getElementsByTagName("body")[0];
                elem.style.overflowY = 'hidden';

                var modalElem = document.getElementById("modal-container");
                modalElem.style.top = '0px';
                modalElem.style.left = '0px';

                var closeButton = document.getElementById('modal-close');
                closeButton.style.width = '16px';
                closeButton.style.height = '16px';
                closeButton.style.position = 'fixed';
                closeButton.style.right = '0px';
                closeButton.style.marginRight = '8px';

            },
            closeCallback: function () {
                var elem = document.getElementsByTagName("body")[0];
                elem.style.overflowY = 'scroll';
            }
        })
    }

    console.log('Host', scriptHost);
    // Modal.open({
    //     content: '<iframe src="' + scriptHost + 'popup" width="100%" height="100%"></iframe>',
    //     draggable: true,
    //     width: width,
    //     height: height
    // })
};
//load event listener,so we can have more of them as opposed to window.onload!

function defaultButtons() {
    //Define default class and id for elements that will open the popup
    var fetchById = document.getElementById("yoyoButton");
    var fetchByClass = document.getElementsByClassName("yoyoButton");
    var classButtons = Array.prototype.slice.call(fetchByClass);
    if (fetchById != null) {
        classButtons.push(fetchById);
    }
    if (classButtons.length > 0) {
        for (var i = 0; i < classButtons.length; i++) {
            classButtons[i].addEventListener("click", function (event) {
                event.preventDefault();
                iwaiterPopup();
            });
        }
    };
}
// function urlCheck() {
//     var modalCont = document.getElementById("modal-container");
//     function indexCheck() {
//         Looks for parameter in link, opens popup if parameter is present
//         if ((window.location.href).indexOf("orderNow") > -1) {
//             iwaiterPopup();
//         };
//     };
//     if (document.body.contains(modalCont)) {
//         indexCheck();
//     } else {
//         setTimeout(function () {
//             indexCheck();
//         }, 300);
//     }
// }