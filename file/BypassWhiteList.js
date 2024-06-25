// ==UserScript==
// @name         BypassWhiteList
// @namespace    https://liulyxandy.cn/
// @version      2024-06-23
// @description  利用whitelist漏洞绕过审核
// @author       liulyxandy
// @match        https://coco.codemao.cn/editor/**
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA0CAYAAADIZmusAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMqADAAQAAAABAAAANAAAAAD6i1oLAAARtElEQVRoBc2aeZBcxX3Hf/2OmdmZvbWSWJ2r+7IkDiEkLBsMMQ4GU7EJFZIQE1yYlF1xUoVTdiiHxKlUMPxnSBxTSdkhIaHKlI1MhHFMMAgsgQUSh9AKdKATsZL2PmZn5r15r/P5vdlZDfIitAJVuUs/db9+/bp/3/6d3bNGPsJirfWZbg20AVoGLYZmQw1QPRRDQ2N0lPpNaDe0BXrdGGOpz6mYc/qq5iOYz/B4PfTH0KetlcyJbnnt0BHb19MjwcCg+IWSNJVDmxYxaTG2zvdkpLHBjEyfJjKzXRpnzTCLMxnp4/unoP+Enp4sqHMGAoA6Fvwa9M1SIG7nbrt795447h8wU2PA0D+ZYnJZ6Z3fYcILV5rlrS3Sw8f/An0PQPmzmWjSQMbU53Ymv/v4SQmeec7u6+6183n2zmbBsxhj2lrNsas+Ke3tFxjdrHugfwZQdKZvJwUEENcw2YM9vTbz9GY5eLInvkCsuFbMpOY5E0O176ZNNW9fd40sQQ1P0n8bYF6rfV/bPmsGAPHNKJJ/eG6rfXr/AZkZRZEXx+JY6wBEnDi2Ljbg1E5+Nm3XkcF02nRhI+VsnRjXlTpUNSoWJR7Nx83l2DSu/pg5sWG9We8Y+SvAPDDRvB8IBAA5PnxoaFg+9bOnyp3DeclK7ABAlGlXwcRxDBjHRToGQB7V+wKC8eFpbebwsqUmtWCeLIT5DuZRbzXEnAO0Rmg3IeNWMZK1scSo8MGhQelaNF8ucXy5HzB3MeY95YxAADGL0T8/1iX+s1ui42GIGqkUFIACAVAcRyoR+hVcXOkX2kiIMSqlZMFczhxct0bSy5aYtYA5TOeWOJRtcUk6g2EZKUfMWZYMlDYQ66Qxioa6nMzyG+QiLyer3bR08A3LyNO0rwdQuYrmfYEAQn3/lsNHZHjrtmiUj3HyjinHkVcB4wIIxmHY8C+KrMuOKuNIhTFqO9YxDQ22/4qPO40dc4xuyg+hf8/n5bgbSCqMJONEki4HkmayNEymY54x6zTv0gKwsgILJYXkM8aX5uYOuTozRS6zkbzjpGQFYIYVzIRAAKGq8cSxLjtv67Z4H7aB8HWXY4+I5mg7YvcVEM8KgHeAoD+OVEKOg2qU111qolUrzAK+/i70r9CoDEu6EADAS3Y+FRZpA6IECJhJI6GMAmO+NDuXjhhLOxWFuPSIGmBeStpblskfZqfKDuMYDb7v6zIfGByWVdtfkZdgKHIcRGHEARAigHkTuyBCBqiDSJQYvcHo0S92yG1qtIXPftpdmc3KNta4AVKvo7ElxTZ4WJArxJ4wFl/b5ZC+GGJTYF5tzaXtoWYuuQCbo6qbqF4yLszLUP+b8qtCn1xlC3aOqTNHfsMokcbtiPNPtm2Pf4kE8uhz4PsmQGFCAIWuD7lOoG3MO2DFwDG27LqV9/M7ZPALn3PXAeLbgLoOOgEAjTEu0vDQARcwblimDaPYhscGKcNuBBg2RSXsKQBsD8cB0a+kc0S8U1ClfjkSDkpp4B35U/qTl1onBRDNNO7d2RlvCgIpIX52iD3jQ5XMmAQAH7s4pihW9dLdY5+Y3Fm0wAnXrzVXMMeVAFBpYJlW1deVfsgXt1hi5xWESoJ+B8kk8/McB4kUPJUIUqjWKg1t431ZC14A6wHawaZGo6Is1HVOj8Z/09MrPSe6bb9xjeM5BrXB+1B71nWUcZ0IKWDbtK2CQ6Xi2Jk7x/HXrTVXM+fvVkHoAhRPusUbzojXgFopAFUnVSGMuqJSyphKhrmRdMJo4vEqKuXpWGUeCSbSUJAJIGwXcEFlkWStZOfms7tf238ofhjWAifCjLCNMjHKYMSJFHTfNVVQ2WAbmAVGH7n1Da5Zu0aupe8GQDw/NmVFGiWZF7XKgqzILJjJ+r4MsYsDZkSOMJNbruxwok4wXLELVE6ZV3AqcVWlRCqVsYmkQJCGqxbc0iZdr1Yi9/X2yQv5kfiE73qOdWIkIC4WGAtGjG4qfkxGjZ3vUDn8rIpbPrFOLmfS+wDxC50UdbqQ6nboszjRebixQRjqNtgUdZtTJ63EgQKq8RqgflHoltdRQHw7agYY1lJ1SyShaqcgFAz8VNSNdionc5lvtG2FeVzXhK9k4Q4WuPHwO/E233cw4DjEJkIkEroetgIDDCx7WtNHf5C0PQkWL3aaMWwNTPcAYAm0kfbL0FTob6FpQG52XLMI2a5wPDPdeNJE/xdxHPu9rNyVmynfT+fkIt04pUSVVBo1ILSt6pTUrtT7ObnQr5cfMU9SEiC0bi0UZUehIP3kOoHunOdJ6OOR2PGygsJ3l+gPEUnouyZQb5ZOS2rRfPMZvv8K9AVoB1SAliGdP4D+C+rm+T2FvlEvbX7qps2XvDqZxcb8JNUof529QG5jQzVueAS8xC4UlD6rofNOvV4m2yof97NyuG2V3FGdWDVDVWHPsa74iWPHnHdUrFGEIbONSdDTiTSSkE/pO+2Pea9pCQbesXhBsvM/Z5pvQV+ByYd1zsmWcMiuJxD+SANgoUc2lvrkEMEvCYKatmj64mZkHoA/gYbk0w1yWcsyc6i6DsZk5/CweGDAOYr2lz2LmePrrYLBwpMgTgBkNyLSCQIgbewGTxC1T7OXYDeb+V5V6BpA/Ir6nIrfaF60fXblqCePZFrkdiT1brkovUT6YTZtCry0Uze6KdmccuWmpmVGT5TjRY39aoLT3jCMRpCbG+GpCL1RGeZVrAZDLwMCz+US0SP1NLgst6E+npnLOTP4/mbolg8DosqNaTWDtK/Ln7QXoUtfxoYujjLSgsH3s3mbcQHfb11g3qiOr60VyEVE1504VIzcUS+l3spBRz2MkqDnODh49BTvrZIiU8RVRa0tph2F013ZAogf1076Ydu5aeZV5vjqZOZRIEtJSd4AAJ6HOAezKolUGlOJYo+QSBgjzaqoWuQ7mjCKW18vqpJcH8jXJ7Pg+RqrQBYA5P983y2ReKiHUBtxSOiIsjY2adJ10gH178QPzYDpduK6dAJkF9I4fL6Ym8y8CqSJiDuCuw0IUG5oIpI6FzuRmHMGWQPRHVCerxlKxEEKOxIOHL5DsJafTWax8zlWgTRgTMNJACTnTMNnHEYuwYQUJKrkVvQDVs08ybPUjgiI+u3w+WRuMnMrMxyD2H0CXdqRcqARlBQkk8bbklWF1nW5UDPlcuTRH8UGvyYuppIss2kyi53PsQpkiKidJpkLolLZ9Q2mgKEngMhE0ynMHHCUWG2HcxOeCzxGs3AuIn5Liu7rUMrjPEzKwRlYc6wAPxUqMLUbGA5UWtpGpUKItJkTtySud9ZvCY4kaXybCDeTkI2de4GTljAF4wQ+ToTl0AccKaeCCPBaIbElJMcKkNJBQKw/X0B2bbX37n3F9pw8aqPhARsPdNv46F4bvvGC3fvqs/bK09c1pCgPwFRbd7d8R1VHj53oTHJG1yiufaWozKnKw/rpj8p4Ls+d3i6X12flVibswAWTPXw0ZfdW+8nGqfLU9A5J79oisucVkd4TapUErdkiqzaIzFks9q0dcmDlellUXVuB3AYL3xgelt/jeOsQU9wUVwRaF/WAA/NkwYChHSnQMidGz82lpa6tTf4baX6ZyR79KGDset7e3LFSHjm2X8xj3CcOkDfj+vEwFSID4UwnsuRikS+RovZ2SWHgRWla82cmVCAaoQ+Twq8fCaVHGTd6wxGKgwolgHhXAcc70hO9MHDiUtlraXVuymScz6dTshAwox8GzAub7NLla6XzUKc4G7k8UqYTxqsgagApsBZOO3f/QOTofulasdbM0OubIzCwt65O1uO9gmh0zLBzSU1EwSYayMP0LIIdMYm66dDPeqXhIedR1HKkWLKPsyEkqOdWXt1oOxZfKDv7jovzxPdOzcGmcrLmWWutqs+0+5HWQ/dy8LlELtj+jP1qJRqIPEIyeFM0MqreSo059KLEoAPur8IsHgtAyekQEFoHpNdlPFkhP0KuZc3KUsk+un178ovVKU7OovXST+3s2WtkV54fhH78Hc4N6tQpCYCxugoieYFq6bOWnS/wc9d2MXX18ndVIP/Bh+uamrJzsY+Am/ESRh/STtwuux6Sl4QcadVbhUrquVRKhULYVSrJnzP9ulWr5OVi0S6qLPPB/7/2qJ05/xLZXRiS3GPsLreJGpwru8/nyYUA9TiosXb1WVfofIkz9UzuAfQB9TpE9ROkcRdGHmD4ZWUUdQsUmFID6gUAZT5QQFongOr9ILCyn29uQXX7WGQn0vnBmO3p9BOWzk12zqx18lYpL/Ub7xMJSxMMU1WiuyqRKoBqrV8cekukuU2ICmOl3CX3c7B8tr5BLkVlfk23gtRzcxLRC4VR0t6sC6AICST9gInS3FRxKa3erW9oQO5M1cllGV/uwFkcLJbiTtTuGXZ5H6rbBRU5pLUNHJAbW2bI9QPYxOOA4Hj7HoZVEsQs/tNNrpCyqV3Juxpnn+Oqnew8eadjkhK8Y/W3u0w0KMszy7lWq1wXOUNDFTfMpE6xOEp6n03cchAU3QxuS39uUA+Xx9Nxc857blZ9Z56fdjd4jqxlnumAmBKWbHrkpPhTO4y/80kx2x7DM2ET6oXUQ3GgO+WpaFf7x2vtU2/GeB3LnPIprjyuurGCOwGh/wV77FqvQ37N1aUtvytPcc/09dRyOUiwdJGS3gI6TU2JBFSShme9qHNUQkFQ0veu8PNTuSIhddmmWAy9Uo8/m8zgG1Pmybr8SXFefETk+L5TzPMTQsJ0LZDT40ftuwQYYBTI3T8UGemXYyqt95TSAftiigXxSpzgxZaOcZ4fkIe4DHi4bjG/KKFuA9xUuG6zSiWRDHGGc6O42I6CcgisnlOUZm7Lv+hn5HOtHTIn3yNm15MiBzDO2vigTFUZ093WgFd9XwtmIqlcSJS/4+/FvrpFbv4NIIoKFevn99TmYVKE9BJ0rYNt98UWu2U4GpI3Ob0fCUpyAiPS66NeeGkByFQiyVwnI8u5PJuVbZMmvJA50QnzW0VO7K0w/B7G+bBWpU5nfHzsmDpVn7VunMLv4g8SEPfJ26suNwsnBGL32Ubua3u5tvd6OXGoHrttgJoFzaBdD9VhQCTxXH0KJ0v8MBuQF0F1ZLiL9GG/SM9BmNddHttpZaC620mb5ypztYDGpVIrISSVjKXPZ+07/4mbwBEZXbBS6vG6dtxrqSSqhcvNodFd9srUbHl+yg3i9PwPjMJg8XhlstN3bpy5GrXQRXWXEq+jsQEGtFS9UFJXn8dq7gXGy/g4emo9VY7L1jv+MfFU5XyXzDOrKglrEkfGv65pZD9mtrp9crXXJPFUPAPpfcKEDqmKsVonn+kDjCgDWsYZ1YcxBqvvtEtL7bN+pqRMV9vjC+lgypTpIn95P2MIxIMnZdnqzyS/vyfv3heIvjXzzOa4S1ai9+GMW1Crdu3kH6QLatEK+6gwoA8TgNH3tcCSds331WettdTW2qXPS3Hif4E6jQ5JvuttaVtxuUF5T5WxT091TNSyz9pMYa7sqZsrs3u3ijmJ8SZ6rzqvel6ry/oMGO37wHc6VucY+746Z9I39k5D9u/cKrL2WrF7d8iuZZfJarWJ0/k8KyDVj/J77YMY+x3lAt7oOc4Lb1aYrdoIWUDCfPW5CqiWMW2fznytzVW/JQOQVVeKXPFH2Gcg8bsH5FurNhgysonLpIDoFPnttj1ukl9mZ8vSYp+Y47jofvIdFqt4FRioMnM6w6cDSsYxPgGnUgEkv6XL0g0iF18rkmsWe+QteXnkVdmgh6eJIVR6Jw2kOtnQdrtUmuV/s+0yh/hh+ogXJ15DSocAUj4FphqRa3e9VhW1n0sPmbGcI+xqkUWXiZRGxXYflk6k8vtLLzV7qmueqT5nINVJba9tHOyWfyOuXJ+dIfxZjBjcogwe5XqGmuxWivx1ida64+r9NPbwY4004jyaZ+KN5hCDYL73mAwxdtPCJ+VW821+n5pE+dBAateyr9tcny93oi2fh9n5gMvxe4bj8XdzpDiJR+MvHaRM+sOuR8VhGUQl93OY2jRvjdwzkRHXzn+m9v8D97jw5JCiSNoAAAAASUVORK5CYII=
// @grant        none
// ==/UserScript==

