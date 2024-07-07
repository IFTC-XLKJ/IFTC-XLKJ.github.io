var document = this.document;
var window = this.window;
document.addEventListener('DOMContentLoaded', function () {
    var vvzh = new pgdbs(dbs_a6b2a4d6c02022e831626d31ab805a468a151b90d5161660485a73cc6e1ea902);
    var user = document.getElementById('user');
    var Blogin = document.getElementById('Blogin');
    if (localStorage.getItem('ID')) {
        user.style.display = 'auto';
        Blogin.style.display = 'none';
    }
});