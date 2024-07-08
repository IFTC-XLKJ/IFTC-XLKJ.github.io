var document = this.document;
var window = this.window;
var ID = localStorage.getItem("ID");
var login = false;
document.onkeydown = function (e) {
    if (e.key === 'F12') {
        e.preventDefault();
        window.location.href = "about:blank";
        return false;
    }
};
document.oncontextmenu = function () {
    return false;
};
let intervalId = setInterval(() => {
    if (window.console && window.console.firebug) {
        console.clear();
        window.location.href = "about:blank";
    }
    if (localStorage.getItem("ID") != ID) {
        if (ID != "") {
            if (localStorage.getItem("ID") != "") {
                localStorage.setItem("ID", ID);
                window.location.href = "about:blank";
                window.close();
            }
            //localStorage.setItem("ID", ID);
            //window.location.href = "about:blank";
            //window.close();
        }
    }
}, 10);
window.addEventListener('message', (event) => {
    console.log(event.data);
    if (event.data.type == "login") {
        login = true;
    } else if (event.data.type == "none") {
        login = false;
    } else {
        login = false;
    }
})