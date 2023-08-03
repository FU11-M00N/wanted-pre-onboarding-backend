const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3001);

app.get('/', (req, res) => {
   res.send('test');
});

app.listen(app.get('port'), () => {
   console.log(app.get('port'));
});
