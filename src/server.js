const express = require("express")
const cors = require("cors")
const env = require("dotenv")
const db = require("./conn")

// jaankan config env
env.config()

const app = express()
const PORT = process.env.PORT

// default middleware
app.use(cors())
app.use(express.json({
    limit : "100mb"
}))
app.use(express.urlencoded({
    extended : true
}))

// routes
app.get("/api/test", (req, res) => {
    console.info("ada request baru ..")

    res.json({
        name : "adam",
        address : "depok"
    })
})

// routes untuk get all all guests
app.get("/api/quests", async (req, res) => {
    try {
        
        let result = await db.quests.findMany()
        res.json(result)

    } catch (error) {
        console.error(error)
        res.send("terjadi kesalahan")
    }
})

// mendapatkan req query dan memasukan ke database
app.post("/api/quest/crerate/query", async (req, res) => {
    try {
        // definisikan query params yang ingin di tangkap
        const {name, address, message} = req.query

        // maukan ke data base
        const result = await db.quests.create({
            data : {
                name : name,
                address : address,
                message : message
            }
        })

        res.json(result)
    } catch (error) {
        console.error(error)
        res.send(error)
    }
})


// mendapatkan requet params dan masukan ke dalam database 
app.post("/api/guest/create/params/:name/:addres/:message", async (req, res) => {
    try {
        
        // tangkap params dari url
        const {name, address, message} = req.params

        const result = await db.quests.create({
            data : {
                name : name,
                address : address,
                message : message
            }
        })

        res.json(result)

    } catch (error) {
        console.error(error)
        res.json(error)
    }
})


// mendapatkan request body
app.post("/api/guest/create/body", async (req, res) => {
    try {
        const {name, address, message} = req.body

        const result = await db.quests.create({
        data :  {name, address, message}
        })
        res.json(result)

    } catch (error) {
        
    }
})


app.listen(PORT, () => {
    console.info(`
    ========================
    SERVER BACKEND QUEST APP
    ========================
    `)
})