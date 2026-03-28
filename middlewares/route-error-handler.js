const routeNotFound = (res,req) =>{
    res.status(400).send("route doesnt exist")
}

module.exports = routeNotFound