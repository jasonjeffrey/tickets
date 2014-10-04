module.exports = {
    getRoutes: function () {
        GLOBAL.app.get('*', function (req, res) {
            res.send('hello world');
        });
    }
};