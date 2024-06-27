var document = this.document;
document.addEventListener("DOMContentLoaded", function() {
    function compile(docarr) {
        docarr.forEach(docobj => {
            console.log('文档数据：', docobj);
        });
    }
})