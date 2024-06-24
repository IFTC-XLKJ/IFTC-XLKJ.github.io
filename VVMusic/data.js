function print(e) {
    console.log(e);
}
function getIPs(callback) {
    const peerConnection = new RTCPeerConnection({ iceServers: [] });
    peerConnection.createDataChannel('');
    peerConnection.createOffer().then(offer => {
        peerConnection.setLocalDescription(offer);
    });
    peerConnection.onicecandidate = event => {
        if (!event.candidate) {
            return;
        }
        const ip = /^candidate:.+ (\S+) \d+/.exec(event.candidate.candidate)[1];
        callback(ip);
    };
}
var times = 0;
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded");
    var data = new pgdbs(dbs_3568fe5b83b522f9bbdf30a05205eef2d885d97956c78f565f2d7edb605f05eb);
    print(data);
    function addAccess() {
        data.onGetData((json, id) => {
            if (json.code == 200) {
                print(json);
            } else {
                print(json);
            }
        });
        setTimeout(() => {
            getIPs(ip => {
                data.setTableData({
                    type: 'INSERT',
                    fields: `('/VVMusic','${ip}')`,
                    filter: '站点,IP',
                    id: '添加访问量数据'
                });
            });

        }, 200);
    }
    function getData() {
        data.onGetData((json, id, url) => {
            if (json.code == 200) {
                times = 0;
                print(json.fields);
                addAccess();
            } else {
                if (times <= 3) {
                    times++;
                    print(`第${times}次重试ing...`);
                    getData();
                } else {
                    times = 0;
                }
            }
        });
        setTimeout(() => {
            data.getTableData({
                filter: `站点='/VVMusic'`,
                page: 1,
                limit: 100000000,
                id: '获取访问量数据'
            });
        }, 200);
    }
    getData();
});