var moment = require('moment');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(process.cwd() + '/public/index.html');
    })
    
    app.get('/:date', (req, res) => {
        var date = req.params.date;
        
        var unixFormatted = null;
        var naturalFormatted = null;
        
        if(+date >= 0) {
            unixFormatted = +date
            naturalFormatted = unixToNatural(unixFormatted)
        }
        
        if(isNaN(+date) && moment(date, 'MMMM D, YYYY').isValid()) {
            unixFormatted = +naturalToUnix(date)
            naturalFormatted = unixToNatural(unixFormatted)
        }
        
        var results = {
            "unix": unixFormatted,
            "natural": naturalFormatted
        }
        
        res.send(results)
        
    })
    
    function unixToNatural(unix) {
        return moment.unix(unix).format("MMMM D, YYYY")
    }
    
    function naturalToUnix(date) {
        return moment(date, 'MMMM D, YYYY').format('X')
    }
}