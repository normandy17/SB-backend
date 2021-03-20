function pagination(model) {
    return async (req, res, next) => {
        var page = Number(req.query.page)
        const limit = Number(req.query.limit)
        var startIndex = (page - 1) * limit
        const endIndex = page.limit
        const results = {}

        if (endIndex < (await model.countDocuments().exec())) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.prev = {
                page: page - 1,
                limit: limit
            }
        }

        results.current = await model.find().limit(limit).skip(startIndex).exec()
        while (results.current.length == 0) {
            page--
            startIndex = (page - 1) * limit
            results.current = await model.find().limit(limit).skip(startIndex).exec()
        }

        results.maxlength = await model.countDocuments().exec()

        

        try {
            results.current = await model.find().limit(limit).skip(startIndex).exec()
            setTimeout(function () {
                res.json(results)
              }, 3000)
            
            next()
        }
        catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}

module.exports = pagination