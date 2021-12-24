const express = require('express')
const app = express()
const port = 8000

const cluster = require("cluster")
const os = require("os")

const numCpu = os.cpus().length
app.get('/', (req, res) => {
    
    res.send(`Hello from process ${process.pid} `)
    cluster.worker.kill()
})

 
if(cluster.isMaster){
  for( i = 0; i <numCpu; i++){
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal)=>{
    console.log(`worker ${worker.process.pid} died`)
    cluster.fork()
  })
} 
else{

  app.listen(port, () => {
    console.log(`app server @ ${process.pid} listening at http://localhost:${port}`)
  })

}