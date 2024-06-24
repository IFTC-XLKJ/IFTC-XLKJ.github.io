function print(e) {
    console.log(e);
}

async function IP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log('User IP:', data.ip);
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        setTimeout(() => {
            return IP();
        }, 200);
    }
}

var times = 0;
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded");
    var data = new pgdbs(dbs_3568fe5b83b522f9bbdf30a05205eef2d885d97956c78f565f2d7edb605f05eb);
    print(data);
    function addAccess() {
        data.onGetData((json, id) => {
            if (json.code == 200) {
                print(json.fields);
            } else {
                print(json.msg);
            }
        });
   setTimeout(() => {
    data.setTableData({ fields: '站点,IP', filter: `('/VVMusic',${IP()})`, id: '添加访问量数据' });
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
            data.getTableData({ filter: `站点='/VVMusic'`, page: 1, limit: 100000000, id: '获取访问量数据' });
        }, 200);
    }
    getData();
});