var document = this.document;
var window = this.window;

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

function getURLAPI(ID) {
    return `https://api.xingzhige.com/API/NetEase_CloudMusic_new/?songid=${ID}`;
}

docuemnt.addEventListener('DOMContentLoaded', function () {
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
                tiptext.innerHTML = `Error:${data}`;
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