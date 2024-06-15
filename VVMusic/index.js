var docuemnt = this.document;
var window = this.window;
var pageNum = 1;
var pagesize = 100;
function SearchAPI(name, pagesize, page, n) {
    return `https://api.xingzhige.com/API/NetEase_CloudMusic_new/?name=${name}&pagesize=${pagesize}&page=${page}${n > 0 && 0 % 1 === 0 ? `&n=${n}` : ''}`;
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
    var search = document.querySelector('#s > button');
    function getMusic() {
        var keyword = document.querySelector('#s > input').value;
        if (keyword) {
            console.log(keyword);
            $.ajax({
                url: SearchAPI(keyword, pagesize, pageNum),
                type: 'GET',
                data: {
                    keyword: keyword
                },
                success: function (data) {
                    var result = data.data;
                    console.log('结果：', result);
                    var music = document.getElementById('music');
                    music.innerHTML = '';
                    if (result.code) { console.log(true); }
                    result.forEach(item => {
                        music.innerHTML += `
                        <div class="music-item" data-id="${item.id}" data-name='${item.songname}' data-pagesize='${pagesize}' data-page='${pageNum}'>
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
                    var musiclist = document.getElementsByClassName('music-item');
                    Array.from(musiclist).forEach(function (item) {
                        item.addEventListener('click', function () {
                            var ID = Number(this.dataset.id);
                            console.log(item, ID);
                        })
                    })
                },
                error: function (err) {
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
    search.addEventListener('click', () => {
        getMusic();
    })
    document.querySelector('#s > input').addEventListener('keyup', (e) => {
        if (e.key == 'Enter') {
            getMusic();
        }
    })
})

window.addEventListener('resize', function () {
    var winwidth = window.innerWidth;
    var winheight = window.innerHeight;
    var app = document.querySelector('#app');
    app.style.width = winwidth + 'px';
    app.style.height = (winheight - 60) + 'px';
    var player = document.querySelector('#player');
    player.style.width = winwidth + 'px';
    player.style.height = 60 + 'px';
});