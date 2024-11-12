const express = require("express");
const router = express.Router();
const { studentDB } = require("../models/tempDB");

router.get("/students", (req, res) => {
  res.json({
    studentDB,
    status: "Get success",
  });
});

router.post("/studentAdd", (req, res) => {
  const { name, roll } = req?.body;
  const uniqueId = Math.random().toString(16).slice(2);
  studentDB.push({ uniqueId, name, roll });
  res.json({
    status: "Post success",
    studentDB,
  });
});

router.put("/studentUpdate", (req, res) => {});

router.delete("/studentDelete/:id", (req, res) => {
  const id = req?.params?.id;

  const notDeleteData = studentDB.filter((item)=>{
    return item.uniqueId != id;
  })

  studentDB.length=0;

  notDeleteData?.map(item=>studentDB.push(item));

  res.json({
    status: "Delete success",
    studentDB,
  });
});

module.exports = router;