const url = "https://api.lihouse.xyz/send";

class NingMail {
    constructor(props) {
        if (props.sendTo && props.title && props.content) {
            this.sendTo = props.sendTo;
            this.title = props.title;
            this.content = props.content;
            this.onsuccess = () => {};
            this.onerror = () => {};
        } else {
            throw new Error('缺少参数！');
        }
    }

    send() {
        fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sendTo: this.sendTo,
                    title: this.title,
                    content: this.content
                })
            })
            .then(response => {
                if (response.ok) {
                    console.log("Request sent successfully");
                    return response.json();
                } else {
                    throw new Error(`Failed to send request, status code: ${response.status}`);
                }
            })
            .then(data => {
                if (typeof this.onsuccess === 'function') {
                    this.onsuccess(data);
                }
                console.log("Response content:", data);
            })
            .catch(error => {
                if (typeof this.onerror === 'function') {
                    this.onerror(error);
                }
                console.error("Error:", error.message);
            });
    }

    onsuccess(callback) {
        if (typeof callback === 'function') {
            this.onsuccess = callback;
        } else {
            throw new Error('Callback must be a function.');
        }
    }

    onerror(callback) {
        if (typeof callback === 'function') {
            this.onerror = callback;
        } else {
            throw new Error('Callback must be a function.');
        }
    }
}