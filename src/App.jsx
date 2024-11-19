import { useEffect, useState } from "react";
import "./App.css";
import { baseUrl } from "./apis/apis";
import axios from "axios";
import {ImageProcess} from './customHook/ImageProcess'

export default function App() {
  const [studentDB, setStudentDB] = useState([]);
  const [isStudentEdit, setIsStudentEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [messageRes, setMessageRes] = useState("Please student add");

  // Students Get | Default Call
  useEffect(() => {
    axios   //Axios Use For Backend API
      .get(`${baseUrl}/students`)
      .then((res) => res?.data)
      .then((data) => setStudentDB(data?.studentDB))
      .catch((error) => {
        console.log(error);
        setMessageRes(<span style={{'color':'red'}}>Server problem</span>);
      });
  }, []);

  
  // Set Profile Picture Handler Function
  var processProfilePictureBase64Url; // Global Variable Declar

  async function profilePictureHandlerFunc(e,handle) {
    e.preventDefault();  //DEfault submit reloading off
    // const url = URL.createObjectURL(e?.target?.files[0]);

    processProfilePictureBase64Url = await ImageProcess(e?.target?.files[0]); //Image Processing Custom Hook Function     

    if(handle == "profilePicture"){
      document.getElementById("profilePicture").src = await processProfilePictureBase64Url; //Profile Picture Show
    }
    else{
      document.getElementById("updateProfilePicture").src =await processProfilePictureBase64Url; //Profile Picture Show 
    }
  }
  
  // Student Add Function
  function studentAddFunc(e) {

    e.preventDefault();   //DEfault submit reloading off

    let name = document.getElementsByName("name")[0].value; //Student Add Form Name Get
    let roll = document.getElementsByName("roll")[0].value; //Student Add Form Roll Get

    
    
    const body = {processProfilePictureBase64Url, name, roll};
    // console.log(processProfilePictureBase64Url);

    axios    //Axios Use For Backend API
      .post(
        `${baseUrl}/studentAdd`,
        {
          ...body, //Spread Student Body
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res?.data)
      .then((data) => {
        setStudentDB(data?.studentDB);
        setMessageRes(data?.message);
        if(data?.status=="success"){
          e.target.reset();  //Student Add Form Reset   
          document.getElementById('profilePicture').src="./avater.webp"; //Profile picture reset
          setTimeout(() => {
            setMessageRes(null); 
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
        setMessageRes(<span style={{'color':'red'}}>Server problem</span>);
      });
  }

  // Student Delete Functon
  function studentDeleteFunc(e, id) {
    e.preventDefault();  //DEfault submit reloading off
    axios   //Axios Use For Backend API
      .delete(`${baseUrl}/studentDelete/${id}`)
      .then((res) => res?.data)
      .then((data) => setStudentDB(data?.studentDB))
      .catch((error) => {
        console.log(error);
      });
  }

  // Student Update Function
  function studentUpdateFunc(e, id, imagePath) {
    e.preventDefault();   //DEfault submit reloading off
    const name = document.getElementsByName("updateName")[0].value;
    const roll = document.getElementsByName("updateRoll")[0].value;

    const body = {processProfilePictureBase64Url, imagePath, name, roll };

    axios
      .put(
        `${baseUrl}/studentUpdate/${id}`,
        {
          ...body,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res?.data)
      .then((data) => setStudentDB(data?.studentDB))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {/* Student Add Form */}
      <section>
        <form onSubmit={studentAddFunc} id="studentAddForm" className="studentAddForm">
          <div className="profilePicture">
            <label htmlFor="fileUpload">i</label>
            <img src="./avater.webp" id="profilePicture" alt="" />
            <input type="file" id="fileUpload" name="profilePicture" accept="image/png, image/gif, image/jpeg" onChange={(e)=>profilePictureHandlerFunc(e,"profilePicture")}/>
          </div>
          <p>{messageRes && messageRes}</p>
          <div>
            <label htmlFor="name">Name:</label>
            <br />
            <input type="text" name="name" maxLength={25} required autoFocus/>
          </div>
          <div>
            <label htmlFor="roll">Roll:</label>
            <br />
            <input type="number" name="roll" maxLength={10} required/>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </section>

      <br />
      <br />

      {/* Student List Show and Delete and Edit*/}
      <section className="studentCards">
        {studentDB?.map((item, index) => {
          return isStudentEdit & (editId == item?.uniqueId) ? (
            <div className="studentCard" key={index}>
              <div
                className="deleteEditUpdateCancel"
                onClick={() => setIsStudentEdit(!isStudentEdit)}
              >
                <span style={{ color: "blue" }}>Cancle</span>
              </div>
              {/* Student Edit Form */}
              <form onSubmit={(e)=>{studentUpdateFunc(e,item?.uniqueId,item?.imagePath);setIsStudentEdit(!isStudentEdit)}} className="studentAddForm">
                <div className="profilePicture">
                  <label htmlFor="updateFileUpload">i</label>
                  <img src={baseUrl+"/"+item?.imagePath} id="updateProfilePicture" alt="Profile Picture" />
                  <input type="file" id="updateFileUpload" accept="image/png, image/gif, image/jpeg" onChange={(e)=>profilePictureHandlerFunc(e,"updateProfilePicture")}/>
                </div>
                <div>
                  <label htmlFor="name">Name:</label>
                  <br />
                  <input type="text" name="updateName" maxLength={25} defaultValue={item?.name} required autoFocus/>
                </div>
                <div>
                  <label htmlFor="roll">Roll:</label>
                  <br />
                  <input type="number" name="updateRoll" maxLength={10} defaultValue={item?.roll} required/>
                </div>
                <div>
                  <input type="submit" value="Update"/>
                </div>
              </form>
            </div>
          ) : (
            <div className="studentCard" key={index}>
              <div className="deleteEditUpdateCancel">
                <span
                  style={{ color: "red" }}
                  onClick={(e) => studentDeleteFunc(e, item?.uniqueId)}
                >
                  Remove
                </span>
                <span
                  onClick={() => {
                    setIsStudentEdit(!isStudentEdit);
                    setEditId(item?.uniqueId);
                  }}
                >
                  Edit
                </span>
              </div>
              <div className="studentCardBody">
                <img src={baseUrl+"/"+item?.imagePath} alt="Profile Picture" />
                <div>
                  <p><b>Name: </b> {item?.name}</p>
                  <p><b>Roll: </b>{item?.roll}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
