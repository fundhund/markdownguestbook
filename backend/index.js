const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db.js')

const PORT = 5000

app.use(express.json())
app.use(cors())

app.set('json spaces', 2)

const hello = async (_, res) => {
	try {
		res.send('<h1>OK</h1>')
	} catch (err) {
		console.error(err.message)
	}
}

const getAllEntries = async (_, res) => {
    try {
		const { rows } = await pool.query('SELECT * FROM entry')
		res.status(200).json(rows)
	} catch (err) {
		console.error(err.message)
	}
}

const postEntry = async (req, res) => {
    try {
        const name = req?.body?.name
        if (!name) {
            res.status(400).send('Missing name')
            return
        }

        const message = req?.body?.message
        if (!message) {
            res.status(400).send('Missing message')
            return
        }

        const ip = req?.headers['x-forwarded-for'] || req?.socket?.remoteAddress

        await pool.query(`INSERT INTO entry (name, message, ip) VALUES ('${name}', '${message}', '${ip}')`)

        res.status(200).json({name, message, ip})
	} catch (err) {
		console.error(err.message)
	}
}

const deleteEntry = async (req, res) => {
    try {
        const id = req?.params?.id
        if (!id) {
            res.status(400).send('Missing entry ID')
            return
        }

        const row = await pool.query(`SELECT * FROM entry WHERE entry_id = '${id}'`)
        await pool.query(`DELETE FROM entry WHERE entry_id = '${id}'`)

        res.status(200).json(row)
    } catch (err) {
        console.error(err.message)
    }
}

const URL_V1 = '/api/v1'
const URL_ENTRIES = `${URL_V1}/entries`

// ROUTES
app.get(URL_V1, hello)
app.get(URL_ENTRIES, getAllEntries)
app.post(URL_ENTRIES, postEntry)
app.delete(`${URL_ENTRIES}/:id`, deleteEntry)

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})