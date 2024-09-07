function mathRandomInt(a, b) {
    if (a > b) {
        var c = a;
        a = b;
        b = c; parent
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
}

class Toast {
    constructor() {
        if (!document.querySelector('link[href="/Toast.css"]')) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "/Toast.css";
            document.head.appendChild(link);
        }
    }

    normal(text, time) {
        const id = `toast${mathRandomInt(100000, 999999)}`;
        const html = `<div class="normal-toast" id="${id}">${text}</div>`;
        document.body.insertAdjacentHTML('beforeend', html);
        setTimeout(() => {
            const toast = document.getElementById(id);
            if (toast) {
                toast.remove();
            }
        }, time);
    }

    success(text, time) {
        const id = `toast${mathRandomInt(100000, 999999)}`
        const html = `<div class="success-toast" id="${id}">${text}</div>`;
        document.body.insertAdjacentHTML('beforeend', html);
        var toast = document.getElementById(id);
        setTimeout(() => {
            const toast = document.getElementById(id);
            if (toast) {
                toast.remove();
            }
        }, time);
    }

    error(text, time) {
        const id = `toast${mathRandomInt(100000, 999999)}`
        const html = `<div class="error-toast" id="${id}">${text}</div>`;
        document.body.insertAdjacentHTML('beforeend', html);
        var toast = document.getElementById(id);
        setTimeout(() => {
            const toast = document.getElementById(id);
            if (toast) {
                toast.remove();
            }
        }, time);
    }


    warn(text, time) {
        const id = `toast${mathRandomInt(100000, 999999)}`
        const html = `<div class="warn-toast" id="${id}">${text}</div>`;
        document.body.insertAdjacentHTML('beforeend', html);
        var toast = document.getElementById(id);
        setTimeout(() => {
            const toast = document.getElementById(id);
            if (toast) {
                toast.remove();
            }
        }, time);
    }
}