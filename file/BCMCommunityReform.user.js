// ==UserScript==
// @name         BCM社区魔改
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  try to take over the world!
// @author       IFTC
// @match        https://shequ.codemao.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.body.style.display = "none";
    // 在页面加载完毕后执行的函数
    window.onload = function() {
        setTimeout(() => {
            var nav = document.querySelector('.c-navigator--navigator');
            console.log(nav);
            nav.style.backgroundColor = "lightskyblue";
            var nav1 = document.querySelector('.c-navigator--header-content');
            console.log(nav1);
            nav1.style.backgroundColor = "lightskyblue";
            nav1.style.width = "1272px";
            var nav2 = document.querySelectorAll('.c-navigator--nav_wrap li');
            console.log(nav2);
            nav2.forEach((item)=> {
                item.style.backgroundColor = "lightskyblue";
            })
            var nav3 = document.querySelector('.c-navigator--kn_wrap');
            console.log(nav3);
            nav3.style.backgroundColor = "lightskyblue";
            var nav4 = document.querySelector('.c-navigator--message_wrap');
            console.log(nav4)
            nav4.style.backgroundColor = "lightskyblue";
            var nav5 = document.querySelector('.c-navigator--avatar_wrap');
            console.log(nav5)
            nav5.style.backgroundColor = "lightskyblue";
            var nav6 = document.querySelector('.c-navigator--ide_link');
            console.log(nav6)
            nav6.style.backgroundColor = "lightskyblue";
            nav6.style.width = "96px";
            nav6.innerHTML = `创造模式<div class="c-navigator--drop_down"><div class="c-navigator--cont"><a class="event_target data_report c-navigator--item" data-watch_event="创作-源码编辑器4.0" data-extra_word_one="header点击" data-data_report_btn_name="创作-源码编辑器4.0" href="https://kitten4.codemao.cn" target="_blank"><div class="c-navigator--icon c-navigator--icon_ide4"></div><p class="c-navigator--title">垃圾编辑器4.0</p><p class="c-navigator--description">体验全新升级的垃圾编辑器</p><div class="c-navigator--line"></div></a><a class="event_target data_report c-navigator--item" data-watch_event="创作-源码编辑器" data-extra_word_one="header点击" data-data_report_btn_name="创作-源码编辑器" href="https://kitten.codemao.cn" target="_blank"><div class="c-navigator--icon c-navigator--icon_ide"></div><p class="c-navigator--title">垃圾编辑器</p><p class="c-navigator--description">和搭积木一样有趣的编程</p><div class="c-navigator--line"></div></a><a class="event_target data_report c-navigator--item" data-watch_event="创作-编程猫Nemo" data-extra_word_one="header点击" data-data_report_btn_name="创作-编程猫Nemo" href="https://nemo.codemao.cn?from=community" target="_blank"><div class="c-navigator--icon c-navigator--icon_nemo"></div><p class="c-navigator--title">编程猫尼莫</p><p class="c-navigator--description">手机上的编程创作社区</p><div class="c-navigator--line"></div></a><a class="event_target data_report c-navigator--item" data-watch_event="创作-海龟编辑器" data-extra_word_one="header点击" data-data_report_btn_name="创作-海龟编辑器" href="https://python.codemao.cn" target="_blank"><div class="c-navigator--icon c-navigator--icon_wood"></div><p class="c-navigator--title">王八编辑器</p><p class="c-navigator--description">学习python，如此简单</p><div class="c-navigator--line"></div></a><a class="event_target data_report c-navigator--item" data-watch_event="创作-神奇代码岛" data-extra_word_one="header点击" data-data_report_btn_name="创作-神奇代码岛" href="https://box3.codemao.cn/?filter=common&amp;utm_medium=%E9%A6%96%E9%A1%B5%E4%B8%8B%E6%8B%89&amp;utm_campaign=%E7%A4%BE%E5%8C%BA&amp;_channel_track_key=gZEqlixK" target="_blank"><div class="c-navigator--icon c-navigator--icon_box3"></div><p class="c-navigator--title">盗版MC</p><p class="c-navigator--description">全新多人联机3D创作平台</p><div class="c-navigator--line"></div></a><a class="event_target data_report c-navigator--item" data-watch_event="创作-CoCo编辑器" data-extra_word_one="header点击" data-data_report_btn_name="创作-CoCo编辑器" href="https://coco.codemao.cn" target="_blank"><div class="c-navigator--icon c-navigator--icon_coco"></div><p class="c-navigator--title">奶茶编辑器</p><p class="c-navigator--description">让世界再无难做的APP</p></a></div></div>`;
            var nav7 = document.querySelectorAll('.c-navigator--dropdown li');
            console.log(nav7);
            nav7.forEach((item)=> {
                item.style.backgroundColor = "white";
            })
            var nav8 = document.querySelector('.c-navigator--logo_wrap img');
            console.log(nav8)
            nav8.src = "https://static.codemao.cn/IFTC-Studio/r13XzCQDR.png";
            var nav9 = document.querySelector('.c-navigator--logo_wrap');
            console.log(nav9)
            nav9.href = "https://iftc-xlkj.github.io/Home";
            var home = document.querySelector('.r-home-c-course--homepage_course');
            console.log(home)
            if (home) {
                home.innerHTML = "";
            }
            var home1 = document.querySelector('.r-home-c-novel_area--novel_area');
            console.log(home1)
            if (home1) {
                home1.innerHTML = "";
            }
            var home2 = document.querySelector('.r-home-c-code_tv--novel_area');
            console.log(home2)
            if (home2) {
                home2.innerHTML = "";
            }
            var head = document.head;
            head.innerHTML += `
<link href="https://static.codemao.cn/IFTC-Studio/By9XjA7wR.css" rel="stylesheet">
       `;
            var nav10 = document.querySelectorAll('.c-navigator--nav_wrap li a');
            console.log(nav10);
            nav10[0].innerHTML = "垃圾";
            nav10[1].innerHTML = "更垃圾";
            nav10[2].innerHTML = "废物";
            nav10[3].innerHTML = "废物集聚地";
            nav10[4].innerHTML = "互殴区";
            nav10[5].innerHTML = "百年不更";
            nav10[6].innerHTML = "下NM";
            var nav11 = document.querySelectorAll('.c-navigator--dropdown li a');
            console.log(nav11);
            nav11[0].innerHTML = "百年难遇";
            nav11[1].innerHTML = "没用的东西";
            nav11[2].innerHTML = "下个P";
            nav11[3].innerHTML = "没用";
            nav11[4].innerHTML = "教个der";
            var nav12 = document.querySelector('.c-navigator-c-nemo_download--qrcode');
            console.log(nav12);
            var parent = nav12.parentNode;
            parent.removeChild(nav12);
            var nav13 = document.querySelector('.c-navigator--custom_dropdown p');
            nav13.innerHTML = '下个damn';
            var home3 = document.querySelector('.r-home-c-banner--banner_sub_items');
            console.log(home3);
            if (home3) {
                home3.innerHTML = `<div class="r-home-c-banner--banner_sub_items" style="display: none; background: rgb(245, 245, 245); width: 220px;">
</div>
<div style="visibility: unset;">
    <div class="event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort2 r-home-c-banner--hovered"
        data-watch_event="首页-kitten4-创作" data-extra_word_one="首页点击" data-data_report_btn_name="首页-kitten4-创作"><span
            class="r-home-c-banner--corner_icon r-home-c-banner--new_icon r-home-c-banner--show"></span>
        <div class="r-home-c-banner--block1 r-home-c-banner--sort2"><span
                class="r-home-c-banner--text1 r-home-c-banner--sort2 r-home-c-banner--hovered">垃圾编辑器4.0<i
                    class="r-home-c-banner--icon r-home-c-banner--icon2"></i></span></span></span><span
                class="r-home-c-banner--text2 r-home-c-banner--sort2">体验全新升级的垃圾编辑器</span></div><a href="/course"
            target="_blank"><span class="r-home-c-banner--text3 r-home-c-banner--sort2"><i
                    class="r-home-c-banner--start r-home-c-banner--start2"></i>学习教程</span></a><span
            class="r-home-c-banner--funny r-home-c-banner--funny2"></span>
    </div>
    <div class="event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort1 r-home-c-banner--out"
        data-watch_event="首页-CoCo编辑器-创作" data-extra_word_one="首页点击" data-data_report_btn_name="首页-CoCo编辑器-创作"><span
            class="r-home-c-banner--corner_icon r-home-c-banner--new_icon r-home-c-banner--show"></span>
        <div class="r-home-c-banner--block1 r-home-c-banner--sort1"><span
                class="r-home-c-banner--text1 r-home-c-banner--sort1">奶茶编辑器<i
                    class="r-home-c-banner--icon r-home-c-banner--icon1"></i></span><span
                class="r-home-c-banner--text2 r-home-c-banner--sort1">让世界没有难做的App</span></div><a
            href="https://shequ.codemao.cn/community?board=27" target="_blank"><span
                class="r-home-c-banner--text3 r-home-c-banner--sort1"><i
                    class="r-home-c-banner--start r-home-c-banner--start1"></i>讨论交流</span></a><span
            class="r-home-c-banner--funny r-home-c-banner--funny1"></span>
    </div>
    <div class="event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort3 r-home-c-banner--out"
        data-watch_event="首页-Box3-创作" data-extra_word_one="首页点击" data-data_report_btn_name="首页-Box3-创作"><span
            class="r-home-c-banner--corner_icon r-home-c-banner--beta_icon"></span>
        <div class="r-home-c-banner--block1 r-home-c-banner--sort3"><span
                class="r-home-c-banner--text1 r-home-c-banner--sort3">盗版MC<i
                    class="r-home-c-banner--icon r-home-c-banner--icon3"></i></span><span
                class="r-home-c-banner--text2 r-home-c-banner--sort3">全新多人联机3D创作平台</span></div><a
            href="https://shequ.codemao.cn/community?board=3" target="_blank"><span
                class="r-home-c-banner--text3 r-home-c-banner--sort3"><i
                    class="r-home-c-banner--start r-home-c-banner--start3"></i>讨论交流</span></a><span
            class="r-home-c-banner--funny r-home-c-banner--funny3"></span>
    </div>
    <div class="event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort4 r-home-c-banner--out"
        data-watch_event="首页-Wood-创作" data-extra_word_one="首页点击" data-data_report_btn_name="首页-Wood-创作">
        <div class="r-home-c-banner--block1 r-home-c-banner--sort4"><span
                class="r-home-c-banner--text1 r-home-c-banner--sort4">王八编辑器<i
                    class="r-home-c-banner--icon r-home-c-banner--icon4"></i></span><span
                class="r-home-c-banner--text2 r-home-c-banner--sort4">学习python，如此简单</span></div><a
            href="https://python.codemao.cn/course/" target="_blank" rel="noreferrer"><span
                class="r-home-c-banner--text3 r-home-c-banner--sort4"><i
                    class="r-home-c-banner--start r-home-c-banner--start4"></i>学习教程</span></a><span
            class="r-home-c-banner--funny r-home-c-banner--funny4"></span>
    </div>
    <div class="event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort5 r-home-c-banner--out"
        data-watch_event="首页-kitten-创作" data-extra_word_one="首页点击" data-data_report_btn_name="首页-kitten-创作">
        <div class="r-home-c-banner--block1 r-home-c-banner--sort5"><span
                class="r-home-c-banner--text1 r-home-c-banner--sort5">垃圾编辑器<i
                    class="r-home-c-banner--icon r-home-c-banner--icon5"></i></span><span
                class="r-home-c-banner--text2 r-home-c-banner--sort5">和搭积木一样有趣的编程</span></div><span
            class="r-home-c-banner--funny r-home-c-banner--funny5"></span>
    </div>
</div>`;
            }
            var home4 = document.querySelector(".r-home-c-banner--sort2");
            var home5 = document.querySelector(".r-home-c-banner--sort1");
            var home6 = document.querySelector(".r-home-c-banner--sort3");
            var home7 = document.querySelector(".r-home-c-banner--sort4");
            var home8 = document.querySelector(".r-home-c-banner--sort5");
            console.log(home4);
            if (home4) {
                home3.addEventListener('mouseleave', function(event) {
                    home4.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort2 r-home-c-banner--hovered';
                    home5.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort1 r-home-c-banner--out';
                    home6.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort3 r-home-c-banner--out';
                    home7.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort4 r-home-c-banner--out';
                    home8.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort5 r-home-c-banner--out';
                });
                home4.addEventListener('mouseenter', function(event) {
                    home4.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort2 r-home-c-banner--hovered';
                    home5.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort1 r-home-c-banner--out';
                    home6.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort3 r-home-c-banner--out';
                    home7.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort4 r-home-c-banner--out';
                    home8.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort5 r-home-c-banner--out';
                });
                home5.addEventListener('mouseenter', function(event) {
                    home4.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort2 r-home-c-banner--out';
                    home5.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort1 r-home-c-banner--hovered';
                    home6.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort3 r-home-c-banner--out';
                    home7.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort4 r-home-c-banner--out';
                    home8.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort5 r-home-c-banner--out';
                });
                home6.addEventListener('mouseenter', function(event) {
                    home4.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort2 r-home-c-banner--out';
                    home5.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort1 r-home-c-banner--out';
                    home6.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort3 r-home-c-banner--hovered';
                    home7.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort4 r-home-c-banner--out';
                    home8.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort5 r-home-c-banner--out';
                });
                home7.addEventListener('mouseenter', function(event) {
                    home4.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort2 r-home-c-banner--out';
                    home5.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort1 r-home-c-banner--out';
                    home6.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort3 r-home-c-banner--out';
                    home7.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort4 r-home-c-banner--hovered';
                    home8.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort5 r-home-c-banner--out';
                });
                home8.addEventListener('mouseenter', function(event) {
                    home4.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort2 r-home-c-banner--out';
                    home5.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort1 r-home-c-banner--out';
                    home6.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort3 r-home-c-banner--out';
                    home7.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort4 r-home-c-banner--out';
                    home8.className = 'event_target data_report r-home-c-banner--banner_sub_item r-home-c-banner--sort5 r-home-c-banner--hovered';
                });
                home4.addEventListener('click', function(event) {
                    window.open('https://kitten4.codemao.cn');
                });
                home5.addEventListener('click', function(event) {
                    window.open('https://coco.codemao.cn');
                });
                home6.addEventListener('click', function(event) {
                    window.open('https://dao3.fun');
                });
                home7.addEventListener('click', function(event) {
                    window.open('https://turtle.codemao.cn');
                });
                home8.addEventListener('click', function(event) {
                    window.open('https://kitten.codemao.cn');
                });
            }
            document.body.style.display = "block";
        }, 1000)
    };
})();