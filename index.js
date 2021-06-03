const express = require('express')
const apiRouter = require('./api.js')
const PORT = process.env.PORT || 5000
const path = require('path')
const { CONFIG_API_ROUTE, CONFIG_ENABLE_FRONTEND } = require('./config')

const app = express()
const publicPath = path.join(__dirname, 'frontend', 'dist')

function handle404(_, res, next) {
  if (!CONFIG_ENABLE_FRONTEND) {
    next()
    return
  }
  res.status(404)
  res.sendFile(path.join(publicPath, '404.html'))
}

app.set('x-powered-by', false)
app.get('/404.html', handle404)

if (CONFIG_ENABLE_FRONTEND) {
  app.use(express.static(publicPath))
}

app.use(CONFIG_API_ROUTE, apiRouter())
app.get('*', handle404)

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})
