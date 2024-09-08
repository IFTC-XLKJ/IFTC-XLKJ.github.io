function mathRandomInt(a, b) {
    if (a > b) {
        var c = a;
        a = b;
        b = c; parent
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
}

class Form {
    constructor(id, config) {
        if (!document.querySelector('link[href="/Form.css"]')) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "/Form.css";
            document.head.appendChild(link);
        }
        this.formdata = [];
        const renderid = document.getElementById(id);
        renderid.innerHTML = "";
        renderid.style.userSelect = "none";
        config.forEach((item, index) => {
            if (item.type == "text") {
                this.formdata.push({
                    type: item.type,
                    id: item.id,
                    text: item.text,
                })
                renderid.innerHTML += `<div id="${item.id}" class="form form-text">${item.text}</div>`;
            } else {
                this.formdata.push({
                    type: item.type,
                    id: item.id,
                    value: item.value,
                })
                renderid.innerHTML += `<div id="${item.id}" class="form form-input">${item.label}<input placeholder="${item.placeholder}" type="${item.valueType}" ${item.min ? `max="${item.min}"` : ""} ${item.max ? `max="${item.max}"` : ""} value="${item.value}" ${item.disabled ? 'disabled="true"' : ""} ${item.valueType == "file" && item.accept ? `accept="${item.accept}"` : ""}></div>`
            }
        })
        const formitems = renderid.querySelectorAll(".form");
        this.form = formitems;
        formitems.forEach((item, index) => {
            const className = item.className.split(" ")[0]
            if (className == "form-text") {
                item.onclick = e => {
                    this[`on${item.id}Click`] = callback => callback(e);
                }
            } else if (className == "form-input") {
                item.oninput = e => {
                    this.formdata[index].value = item.value;
                }
            }
        })
    }
}