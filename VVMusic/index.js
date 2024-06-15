function SearchAPI(name, pagesize, page, n) {
    return `https://api.xingzhige.com/API/NetEase_CloudMusic_new/?name=${name}&pagesize=${pagesize}&page=${page}${n > 0 && 0 % 1 === 0 ? `&n=${n}` : ''}`
}