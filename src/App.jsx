import {useEffect, useState} from 'react'
import './App.css'
import { baseUrl } from './apis/apis'
import axios from 'axios'

export default function App() {

  const [studentDB, setStudentDB] = useState([]);

  // Student Data Get Function
  useEffect(() => {
    axios.get(`${baseUrl}/students`)
    .then(res => res?.data)
    .then(data => setStudentDB(data?.studentDB))
    .catch(error => console.log(error))
  }, [])

  // Student Add Function
  function studentAdd(e) {
    e.preventDefault();
    const name = document.getElementsByName("name")[0].value;
    const roll = document.getElementsByName("roll")[0].value;

    const body = {name,roll};
    
    axios.post(`${baseUrl}/studentAdd`,
      {
        ...body
      },
      {headers: {
        'Content-Type': 'application/json'
      }}
    )
    .then(res => res?.data)
    .then(data => setStudentDB(data?.studentDB))
    .catch((error) => {
      console.log(error);
    });
  }
  
  // Student Delete Functon
  function studentDelete(e,id) {
    e.preventDefault();
    axios.delete(`${baseUrl}/studentDelete/${id}`)
    .then(res => res?.data)
    .then(data => setStudentDB(data?.studentDB))
    .catch((error) => {
      console.log(error);
    });
    
  }

  return (
    <>
      {/* Student Add Form */}
      <section className='studentAddSection'>
        <form onSubmit={studentAdd}>
          <div>
            <label htmlFor="name">Name:</label><br />
            <input type="text" name="name" id="" />
          </div>
          <div>
            <label htmlFor="roll">Roll:</label><br />
            <input type="text" name="roll" id="" />
          </div>
          <div>
            <input type="submit"/>
          </div>
        </form>
      </section>

      <br /><br />

      {/* Student List Show*/}
      <section className='studentShowSection'>
        {
          studentDB?.map((data,index)=>{
            return(
              <div key={index}> 
                <del onClick={(e)=>studentDelete(e,data?.uniqueId)}>X</del>
                <p>{data?.name}</p>
                <p>{data?.roll}</p>
              </div>
            )
          })
        }
      </section>
    </>
  )
}
