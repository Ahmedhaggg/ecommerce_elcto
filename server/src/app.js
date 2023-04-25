const express = require("express");
const cors = require("cors");
const { UPLOADS_DEST, SERVER_PORT } = require("./config");
let apiErrorHandlerMiddleware = require("./middlewares/apiErrorHandlerMiddleware")
let apiNotFoundMiddleware = require("./middlewares/apiNotFoundMiddleware");
const app = express();
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use("/api/images", express.static(UPLOADS_DEST))

// database config
require("./config/database");

// redis cahce config
require("./config/redis");
 
// routes
require("./routes")(app)
// Category.find().then((re) => console.log(re)); 
app.use(apiErrorHandlerMiddleware) 
app.use(apiNotFoundMiddleware)
// Notification.find().then((result) => console.log(result)).catch(() =>{})

// 64293dd576ab2aa596629806

// const x = async () => {
//     console.log("")
//     let order = await Order.findOne({ _id: "643af7a6b269054baf6590a2" });
    
//     try {
//         let res1 = await redisSubscriber.subscribe(order.user.toString(), (m, c) => console.log(m, c))
//         console.log("res1", res1)
//         let res2 = await redisClient.pubSubChannels(order.user.toString())
//         console.log("res2", res2)
//         let res3 = await redisClient.PUBSUB_CHANNELS()
//         console.log("res3", res3)
//     } catch(error) {
//         console.log(error)
//     }
// }
// x()

app.listen(SERVER_PORT, () => console.log("server is running" + SERVER_PORT));