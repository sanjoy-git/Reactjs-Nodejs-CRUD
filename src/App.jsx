import {useEffect, useState} from 'react'
import './App.css'
import { baseUrl } from './apis/apis'
import axios from 'axios'

export default function App() {

  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/students`)
    .then(res => res?.data)
    .then(data => setStudentsData(data?.studentsData))
    .catch(error => console.log(error))
  }, [])

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
    .then(data => setStudentsData(data?.studentsData))
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
          studentsData?.map((data,index)=>{
            return(
              <div key={index}> 
                <del>{data?.uniqueId}</del>
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
