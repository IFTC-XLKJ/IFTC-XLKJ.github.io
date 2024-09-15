class RightMenu {
    constructor(css) {
        if (!document.querySelector(`link[href="${css ? css : "./RightMenu.css"}"]`)) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = `${css ? css : "./RightMenu.css"}`;
            document.head.appendChild(link);
        }
    }

    show(forms, clientX, clientY) {
        var items = document.createElement("div");
        items.className = "menu-items";
        items.style["--x"] = clientX;
        items.style["--y"] = clientY;
        document.body.appendChild(items)
        forms.forEach(form => {
            var item = document.createElement("div");
            item.innerHTML = form.text;
            item.className = "menu-item";
            items.appendChild(item)
        });
    }
}