import {useEffect, useState} from 'react'
import './App.css'
import { baseUrl } from './apis/apis'
import axios from 'axios'

export default function App() {

  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/students`)
    .then(res => res.data)
    .then(data => setStudentsData(data))
    .catch(error => console.log(error))
  }, [])
  

  return (
    <>
      {/* Student List */}
      <div className='studentsDiv'>
        {
          studentsData?.map((data,index)=>{
            return(
              <div key={index}> 
                <p>{data.name}</p>
                <p>{data.roll}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
