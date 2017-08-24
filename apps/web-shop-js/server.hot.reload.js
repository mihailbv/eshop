/* eslint no-console:0 */
/* eslint consistent-return:0 */
const path          = require('path');
const webpack       = require('webpack');
const express       = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config        = require('./webpack.hot.reload.config');
const chalk         = require('chalk');
const http          = require('http');

const app       = express();
const compiler  = webpack(config);


app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));

app.use(hotMiddleware(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// app.get('*', (request, response) => {
//   let url = request.url+"&_escaped_fragment_" 
//   http.get("http://localhost:2000/main/?_escaped_fragment_", function(res) {
//     response.setHeader('Content-Type', 'text/html');

//     res.on('data', function (chunk) {
//       response.send(chunk)
//     });

//   })
// });


app.listen(2005, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(
    `
      =====================================================
      -> Server (${chalk.bgBlue('Hot reload')}) 🏃 (running) on ${chalk.green('localhost')}:${chalk.green('2005')}
      =====================================================
    `
  );
});
