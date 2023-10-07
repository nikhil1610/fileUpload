import { useState } from 'react'
import './App.css'
import axios from 'axios';

import FileUpload from './components/FileUpload'
import { API_URL } from './utils/constants';

function App() {
  const [file, setFile] = useState(null); // state for storing actual image
  const [errorMsg, setErrorMsg] = useState('');

  const handleOnSubmit = async (event) => {
    event.preventDefault();
  
    try {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
  
          setErrorMsg('');
          const res = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          console.log(res);
        } else {
          setErrorMsg('Please select a file to add.');
        }
       
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };


  return (
    <>
      <h1>Share your files with ease</h1>
      <h3>Upload File</h3>
      <div className="card">
        <FileUpload file={file} setFile={setFile} 
        errorMsg={errorMsg} setErrorMsg={setErrorMsg}
        handleOnSubmit={handleOnSubmit}/>
      </div>
    </>
  )
}

export default App
