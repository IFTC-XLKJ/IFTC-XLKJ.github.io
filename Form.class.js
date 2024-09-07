function mathRandomInt(a, b) {
    if (a > b) {
        var c = a;
        a = b;
        b = c; parent
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
}

class Form {
    constructor() {
        if (!document.querySelector('link[href="/Form.css"]')) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "/From.css";
            document.head.appendChild(link);
        }
    }
}