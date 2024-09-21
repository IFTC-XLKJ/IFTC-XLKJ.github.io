var docuemnt = this.document;
var window = this.window;
var pageNum = 1;
var pagesize = 10;
var playicon = '<svg t="1718518330674" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4283" width="30" height="30"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#3D3D3D" p-id="4284"></path></svg>';
var pauseicon = '<svg t="1718518409100" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5269" width="30" height="30"><path d="M128 106.858667C128 94.976 137.621333 85.333333 149.12 85.333333h85.76c11.648 0 21.12 9.6 21.12 21.525334V917.12c0 11.882667-9.621333 21.525333-21.12 21.525333H149.12A21.290667 21.290667 0 0 1 128 917.141333V106.88z m640 0c0-11.882667 9.621333-21.525333 21.12-21.525334h85.76c11.648 0 21.12 9.6 21.12 21.525334V917.12c0 11.882667-9.621333 21.525333-21.12 21.525333h-85.76a21.290667 21.290667 0 0 1-21.12-21.525333V106.88z" fill="#3D3D3D" p-id="5270"></path></svg>';
var audio = new Audio();
var isPlay = false;
var isSIFocus = false;
var isPIFocus = false;
var musicInfo = {};

var lrcstimes = [];
var lrclist = [];
var lrcfile = '';

var last = 0;
var current = 0;

function ShareID() {
    var ShareID = '';
    var Strings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < 16; i++) {
        ShareID += Strings[Math.floor(Math.random() * Strings.length)];
    }
    return ShareID;
}

function getURLParameters() {
    const queryString = window.location.search.substring(1);
    const params = {};

    if (queryString) {
        queryString.split('&').forEach(param => {
            const [key, value] = param.split('=');
            params[key] = decodeURIComponent(value);
        });
    }

    return params;
}

const urlParams = getURLParameters();
function subsequenceFromStartLast(sequence, at1) {
    var start = at1;
    var end = sequence.length - 1 + 1;
    return sequence.slice(start, end);
}

function textToDataUrl(text) {
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var dataUrl = URL.createObjectURL(blob);
    return dataUrl;
}

function formatSecondsToTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    return minutes + ":" + remainingSeconds;
}

function isPC() {
    var userAgent = navigator.userAgent;
    var mobileRegex = /(Android|webOS|iPhone|iPad|iPod|SymbianOS|BlackBerry|Windows Phone)/;
    return !mobileRegex.test(userAgent);
}
function SearchAPI(name, pagesize, page, n) {
    return `https://api.xingzhige.com/API/NetEase_CloudMusic_new/?name=${name}&pagesize=${pagesize}&page=${page}`;
}

function getURLAPI(ID) {
    return `https://api.xingzhige.com/API/NetEase_CloudMusic_new/?songid=${ID}`;
}

function updatetime() {
    var time = document.getElementById('player-progress-time');
    var lrc = document.getElementById('music-lrc');
    audio.ontimeupdate = function () {
        if (!isPlay) {
            return;
        }
        var currentTime = Math.ceil(audio.currentTime);
        for (var i = 0; i < lrcstimes.length; i++) {
            if (last < current) {
                if (lrcstimes[i + 1] <= currentTime + (lrcstimes[i + 1] - lrcstimes[i])) {
                    last = lrcstimes[i];
                    lrc.innerHTML = `<p class="poplrc">${lrclist[i]}</p>`;
                }
                if (currentTime >= lrcstimes[lrcstimes.length - 1]) {
                    last = lrcstimes[i];
                    lrc.innerHTML = `<p class="poplrc">${lrclist[i]}</p>`;
                }
            } else {
                if (lrcstimes[i + 1] <= currentTime + (lrcstimes[i + 1] - lrcstimes[i])) {
                    current = lrcstimes[i];
                }
                if (currentTime >= lrcstimes[lrcstimes.length - 1]) {
                    current = lrcstimes[i];
                }
            }
        }
        time.innerHTML = formatSecondsToTime(currentTime);
        progress.value = currentTime;
    };
    audio.onended = function () {
        isPlay = false;
        lrc.innerHTML = '';
        last = 0;
        current = 0;
        audio.play();
    };
}

