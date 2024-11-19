const express = require("express");
const shortUniqueId = require("short-unique-id");

const router = express.Router();  //Express Router Function Use

const uId = new shortUniqueId({ length: 10 }); //Unique Id Length Set

const { studentDB } = require("../models/tempDB"); //Require Student Database Array

const {
  imageSaveFunc,
  imageDeleteFunc,
} = require("../middleware/imageFileHandle"); //Student Profile Picture Process and Save Folder

// Student Get Route
router.get("/students", (req, res, next) => {
  try {
    //Response Status Code & Json Object For Frontend
    res.status(200).json({
      studentDB,
      status: "success",
      message : "Student get successfully"
    });
  } catch (error) {
    next(error); //If Error Throw Error Handler Function
  }
});

// Student Post Route | imageSaver Middleware Use For Image Process And Save
router.post("/studentAdd", async (req, res, next) => {
  try {
    const { processProfilePictureBase64Url, name, roll } = req?.body; //Request Data From Frontend

    // const uId = new shortUniqueId({ length: 10 }); //Unique Id length
    const uniqueId = uId?.rnd(); //Unique Id Generate

    //Profile Picture Save And Return Saved Image Path
    const imagePath = imageSaveFunc(
      processProfilePictureBase64Url,
      uniqueId,
      name,
      "students",
      next
    );

    //if imagePath Not Undefine
    if (imagePath) {
      //StudentDB Array Push New Student
      studentDB.push({ uniqueId, imagePath, name, roll });

      //Response Status Code & Json Object For Frontend
      res.status(200).json({
        studentDB,
        status: "success",
        message: "Add successfully",
      });
    } else {
      //Response Status Code & Json Object For Frontend
      res.status(200).json({
        studentDB,
        status: "faild",
        message: "Correct profile picture add and try again.",
      });
    }
  } catch (error) {
    next(error); //If Error Throw Error Handler Function
  }
});

//Student update route req.body(processProfilePictureBase64Url,imagePath,name,roll)
router.put("/studentUpdate/:id", (req, res, next) => {
  try {
    const { id } = req?.params;  //Request Student Id Destructuring
    const { processProfilePictureBase64Url, name, roll } = req?.body; //Request body

    const updateStudentDB = studentDB?.map((item) => { //Studentdb Each Student Pass And Return Update Student Array

      if (item?.uniqueId != id) { //If Student id Not Equal
        return item;    //Each student object return
      } else {
        if (processProfilePictureBase64Url) {  //If Student Profile Picture Base64url 

          imageDeleteFunc(item?.imagePath, next); //Old Profile Picture Delete
          
          const uniqueId = id +"_"+ uId?.rnd(); //Unique Id Generate


          const updateImagePath = imageSaveFunc( //New Profile Picture Save And Update Path Return
            processProfilePictureBase64Url,
            uniqueId,
            name,
            "students",
            next
          );

          return{ //If Update Profile Picture
            uniqueId: id,
            imagePath: updateImagePath,
            name,
            roll,
          };


        } else {
          return{ //If Same Profile Picture
            uniqueId: id,
            imagePath: item?.imagePath,
            name,
            roll,
          };
        }
      }
    });

    studentDB.length = 0; //Student database clean

    updateStudentDB?.map((item) => studentDB.push(item)); //Update Push StudentDB

    //Response Status Code & Json Object For Frontend
    res.status(200).json({
      studentDB,
      message: "Update successfully",
      status: "success",
    });
  } catch (error) {
    next(error); //If Error Throw Error Handler Function
  }
});


//Student delete route
router.delete("/studentDelete/:id", async (req, res, next) => {
  try {
    const { id } = req?.params;  //Request Student Id Destructuring

    const notDeleteData = studentDB.filter((item) => {
      //Without delete student filter
      if (item?.uniqueId == id) {  //If Delete Dtudent Id Equal
        imageDeleteFunc(item?.imagePath, next); //Delete profile picture
      }
      return item?.uniqueId != id;  //If Delete Student Id Not Equal This Student Object Return 
    });

    studentDB.length = 0; //Student DB Clean

    notDeleteData?.map((item) => studentDB.push(item)); //Student db array filter student add/push

    //Response Status Code & Json Object for Frontend
    res.status(200).json({
      studentDB,
      status: "success",
      message: "Delete successfully"
    });
  } catch (error) {
    next(error); //If Error Throw Error Handler Function
  }
});

module.exports = router;  //Default Export Router
