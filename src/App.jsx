import { useEffect, useState } from "react";
import "./App.css";
import { baseUrl } from "./apis/apis";
import axios from "axios";

export default function App() {
  const [studentDB, setStudentDB] = useState([]);
  const [studentEdit, setStudentEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // Student Data Get Function
  useEffect(() => {
    axios
      .get(`${baseUrl}/students`)
      .then((res) => res?.data)
      .then((data) => setStudentDB(data?.studentDB))
      .catch((error) => console.log(error));
  }, []);

  // Student Add Function
  function studentAdd(e) {
    e.preventDefault();
    const name = document.getElementsByName("name")[0].value;
    const roll = document.getElementsByName("roll")[0].value;

    const body = { name, roll };

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
  function studentDelete(e, id) {
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
  function studentUpdateFunction(e, id) {
    e.preventDefault();
    const name = document.getElementsByName("updateName")[0].value;
    const roll = document.getElementsByName("updateRoll")[0].value;

    const body = { name, roll };

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
        <form onSubmit={studentAdd} className="studentAddForm">
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
      <section className="studentShowSection">
        {studentDB?.map((item, index) => {
          return studentEdit & (editId == item?.uniqueId) ? (
            <div className="updateBody" key={index}>
              <div
                className="deleteEditUpdateCancel"
                onClick={() => setStudentEdit(!studentEdit)}
              >
                <span style={{ color: "blue" }}>Cancle</span>
              </div>
              {/* Student Edit Form */}
              <form onSubmit={(e)=>{studentUpdateFunction(e,item?.uniqueId);setStudentEdit(!studentEdit)}} className="studentAddForm">
                <div>
                  <label htmlFor="name">Name:</label>
                  <br />
                  <input type="text" name="updateName" maxLength={25} required autoFocus/>
                </div>
                <div>
                  <label htmlFor="roll">Roll:</label>
                  <br />
                  <input type="number" name="updateRoll" maxLength={10} required/>
                </div>
                <div>
                  <input type="submit" value="Update"/>
                </div>
              </form>
            </div>
          ) : (
            <div key={index}>
              <div className="deleteEditUpdateCancel">
                <span
                  style={{ color: "red" }}
                  onClick={(e) => studentDelete(e, item?.uniqueId)}
                >
                  Remove
                </span>
                <span
                  onClick={() => {
                    setStudentEdit(!studentEdit);
                    setEditId(item?.uniqueId);
                  }}
                >
                  Edit
                </span>
              </div>
              <p><b>Name: </b> {item?.name}</p>
              <p><b>Roll: </b>{item?.roll}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}
