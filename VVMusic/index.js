var docuemnt = this.document;
var window = this.window;
var pageNum = 1;
var pagesize = 10;
var playicon = '<svg t="1718518330674" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4283" width="30" height="30"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#3D3D3D" p-id="4284"></path></svg>';
var pauseicon = '<svg t="1718518409100" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5269" width="30" height="30"><path d="M128 106.858667C128 94.976 137.621333 85.333333 149.12 85.333333h85.76c11.648 0 21.12 9.6 21.12 21.525334V917.12c0 11.882667-9.621333 21.525333-21.12 21.525333H149.12A21.290667 21.290667 0 0 1 128 917.141333V106.88z m640 0c0-11.882667 9.621333-21.525333 21.12-21.525334h85.76c11.648 0 21.12 9.6 21.12 21.525334V917.12c0 11.882667-9.621333 21.525333-21.12 21.525333h-85.76a21.290667 21.290667 0 0 1-21.12-21.525333V106.88z" fill="#3D3D3D" p-id="5270"></path></svg>';
var audio = new Audio();
var isPlay = false;

function SearchAPI(name, pagesize, page, n) {
    return `https://api.xingzhige.com/API/NetEase_CloudMusic_new/?name=${name}&pagesize=${pagesize}&page=${page}`;
}

function getURLAPI(ID) {
    return `https://api.xingzhige.com/API/NetEase_CloudMusic_new/?songid=${ID}`;
}

function updatetime() {
    var time = document.getElementById('player-progress-time');
    audio.ontimeupdate = function() {
        var currentTime = Math.ceil(audio.currentTime);
        time.innerHTML = currentTime;
    };
}