function totaltime() {
    var totaltime = document.getElementById('player-progress-time-total');
    var lrc = document.getElementById('music-lrc');
    audio.onloadedmetadata = function () {
        var duration = Math.ceil(audio.duration);
        lrc.innerHTML = '';
        totaltime.innerHTML = formatSecondsToTime(duration);
        progress.max = duration;
    };
}
document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('音乐ID', '');
    var winwidth = window.innerWidth;
    var winheight = window.innerHeight;
    var app = document.querySelector('#app');
    app.style.width = winwidth + 'px';
    app.style.height = (winheight - 90 - 25) + 'px';
    var player = document.querySelector('#player');
    player.style.width = winwidth + 'px';
    player.style.height = 60 + 'px';
    var lrc = document.getElementById('music-lrc');
    lrc.style.width = winwidth + 'px';
    lrc.style.height = 30 + 'px';
    var search = document.querySelector('#search');
    var clear = document.querySelector('#clear');
    var keyword = document.querySelector('#s > input');
    var loading = document.getElementById('loading');
    var tips = document.getElementById('tips');
    var tiptext = document.getElementById('tiptext');
    var searchinput = document.querySelector('#s > input');
    var check = document.getElementById('check');
    check.focus();
    var progress = document.getElementById('progress');
    var download = document.getElementById('download');
    var share = document.getElementById('share');
    var Share = new pgdbs(dbs_09acf4d4695fb1a5f1f94b8dd8a0c877ed7099b0bccab1c904087a70445dc8b3);
    share.addEventListener('click', function () {
        loading.showModal();
        console.log('share', ShareID());
        localStorage.setItem('ShareID', ShareID());
        Share.onGetData((json, id, url) => {
            if (id == '添加分享') {
                loading.close();
                console.log(json)
                if (json.code == 200) {
                    try {
                        navigator.clipboard.writeText(`https://iftc-xlkj.github.io/VVMusic?share=${localStorage.getItem('ShareID')}`);
                        alert('分享成功，链接已复制');
                    } catch (err) {
                        alert('分享成功，链接无法复制，链接：' + `https://iftc-xlkj.github.io/VVMusic?share=${localStorage.getItem('ShareID')}`);
                    }
                } else {
                    alert('分享失败');
                }
            }
        })
        Share.setTableData({
            type: 'INSERT',
            fields: `('${localStorage.getItem('音乐ID')}','${localStorage.getItem('ShareID')}')`,
            filter: '音乐ID,分享ID',
            id: '添加分享'
        });
    })

    function getMusic() {
        loading.showModal();
        if (keyword.value) {
            console.log(keyword.value);
            $.ajax({
                url: SearchAPI(keyword.value, pagesize, pageNum),
                type: 'GET',
                data: {
                    keyword: keyword.value
                },
                success: function (data) {
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
                    pageInput.addEventListener('blur', (e) => {
                        isPIFocus = false;
                        check.focus();
                    })
                    pageInput.addEventListener('focus', (e) => {
                        isPIFocus = true;
                        check.blur();
                    })
                    pageInput.addEventListener('keyup', (e) => {
                        if (e.key == 'Enter') {
                            pageNum = pageInput.value;
                            if (pageNum <= 0) {
                                pageNum = 1;
                            }
                            getMusic();
                        }
                    })
                    pageInput.addEventListener('change', (e) => {
                        pageNum = pageInput.value;
                        if (pageNum <= 0) {
                            pageNum = 1;
                        }
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
                    Array.from(musiclist).forEach(function (item) {
                        item.addEventListener('click', function () {
                            var ID = Number(this.dataset.id);
                            var name = this.dataset.name;
                            var author = this.dataset.author;
                            console.log(item, ID, name, author);
                            loading.showModal();
                            $.ajax({
                                url: getURLAPI(ID),
                                type: 'GET',
                                success: function (data) {
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
                                        musicInfo.name = data.songname;
                                        musicInfo.author = data.name;
                                        musicInfo.src = data.src;
                                        musicInfo.ID = data.id;
                                        musicInfo.cover = data.cover;
                                        $.ajax({
                                            url: musicInfo.src.replace("http://", "https://"),
                                            type: 'GET',
                                            xhrFields: {
                                                responseType: 'blob'
                                            },
                                            success: function (blob) {
                                                var reader = new FileReader();
                                                reader.onload = function (e) {
                                                    var dataURL = e.target.result;
                                                    console.log('Data URL:', dataURL);
                                                    var url = dataURL;
                                                    getlrc(musicInfo.ID);
                                                    loading.close();
                                                    tiptext.innerHTML = `资源下载成功`;
                                                    tips.showModal();
                                                    setTimeout(() => {
                                                        tips.close();
                                                    }, 2000);
                                                    var name = document.querySelector('#player-name');
                                                    var author = document.querySelector('#player-author');
                                                    name.innerHTML = data.songname;
                                                    author.innerHTML = data.name;
                                                    audio.src = url;
                                                    musicInfo.src = url;
                                                    localStorage.setItem('音乐ID', data.id);
                                                    audio.loop = false;
                                                    audio.play();
                                                    totaltime();
                                                    updatetime();
                                                    console.log(audio);
                                                    last = 0;
                                                    current = 0;
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
                                                    audio.onplay = function () {
                                                        isPlay = true;
                                                        play.innerHTML = pauseicon;
                                                    }
                                                    audio.onpause = function () {
                                                        isPlay = false;
                                                        play.innerHTML = playicon;
                                                    }
                                                };
                                                reader.readAsDataURL(blob);
                                            },
                                            error: function (error) {
                                                loading.close();
                                                tiptext.innerHTML = `Error:${error}`;
                                                tips.showModal();
                                                setTimeout(() => {
                                                    tips.close();
                                                }, 2000);
                                            }
                                        })
                                    } else {
                                        loading.close();
                                        tiptext.innerHTML = `Error:${data.msg}`;
                                        tips.showModal();
                                        setTimeout(() => {
                                            tips.close();
                                        }, 2000);
                                    }
                                },
                                error: function (data) {
                                    console.log(data);
                                    loading.close();
                                    loading.style.display = 'none';
                                    tiptext.innerHTML = `Error:${data}`;
                                    tips.showModal();
                                    setTimeout(() => {
                                        tips.close();
                                    }, 2000);
                                }
                            })
                        })
                    })
                },
                error: function (err) {
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
        isSIFocus = false;
        check.focus();
    })
    searchinput.addEventListener('focus', (e) => {
        isSIFocus = true;
        check.blur();
    })
    check.addEventListener('keyup', (e) => {
        console.log(e.key);
        if (e.key == ' ') {
            if (isPlay) {
                audio.pause();
                isPlay = false;
            } else {
                audio.play();
                isPlay = true;
            }
        } else if (e.key == 'ArrowLeft') {
            if (audio.currentTime > 0) {
                audio.currentTime -= 1;
            }
        } else if (e.key == 'ArrowRight') {
            if (audio.currentTime < audio.duration) {
                audio.currentTime += 1;
            }
        } else if (e.key == 'ArrowUp') {
            if (audio.volume < 1) {
                audio.volume += 0.05;
            }
        } else if (e.key == 'ArrowDown') {
            if (audio.volume > 0) {
                audio.volume -= 0.05;
            }
        }
    })
    docuemnt.body.addEventListener('click', (e) => {
        console.log(e.target, isSIFocus);
        if (isPC()) {
            var pageInput = document.getElementById('page-input');
            if (isSIFocus) {
                searchinput.focus();
                check.blur();
                if (pageInput)
                    pageInput.blur();
            } else if (isPIFocus) {
                searchinput.blur();
                check.blur();
                if (pageInput)
                    pageInput.focus();
            } else {
                searchinput.blur();
                check.focus();
                if (pageInput)
                    pageInput.blur();
            }
        };
    })
    progress.addEventListener('change', (e) => {
        audio.currentTime = e.target.value;
        last = 0;
        current = 0;
        audio.play();
        isPlay = true;
    })
    progress.addEventListener('input', (e) => {
        isPlay = false;
        audio.pause();
    })
    download.addEventListener('click', () => {
        var a = document.createElement('a');
        a.href = musicInfo.src;
        a.download = `${musicInfo.name} - ${musicInfo.author}.mp3`;
        a.click();
        var a = document.createElement('a');
        a.href = textToDataUrl(lrcfile);
        a.download = `${musicInfo.name} - ${musicInfo.author}.lrc`;
        a.click();
        $.ajax({
            url: musicInfo.cover,
            type: 'GET',
            xhrFields: {
                responseType: 'blob'
            },
            success: function (blob) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var dataURL = e.target.result;
                    console.log('Data URL:', dataURL);
                    var url = dataURL;
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = `${musicInfo.name} - ${musicInfo.author}.jpg`;
                    a.click();
                }
                reader.readAsDataURL(blob);
            },
            error: function (err) {
                tiptext.innerHTML = `封面下载失败，Error:${data.msg}`;
                tips.showModal();
                setTimeout(() => {
                    tips.close();
                }, 2000);
            }
        })
    })

    if (urlParams.share) {
        loading.showModal();
        Share.onGetData((json, id, url) => {
            if (id == '获取分享') {
                if (json.code == 200) {
                    if (json.fields.length == 0) {
                        alert('分享不存在');
                    } else {
                        const musicID = json.fields[0].音乐ID;
                        $.ajax({
                            url: getURLAPI(musicID),
                            type: 'GET',
                            success: function (data) {
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
                                    musicInfo.name = data.songname;
                                    musicInfo.author = data.name;
                                    musicInfo.src = data.src;
                                    musicInfo.ID = data.id;
                                    $.ajax({
                                        url: musicInfo.src.replace("http://", "https://"),
                                        type: 'GET',
                                        xhrFields: {
                                            responseType: 'blob'
                                        },
                                        success: function (blob) {
                                            var reader = new FileReader();
                                            reader.onload = function (e) {
                                                var dataURL = e.target.result;
                                                console.log('Data URL:', dataURL);
                                                var url = dataURL;
                                                getlrc(musicInfo.ID);
                                                loading.close();
                                                tiptext.innerHTML = `资源下载成功`;
                                                tips.showModal();
                                                setTimeout(() => {
                                                    tips.close();
                                                }, 2000);
                                                var name = document.querySelector('#player-name');
                                                var author = document.querySelector('#player-author');
                                                name.innerHTML = data.songname;
                                                author.innerHTML = data.name;
                                                audio.src = url;
                                                musicInfo.src = url;
                                                localStorage.setItem('音乐ID', data.id);
                                                audio.loop = false;
                                                play.innerHTML = playicon;
                                                totaltime();
                                                updatetime();
                                                console.log(audio);
                                                last = 0;
                                                current = 0;
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
                                                audio.onplay = function () {
                                                    isPlay = true;
                                                    play.innerHTML = pauseicon;
                                                }
                                                audio.onpause = function () {
                                                    isPlay = false;
                                                    play.innerHTML = playicon;
                                                }
                                                play.click();
                                            };
                                            reader.readAsDataURL(blob);
                                        },
                                        error: function (error) {
                                            loading.close();
                                            tiptext.innerHTML = `Error:${error}`;
                                            tips.showModal();
                                            setTimeout(() => {
                                                tips.close();
                                            }, 2000);
                                        }
                                    })
                                } else {
                                    loading.close();
                                    tiptext.innerHTML = `Error:${data.msg}`;
                                    tips.showModal();
                                    setTimeout(() => {
                                        tips.close();
                                    }, 2000);
                                }
                            },
                            error: function (data) {
                                console.log(data);
                                loading.close();
                                loading.style.display = 'none';
                                tiptext.innerHTML = `Error:${data}`;
                                tips.showModal();
                                setTimeout(() => {
                                    tips.close();
                                }, 2000);
                            }
                        })
                    }
                } else {
                    alert('获取分享失败');
                }
            }
        })
        Share.getTableData({
            filter: `分享ID='${urlParams.share}'`,
            page: 1,
            limit: 1,
            id: '获取分享'
        });
    }
    function getlrc(ID) {
        $.ajax({
            url: `https://api.xfyun.club/musicAll/?lyric=${ID}`,
            type: 'GET',
            success: function (data) {
                console.log(data);
                var lrcs = data.lrc.lyric ? data.lrc.lyric : null;
                lrcfile = lrcs;
                lrcstimes = [];
                lrclist = [];
                lrcs.split(/\n/).forEach((item, index) => {
                    console.log(item);
                    if (item.match(/^\[.+\]/)) {
                        lrcstimes.push(lrcTimeToNum(item.match(/^\[(.+)\]/)[1]));
                        lrclist.push(subsequenceFromStartLast(item, ((item.indexOf(']') + 1 + 1) - 1)));
                    }
                })
                console.log(lrcstimes, lrclist);
            },
            error: function (err) {
                console.error(err);
                tiptext.innerHTML = `Error:${err}`;
                tips.showModal();
                setTimeout(() => {
                    tips.close();
                }, 2000);
            }
        })
    }
    function lrcTimeToNum(time) {
        var times = time.split(':');
        return parseInt(times[0]) * 60 + parseFloat(times[1]);
    }
})

