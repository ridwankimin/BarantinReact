const express = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser')

// const {OpenAI} = require('openai')

// const config = new Configuration({
//     api_key: "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",
// })

// const openai = new OpenAI({
//     organization: "org-Lhk8tnm2PR7PUZETcZOqGUNW",
//     apiKey: "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"
// })

const app = express()

// app.use(bodyParser.json())
app.use(cors())

// app.post("/gpt", async (req, res) => {
//     const {prompt} = req.body

//     const completion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         // max_token: 512,
//         // temperature: 0,
//         prompt: prompt
//     })
//     res.send(completion.data.choices[0].text)
// })

// const PORT = 8020

// app.listen(PORT, () => {
//     console.log("Server running on port: 8020")
// })
