module.exports = {
    getRoutes: function () {
        GLOBAL.app.get('*', function (req, res) {
            res.render('index');
        });
    }
};