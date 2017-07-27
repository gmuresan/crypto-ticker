const path = require('path')
const fs = require('fs')

const React = require('react')
const {Provider} = require('react-redux')
const {renderToString} = require('react-dom/server')

const {default: configureStore} = require('../src/store')
const {default: App} = require('../src/containers/App')

const currencyPair = process.argv[2];

module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')
  console.log('asfafs');
  console.log(process.argv);

  fs.readFile(filePath, 'utf8', (err, htmlData)=>{
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }
    console.log('asfasf');
    const context = {}
    const store = configureStore()
    const markup = renderToString(
      <Provider store={store}>
          <App/>
      </Provider>
    )

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      redirect(301, context.url)
    } else {
      console.log(currencyPair);
      // we're good, send the response
      const RenderedApp = htmlData.replace('{{SSR}}', markup).replace('BTC\/LTC', currencyPair).replace('BTC/LTC', currencyPair);
      console.log(RenderedApp);
      res.send(RenderedApp)
    }
  })
}