(function() {
    // Intercept XMLHttpRequest
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        if (url.includes('coco/whitelist.json')) {
            this.isIntercepted = true;
        }
        return originalOpen.apply(this, arguments);
    };

    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
        if (this.isIntercepted) {
            this.onreadystatechange = () => {
                if (this.readyState === 4 && this.status === 200) {
                    let val = ""
                    if((new URL(window.location.href)).searchParams.has("workId")){
                        val = (new URL(window.location.href)).searchParams.get("workId")
                    }
                    else if(window.location.pathname.split("/").length > 3){
                        val = window.location.pathname.split("/")[3]
                    }

                    Object.defineProperty(this, 'responseText', { value: `[${val}]` });
                    Object.defineProperty(this, 'response', { value: `[${val}]` });
                }
            };
        }
        return originalSend.apply(this, arguments);
    };

    // Intercept fetch
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        if (typeof url === 'string' && url.includes('coco/whitelist.json')) {
            return new Promise((resolve) => {
                let val = ""
                    if((new URL(window.location.href)).searchParams.has("workId")){
                        val = (new URL(window.location.href)).searchParams.get("workId")
                    }
                    else if(window.location.pathname.split("/").length > 3){
                        val = window.location.pathname.split("/")[3]
                    }
                resolve(new Response(`[${val}]`, {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }));
            });
        }
        return originalFetch.apply(this, arguments);
    };
})();
