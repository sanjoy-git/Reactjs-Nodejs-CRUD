import { useEffect, useState } from "react";
import "./App.css";
import { baseUrl } from "./apis/apis";
import axios from "axios";
import {ImageProcess} from './middleware/ImageProcess'

export default function App() {
  const [studentDB, setStudentDB] = useState([]);
  const [isStudentEdit, setIsStudentEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // Student Data Get Function
  useEffect(() => {
    axios
      .get(`${baseUrl}/students`)
      .then((res) => res?.data)
      .then((data) => setStudentDB(data?.studentDB))
      .catch((error) => console.log(error));
  }, []);

  
  // Set Profile Picture Handler Function
  var profilePictureBase64; // Global Variable Declar
  async function profilePictureHandlerFunc(e,handle) {
    e.preventDefault();
    // const url = URL.createObjectURL(e?.target?.files[0]);

    profilePictureBase64 = await ImageProcess(e?.target?.files[0]); // Image Processing Middleware Function     

    if(handle == "profilePicture"){
      document.getElementById("profilePicture").src = await profilePictureBase64;
    }
    else{
      document.getElementById("updateProfilePicture").src =await profilePictureBase64;      
    }
  }

  // Student Add Function
  function studentAddFunc(e) {
    e.preventDefault();
    const name = document.getElementsByName("name")[0].value;
    const roll = document.getElementsByName("roll")[0].value;
    

    const body = {profilePictureBase64, name, roll};

    axios
      .post(
        `${baseUrl}/studentAdd`,
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

  // Student Delete Functon
  function studentDeleteFunc(e, id) {
    e.preventDefault();
    axios
      .delete(`${baseUrl}/studentDelete/${id}`)
      .then((res) => res?.data)
      .then((data) => setStudentDB(data?.studentDB))
      .catch((error) => {
        console.log(error);
      });
  }

  // Student Update Function
  function studentUpdateFunc(e, id) {
    e.preventDefault();
    const name = document.getElementsByName("updateName")[0].value;
    const roll = document.getElementsByName("updateRoll")[0].value;

    const body = {profilePictureBase64, name, roll };

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
        <form onSubmit={studentAddFunc} className="studentAddForm">
          <div className="profilePicture">
            <label htmlFor="fileUpload">i</label>
            <img src="./avater.webp" id="profilePicture" alt="" />
            <input type="file" id="fileUpload" accept="image/png, image/gif, image/jpeg" onChange={(e)=>profilePictureHandlerFunc(e,"profilePicture")}/>
          </div>
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
              <form onSubmit={(e)=>{studentUpdateFunc(e,item?.uniqueId);setIsStudentEdit(!isStudentEdit)}} className="studentAddForm">
                <div className="profilePicture">
                  <label htmlFor="updateFileUpload">i</label>
                  <img src={item?.profilePictureBase64} id="updateProfilePicture" alt="Profile Picture" />
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
                <img src={item?.profilePictureBase64} alt="Profile Picture" />
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
