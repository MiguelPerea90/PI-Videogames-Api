const validate = (req, res, next) => {
    const {released, rating} = req.body

    if(!released) return res.status(400).json({ error: "Missing released" });
    if(!rating) return res.status(400).json({error: "Missing rating"});

    next();
 };


 module.exports = validate;