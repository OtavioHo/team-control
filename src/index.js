const express = require('./server')

express.listen(process.env.PORT || 3000)

console.log(`server started at port ${process.env.PORT || 3000}`)
