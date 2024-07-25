var window = this.window;
var document = this.document;

document.addEventListener('DOMContentLoaded', function () {
    var footer = document.getElementById('footer');
    var winheight = window.innerHeight;
    var banner = document.getElementById('banner');
    var main = document.getElementById('main');
    var bannerheight = banner.offsetHeight;
    var mainheight = main.offsetHeight;
    if (bannerheight + mainheight < winheight) {
        var footerheight = footer.offsetHeight;
        footer.style.position = 'fixed';
        footer.style.top = `${winheight - footerheight}px`;
    }
});

window.addEventListener('resize', function () {
    var footer = document.getElementById('footer');
    var winheight = window.innerHeight;
    var banner = document.getElementById('banner');
    var main = document.getElementById('main');
    var bannerheight = banner.offsetHeight;
    var mainheight = main.offsetHeight;
    if (bannerheight + mainheight < winheight) {
        var footerheight = footer.offsetHeight;
        footer.style.position = 'fixed';
        footer.style.top = `${winheight - footerheight}px`;
    }
})