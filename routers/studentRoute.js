const express = require("express");
const router = express.Router();
const { studentDB } = require("../models/tempDB");

// Student Get Route
router.get("/students", (req, res) => {
  res.json({
    studentDB,
    status: "get success",
  });
});

// Student Post Route
router.post("/studentAdd", (req, res) => {
  const {profilePictureBase64, name, roll } = req?.body;
  const uniqueId = Math.random().toString(16).slice(2);
  studentDB.push({ uniqueId, profilePictureBase64, name, roll });
  res.json({
    studentDB,
    status: "post success",
  });
});

// Student Put Route
router.put("/studentUpdate/:id", (req, res) => {
  const { id } = req?.params;
  const {profilePictureBase64, name, roll } = req?.body;

  const updateStudentDB = [];

  studentDB?.map((item) => {
    if (item?.uniqueId == id) {
      updateStudentDB.push({
        uniqueId: item?.uniqueId,
        profilePictureBase64,
        name,
        roll,
      });
    } else {
      updateStudentDB.push(item);
    }
  });

  studentDB.length = 0;

  updateStudentDB?.map((item) => studentDB.push(item));

  res.json({
    status: "update success",
    studentDB,
  });
});

// Student Delete Route
router.delete("/studentDelete/:id", (req, res) => {
  const { id } = req?.params;

  const notDeleteData = studentDB.filter((item) => {
    return item.uniqueId != id;
  });

  studentDB.length = 0;

  notDeleteData?.map((item) => studentDB.push(item));

  res.json({
    status: "delete success",
    studentDB,
  });
});

module.exports = router;
