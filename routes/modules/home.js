const express = require('express')
const router = express.Router()
const ACCschema = require('../../models/accounting')

router.get('/', (req, res) => {
    const userid = req.user.user_id
        // console.log('進入首頁後', userid)
    ACCschema.find({ userId: userid })
        .lean()
        .then((accData) => {
            let subTotals = 0
                // console.log(accData)
            accData.map((acc) => {
                subTotals += acc.subTotal
                acc.date = {
                    year: acc.date.getFullYear(),
                    month: acc.date.getMonth() + 1,
                    day: acc.date.getDate()
                }
            })
            res.render('index', { accData, subTotals, userid })
        })
        .catch(error => console.log(error))
})

module.exports = router