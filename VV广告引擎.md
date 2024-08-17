# VV广告引擎
---
[![VV广告引擎](https://static.codemao.cn/IFTC-Studio/By-nD9aqR.png "VV广告引擎")](https://static.codemao.cn/IFTC-Studio/By-nD9aqR.png "VV广告引擎")

VV广告引擎有IFTC（星联科技集团【工作室】）主持制作。

接入VV广告引擎只有JS类SDK，也就是说只有网页或使用Web前端编写的Android、OS或Windows应用可用。

[VV广告引擎广告添加申请](https://docs.qq.com/form/page/DR1NoVFV3T2pjaGpP)

###### 广告添加申请须知：
1. 每人第一次第一个月添加广告为免费
2. 后期添加需支付10RMB/个/月
3. 活动可能会推出限时免费
4. 如果到期1周后人仍不续费，将移除广告，如果还要，需要重新申请
5. 投放广告可赚1RMB/月

JS类SDK：https://iftc-xlkj.github.io/vvads.js

## 调用方法

```JavaScript
const ads = new vvads(); //创建一个实例

ads.get() //获取广告列表，可传入一个参数
    .then(json => {
        ads.render(); //渲染广告
    });
/*
get()方法参数：
参数1：
    名称：n
    类型：int
    默认值：10
    必填：否
    说明：需要返回广告的个数（随机）
*/
```