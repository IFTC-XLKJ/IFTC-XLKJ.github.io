function print(e) {
    console.log(e);


}
async function fetchIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        throw error;
    }
}
async function displayIP() {
    try {
        const ip = await fetchIP();
        console.log('User IP:', ip);

    } catch (error) {
        console.error('Failed to get IP:', error);
    }
}

var times = 0;
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded");
    var data = new pgdbs(dbs_3568fe5b83b522f9bbdf30a05205eef2d885d97956c78f565f2d7edb605f05eb);
    print(data);
    function addAccess() {
        data.onGetData((json, id) => {
            if (id == '添加访问量数据') {
                if (json.code == 200) {
                    times = 0;
                    print(json);
                } else {
                    if (times <= 3) {
                        times++;
                        print(`第${times}次重试ing...`);
                        addAccess();
                    } else {
                        times = 0;
                    }
                }
            }

        });
        setTimeout(() => {
            data.setTableData({
                type: 'INSERT',
                fields: `('/VVMusic','${async () => {
                    const ip = await fetchIP();
                    console.log('User IP:', ip);
                    return ip;
                }}')`,
                filter: '站点,IP',
                id: '添加访问量数据'
            });
        }, 200);
    }
    function getData() {
        data.onGetData((json, id, url) => {
            if (id == '获取访问量数据') {
                print(['获取：', json])
                if (json.code == 200) {
                    times = 0;
                    print(json.fields);
                    addAccess();
                } else {
                    if (times < 3) {
                        times++;
                        print(`第${times}次重试ing...`);
                        getData();
                    } else {
                        times = 0;
                    }
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