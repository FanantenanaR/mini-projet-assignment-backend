const express = require('express');
const router = express.Router();

const {
    getAllProfEndPoint,
    insertProfEndPoint,
    updateProfEndPoint,
    deleteProfEndPoint,
    getProfByIdEndPoint
} = require("../controller/prof.controller");


router.get('/', getAllProfEndPoint);
router.post('/', insertProfEndPoint);
router.put('/:id', updateProfEndPoint);

router.get('/:id', getProfByIdEndPoint);
router.delete('/:id', deleteProfEndPoint);

module.exports = router;