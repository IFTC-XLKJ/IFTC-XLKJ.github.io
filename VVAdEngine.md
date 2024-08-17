# VV Ad Engine
---
[![VV Ad Engine](https://static.codemao.cn/IFTC-Studio/By-nD9aqR.png "VV Ad Engine")](https://static.codemao.cn/IFTC-Studio/By-nD9aqR.png "VV Ad Engine")

VV Ad Engine produced by IFTC (Interplanetary Federal Technology Clique \[a Studio\]).

Access VV advertising engine only JS class SDK, That is, only Web pages or Android, iOS, or Windows APPs written using a Web front end are available.

[VV Ad Engine Ad add application](https://docs.qq.com/form/page/DR1NoVFV3T2pjaGpP)

###### Guidance Notes for Ad add application:
1. First month per person to add Ad for free
2. Late additions cost 10RMB / month
3. Event may introduce limited-time free
4. If the fee is not renewed after 1 week, the advertisement will be removed. If necessary, you will need to reapply
5. Earn 1 RMB / month for advertising

JS class SDK：https://iftc-xlkj.github.io/vvads.js

## Calling methods

```JavaScript
const ads = new vvads(); //Create a Example

ads.get() //Get the Array of Ads, passing in a parameter
    .then(json => {
        ads.render(); //Render Ads
    });
/*
get() method parameter:
param1:
    name: n
    type: int
    defaultValue: 10
    require: false
    description: Number of Ads to return(random)
*/
```