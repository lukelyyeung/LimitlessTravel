const express = require("express");


class UserRouter{

    constructor(saveService, getService){
        this.saveService = saveService;
        this.getService = getService;
    }

    router(){
        let router = express.Router();
        router.get("/",this.get.bind(this));
        router.post("/",this.post.bind(this));
        router.put("/:id",this.put.bind(this));
        router.patch("/:id",this.put.bind(this));
        router.delete("/:id",this.delete.bind(this));
        return router;
    }

    get(req,res){
        return this.getService.list()
            .then((data)=>res.json(data))
            .catch((err)=>res.status(500).json(err));
    }

    post(req,res){
        return this.saveService.create(req.body)
            .then((data)=>res.json(data))
            .catch((err)=>res.status(500).json(err));
    }

    put(req,res){
        return this.saveService.update(req.params.id,req.body)
            .then((data)=>res.json(data))
            .catch((err)=> res.status(500).json(err));
    }

    delete(req,res){
        return this.saveService.delete(req.params.id)
            .then((data)=>res.json(data))
            .catch((err)=> res.status(500).json(err));
    }
}

module.exports = UserRouter

