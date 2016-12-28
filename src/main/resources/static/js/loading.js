'use strict';

function Loading() {
}
Loading.prototype = {
    gLoading: {
        isStart: false,
        textElement: "",
        loadingDiv: ""
    },
    /**
     * 启动加载框
     * @returns {Loading}
     */
    start: function () {
        if (this.gLoading.isStart) {
            return;
        }
        this.gLoading.isStart = true;
        var loadImg = "url(data:image/png;base64,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)";
        var screenHeight = document.documentElement.clientHeight;
        //--------最外层div-------
        var loadingDiv = document.createElement('div');
        this.gLoading.loadingDiv = loadingDiv;
        var firstChild = document.body.firstChild;
        //设置最外层div样式
        setCss(loadingDiv, {
            display: 'table',
            height: screenHeight + 'px',
            width: '100%',
            position: "fixed",
            zIndex: '9999',
            background: "#000000",
            opacity: "0.4",
            filter: "alpha(opacity=50%)"
        });
        //将最外层div添加进body里
        document.body.insertBefore(loadingDiv, firstChild);


        //---------次外层div--------
        var wrapDiv = document.createElement('div');
        setCss(wrapDiv, {
            display: 'table-cell',
            verticalAlign: 'middle',
            textAlign: 'center'
        });
        loadingDiv.appendChild(wrapDiv);


        //---------图片层div---------
        var loadingDivImg = document.createElement('div');
        setCss(loadingDivImg, {
            backgroundImage: loadImg,
            backgroundSize: "cover",
            height: '50px',
            width: '50px',
            display: 'block',
            margin: "0 auto",
            animationName: "loadAction",
            animationDuration: "800ms",
            animationIterationCount: "infinite",
            animationPlayState: "running",
            animationTimingFunction: "linear"
        });
        wrapDiv.appendChild(loadingDivImg);


        //--------文字层div--------
        var loadingTextDiv = document.createElement('div');
        this.gLoading.textElement = loadingTextDiv;
        setCss(loadingTextDiv, {
            color: "#fff",
            marginTop: "20px"
        });
        wrapDiv.appendChild(loadingTextDiv);

        //-------设置keyframe，加载图片的动画-------
        var keyframe = "@keyframes loadAction {from{ transform: rotate(0deg)}to{ transform:rotate(360deg)}";
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '';
        document.getElementsByTagName('head')[0].appendChild(style);
        var stylesheet = document.styleSheets[document.styleSheets.length - 1];
        try {
            stylesheet.insertRule(keyframe, stylesheet.rules.length);
        } catch (e) {
        }
        return this;
    },

    /**
     * 隐藏加载框
     */
    hideLoading: function () {
        if(this.gLoading.loadingDiv.parentNode) {
            this.gLoading.loadingDiv.parentNode.removeChild(this.gLoading.loadingDiv);
        }
        this.gLoading.isStart = false;
    },

    /**
     * 显示文字
     * @param text
     */
    showText: function (text) {
        if (typeof text != "string") {
            return;
        }
        if (this.gLoading.textElement) {
            this.gLoading.textElement.innerHTML = text;
        }
    },

    /**
     * 隐藏文字
     */
    hideText: function () {
        this.gLoading.textElement.innerHTML = "";
    }
};

/**
 * 设置样式
 * @param element
 * @param cssObject
 * @returns {Error}
 */
function setCss(element, cssObject) {
    if (typeof cssObject != "object") {
        return new Error("set Css not object");
    }
    for (var i in cssObject) {
        if (element.style[i] !== undefined) {
            element.style[i] = cssObject[i];
        }
    }
}