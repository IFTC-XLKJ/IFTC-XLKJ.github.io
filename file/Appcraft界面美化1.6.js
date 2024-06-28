//冷鱼闲风制作
var document = this.document;
var window = this.window;
const types = {
	isInvisibleWidget: true,
	type: "AppcraftBeautify",
	icon: "https://img.tt98.com/d/file/96kaifa/2019062118246693/004.jpg",
	title: "Appcraft界面美化",
	isGlobalWidget: true,
	properties: [],
	methods: [],
	events: [],
};
types.docs = {
	url: ""
};
types.platforms = ["web"]
class Widget extends InvisibleWidget {
	constructor(props) {
		super(props);

	}

}
types['methods'].push({
	key: 'light_and_dark',
	label: '去CoCo制作按钮',
	params: [{
		key: 'is_dark',
		label: '隐藏',
		valueType: 'boolean',
		defaultValue: true,
	}, ],
}, {
	key: 'BigBackground',
	label: '替换大背景',
	params: [{
		key: 'bg',
		defaultValue: 'https://img.tt98.com/d/file/96kaifa/2019062118246693/004.jpg',
		valueType: 'string',
	}, ],
}, {
	key: 'LeftDistance',
	label: '手机位置',
	params: [{
		key: 'bg',
		defaultValue: -128,
		valueType: 'number',
		label: '左边距',
	}, {
		key: 'bg1',
		defaultValue: -50,
		valueType: 'number',
		label: '上边距',
	}, {
		key: 'bg2',
		defaultValue: 1.2,
		valueType: 'number',
		label: '手机缩放',
	}, ],

}, {
	key: 'PhysicalFunctionality',
	label: '手机物理栏',
	params: [{
		key: 'is_dark',
		label: '隐藏',
		valueType: 'boolean',
		defaultValue: true,
	}, ],
}, {
	key: 'PhoneCase',
	label: '手机壳',
	params: [{
		key: 'is_dark',
		label: '隐藏',
		valueType: 'boolean',
		defaultValue: true,
	}, ],
}, {
	key: 'PhoneFrame',
	label: '手机壳边缘',
	params: [{
		key: 'weigt',
		label: '宽度',
		valueType: 'number',
		defaultValue: 1,
	}, {
		key: 'color',
		label: '颜色',
		valueType: 'color',
		defaultValue: '#fb0404',
	}, {
		key: 'yuan',
		label: '圆角',
		valueType: 'number',
		defaultValue: 25,
	}, ],
}, {
	key: 'PhoneIframe',
	label: '手机屏幕大小',
	params: [{
		key: 'w',
		label: '宽度(px,%)',
		valueType: 'string',
		defaultValue: 'calc(100% - 56px)',
	}, {
		key: 'h',
		label: '高度(px,%)',
		valueType: 'string',
		defaultValue: 'calc(100% - 76px)',
	}, ],
})


Widget.prototype.light_and_dark = function(is_dark, ) {
	is_dark ? GetQueryString() ? document.querySelector("#root > div > div.styles_appUrlBtn__2S9g4")
		.style = "display:none" : document.querySelector("#root > div > div.styles_appUrlBtn__1rsjt")
		.style = "display:none" : null;


}
Widget.prototype.BigBackground = function(bg) {
	document.querySelector("#root > div")
		.style = 'background-image: url(' + bg + ');';
}
Widget.prototype.LeftDistance = function(bg, bg1, bg2) {
	GetQueryString() ? document.querySelector("#root > div > div.styles_main__Simke")
		.style = 'transform: translate(' + bg + '%, ' + bg1 + '%) scale(' + bg2 + ');left: 50%;' : document.querySelector("#root > div > div.styles_main__VRzeV")
		.style = 'transform: translate(' + bg + '%, ' + bg1 + '%) scale(' + bg2 + ');left: 50%;';

}
Widget.prototype.PhysicalFunctionality = function(is_dark) {
	is_dark ? GetQueryString() ? document.querySelector("#root > div > div.styles_main__Simke > div.styles_emulatorWrapper__TNDc-")
		.style = 'display:none' : document.querySelector("#webPlayer > div.styles_emulatorWrapper__1U-3v")
		.style = 'display:none' : null;

}

Widget.prototype.PhoneCase = function(is_dark) {
	is_dark ? GetQueryString() ? document.querySelector("#root > div > div.styles_main__Simke > div.styles_deviceFrame__3X4QA")
		.style = 'background-image: url();' : document.querySelector("#webPlayer > div.styles_deviceFrame__266Il")
		.style = 'background-image: url();' : null;


}
Widget.prototype.PhoneFrame = function(weigt, color, yuan) {
	document.querySelector("#SCREEN_27hxQK2x7")
		.style = 'border: ' + weigt + 'px solid ' + color + ';border-radius: ' + yuan + 'px;';
}
Widget.prototype.PhoneIframe = function(w, h) {
	GetQueryString() ? document.querySelector("#root > div > div.styles_main__Simke")
		.style = 'display: flex;justify-content: center;/*垂直居中*/align-items: center;/*水平居中*/transform: translate(-50%, -50%) scale(1);left: 50%;width: 66vw;height: height: 80vh;' : document.querySelector("#webPlayer")
		.style = 'display: flex;justify-content: center;/*垂直居中*/align-items: center;/*水平居中*/transform: translate(-50%, -50%) scale(1);left: 50%;width: 66vw;height: height: 80vh;';
	GetQueryString() ? document.querySelector("#root > div > div.styles_main__Simke > div.styles_playerWrapper__3f-SH")
		.style = 'width: ' + w + ';height: ' + h + ';' : document.querySelector("#webPlayer")
		.style = 'width: ' + w + ';height: ' + h + ';'



}

function GetQueryString() {
	var reg = new RegExp("(^|&)channel=([^&]*)(&|$)");
	var r = window.location.search.substr(1)
		.match(reg);

	if(r != null) {

		if(r[2] == 'h5') {
			return 0;
		} else {
			return 1;
		}
	} else {
		return null;
	}
}


exports.types = types;
exports.widget = Widget;