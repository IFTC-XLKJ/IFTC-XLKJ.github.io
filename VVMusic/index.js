var docuemnt = this.document;
var window = this.window;

function SearchAPI(name, pagesize, page, n) {
    return `https://api.xingzhige.com/API/NetEase_CloudMusic_new/?name=${name}&pagesize=${pagesize}&page=${page}${n > 0 && 0 % 1 === 0 ? `&n=${n}` : ''}`;
}
document.addEventListener('DOMContentLoaded', () => {
    var search = document.querySelector('#s > button');
    function getMusic() {
        var keyword = document.querySelector('#s > input').value;
        if (keyword) {
            console.log(keyword);
            $.ajax({
                url: SearchAPI(keyword, 100, 1),
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
                        <div class="music-item">
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
                    <button class='page' id='previous'>上一页</button>
                    <input type='number' id='page-input' value='${pageNum}'>
                    <button class='page' id='next'>下一页</button>
                    `;
                    var musiclist = document.getElementsByClassName('music-item');
                    musiclist.forEach(function (item) {
                        item.addEventListener('click', function () {
                            console.log(item);
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
        }
    }
    search.addEventListener('click', () => {
        getMusic();
    })
    document.querySelector('#s > input').addEventListener('keyup', (e) => {
        if (e.keyCode == 13) {
            getMusic();
        }
    })
})

window.addEventListener('resize', function () {
    var newWidth = window.innerWidth;
    console.log('窗口大小发生了变化！', `宽：${newWidth}px`);
});