docuemnt.addEventListener('DOMContentLoaded', function () {
    var fps = docuemnt.getElementById("fps");
    var fpsCounter = {
        startTime: 0,
        frameCount: 0,
        fps: 0,
        update: function (timestamp) {
            if (this.startTime === 0) {
                this.startTime = timestamp;
            } else {
                var elapsedTime = timestamp - this.startTime;
                if (elapsedTime >= 1000) {
                    this.fps = this.frameCount;
                    this.frameCount = 0;
                    this.startTime = timestamp;
                }
            }
            fps.innerHTML = `FPS:${this.fps}`;
            this.frameCount++;
            requestAnimationFrame(this.update.bind(this));
        }
    };
    requestAnimationFrame(fpsCounter.update.bind(fpsCounter));
});

window.addEventListener('resize', function () {
    var winwidth = window.innerWidth;
    var winheight = window.innerHeight;
    var app = document.querySelector('#app');
    app.style.width = winwidth + 'px';
    app.style.height = (winheight - 90 - 25) + 'px';
    var player = document.querySelector('#player');
    player.style.width = winwidth + 'px';
    player.style.height = 60 + 'px';
    var lrc = document.getElementById('music-lrc');
    lrc.style.width = winwidth + 'px';
    lrc.style.height = 30 + 'px';
    console.log(winwidth, winheight)
});