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
docuemnt.addEventListener('DOMContentLoaded', function () {
    var share = document.getElementById('share');
    var Share = new pgdbs(dbs_09acf4d4695fb1a5f1f94b8dd8a0c877ed7099b0bccab1c904087a70445dc8b3);
    share.addEventListener('click', function () {
        loading.showModal();
        console.log('share', ShareID());
    })
})