function totaltime() {
    var totaltime = document.getElementById('player-progress-time-total');
    audio.onloadedmetadata = function() {
        var duration = Math.ceil(audio.duration);
        totaltime.innerHTML = duration;
    };
}
document.addEventListener('DOMContentLoaded', () => {
    var winwidth = window.innerWidth;
    var winheight = window.innerHeight;
    var app = document.querySelector('#app');
    app.style.width = winwidth + 'px';
    app.style.height = (winheight - 60) + 'px';
    var player = document.querySelector('#player');
    player.style.width = winwidth + 'px';
    player.style.height = 60 + 'px';
    var search = document.querySelector('#search');
    var clear = document.querySelector('#clear');
    var keyword = document.querySelector('#s > input');
    var dialog = document.getElementById('dialog');
    var loading = document.getElementById('loading');
    var tips = document.getElementById('tip');
    var tiptext = document.getElementById('tiptext');
    var searchinput = document.querySelector('#s > input')

    function getMusic() {
        dialog.style.display = 'flex';
        loading.showModal();
        if (keyword.value) {
            console.log(keyword.value);
            $.ajax({
                url: SearchAPI(keyword.value, pagesize, pageNum),
                type: 'GET',
                data: {
                    keyword: keyword.value
                },
                success: function(data) {
                    dialog.style.display = 'none';
                    loading.close();
                    var result = data.data;
                    console.log('结果：', result);
                    var music = document.getElementById('music');
                    music.innerHTML = '';
                    if (result.code) {
                        console.log(true);
                    }
                    result.forEach(item => {
                        music.innerHTML += `
                        <div class="music-item" data-id="${item.id}" data-name='${item.songname}' data-pagesize='${pagesize}' data-page='${pageNum}' data-author='${item.name}'>
                            <div class="music-item-img">
                                <img src="${item.cover}" alt="${item.songname}" title="${item.songname} - ${item.name}">
                            </div>
                            <div class="music-item-info">
                                <div class="music-item-name">${item.songname}</div>
                                <div class="music-item-author">${item.name}</div>
                            </div>
                        </div>
                        `;
                    });
                    var page = docuemnt.getElementById('page');
                    page.innerHTML = `
                    <button class='page left' id='previous'>上一页</button>
                    <input type='number' min='1' id='page-input' value='${pageNum}'>
                    <button class='page right' id='next'>下一页</button>
                    `;
                    var pageInput = document.getElementById('page-input');
                    pageInput.oninput = () => {
                        if (pageInput.value <= 0) {
                            pageInput.value = pageNum;
                        } else if (pageInput.value > pageNum) {
                            pageNum = pageInput.value;
                        }
                    };
                    pageInput.addEventListener('keyup', (e) => {
                        if (e.key == 'Enter') {
                            getMusic();
                        }
                    })
                    pageInput.addEventListener('change', (e) => {
                        getMusic();
                    })
                    var previous = document.getElementById('previous');
                    previous.addEventListener('click', (e) => {
                        if (pageNum > 1) {
                            pageNum--;
                            getMusic();
                        }
                    })
                    var next = document.getElementById('next');
                    next.addEventListener('click', (e) => {
                        pageNum++;
                        getMusic();
                    })
                    var musiclist = document.getElementsByClassName('music-item');
                    Array.from(musiclist).forEach(function(item) {
                        item.addEventListener('click', function() {
                            var ID = Number(this.dataset.id);
                            var name = this.dataset.name;
                            var author = this.dataset.author;
                            console.log(item, ID, name, author);
                            dialog.style.display = 'flex';
                            loading.showModal();
                            $.ajax({
                                url: getURLAPI(ID),
                                type: 'GET',
                                success: function(data) {
                                    dialog.style.display = 'none';
                                    loading.close();
                                    console.log(data);
                                    if (data.code == 0) {
                                        var data = data.data;
                                        var cover = document.querySelector('#player-cover > img');
                                        cover.src = data.cover;
                                        var favicon = document.getElementById('favicon');
                                        console.log(favicon);
                                        favicon.href = data.cover;
                                        cover.alt = `${data.songname} - ${data.name}`;
                                        cover.title = `${data.songname} - ${data.name}`;
                                        docuemnt.title = `${data.songname} - ${data.name}`;
                                        var name = document.querySelector('#player-name');
                                        var author = document.querySelector('#player-author');
                                        name.innerHTML = data.songname;
                                        author.innerHTML = data.name;
                                        audio.src = data.src;
                                        audio.loop = true;
                                        audio.play();
                                        totaltime();
                                        updatetime();
                                        console.log(audio);
                                        var play = document.getElementById("player-play");
                                        play.addEventListener('click', () => {
                                            if (isPlay) {
                                                audio.pause();
                                                isPlay = false;
                                            } else {
                                                audio.play();
                                                isPlay = true;
                                            }
                                            console.log('状态：', isPlay);
                                        })
                                        play.innerHTML = pauseicon;
                                        audio.onplay = function() {
                                            isPlay = true;
                                            play.innerHTML = pauseicon;
                                        }
                                        audio.onpause = function() {
                                            isPlay = false;
                                            play.innerHTML = playicon;
                                        }
                                    } else {
                                        tiptext.innerHTML = `Error:${data.msg}`;
                                        tips.showModal();
                                        setTimeout(() => {
                                            tips.close();
                                            dialog.style.display = 'none';
                                        }, 2000);
                                    }
                                },
                                error: function(data) {
                                    console.log(data);
                                    loading.close();
                                    tiptext.innerHTML = `Error:${data}`;
                                    tips.showModal();
                                    setTimeout(() => {
                                        tips.close();
                                        dialog.style.display = 'none';
                                    }, 2000);
                                }
                            })
                        })
                    })
                },
                error: function(err) {
                    dialog.style.display = 'none';
                    loading.close();
                    var page = docuemnt.getElementById('page');
                    page.innerHTML = ``;
                    var music = document.getElementById('music');
                    music.innerHTML = `Error:${err}`;
                }
            });
            app.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    clear.addEventListener('click', () => {
        keyword.value = null;
    })
    search.addEventListener('click', () => {
        getMusic();
    })
    searchinput.addEventListener('keyup', (e) => {
        console.log(e.key);
        if (e.key == 'Enter') {
            getMusic();
        } else if (e.key == 'Delete') {
            keyword.value = null;
        }
    })
    searchinput.addEventListener('blur', (e) => {

    })
})

window.addEventListener('resize', function() {
    var winwidth = window.innerWidth;
    var winheight = window.innerHeight;
    var app = document.querySelector('#app');
    app.style.width = winwidth + 'px';
    app.style.height = (winheight - 60) + 'px';
    var player = document.querySelector('#player');
    player.style.width = winwidth + 'px';
    player.style.height = 60 + 'px';
    console.log(winwidth, winheight)
});