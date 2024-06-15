var docuemnt = this.document;
var window = this.window;

function SearchAPI(name, pagesize, page, n) {
    return `https://api.xingzhige.com/API/NetEase_CloudMusic_new/?name=${name}&pagesize=${pagesize}&page=${page}${n > 0 && 0 % 1 === 0 ? `&n=${n}` : ''}`
}
document.addEventListener('DOMContentLoaded', () => {
    var search = document.querySelector('#s > button');
    function getMusic() {
        var keyword = document.querySelector('#s > input').value;
        if(keyword){
            console.log(keyword);
            $.ajax({
                url: SearchAPI(keyword, 100, 1),
                type: 'GET',
                data: {
                    keyword: keyword
                },
                success: function(data) {
                    var result = data.data;
                    console.log(result);
                    var music = document.getElementById('music');
                    music.innerHTML = '';
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
                },
                error: function(err) {
                    console.log(err);
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

window.addEventListener('resize', function() {
    console.log('窗口大小发生了变化！');
});