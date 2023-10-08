import { useState } from 'react'
import './App.css'
import axios from 'axios';

import FileUpload from './components/FileUpload'
import { API_URL } from './utils/constants';
import { Alert, Fade } from 'react-bootstrap';

const ResponseMsg = ({variant,res})=>{
  return (
    <Alert variant={variant} style={{marginTop:'5px'}}>
      {res}
    </Alert>
  )
}
function App() {
  const [file, setFile] = useState(null); // state for storing actual image
  const [errorMsg, setErrorMsg] = useState('');
  const [resMsg,setResMsg] = useState({
    variant:'',
    msg:''
  });
  const [response,setResponse] = useState({
    shortUrl:'',
    originalUrl:''
  })
  const [showResult,setShowResult] = useState(false);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log('Sumbit Clicked');
  
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
          const data = {
            shortUrl:res.data.fileData.short_path,
            originalUrl:res.data.fileData.original_path
          }
          setResponse({...data});
          setResMsg({
            variant:'success',
            msg:'File Uploaded Successfully.'
          });
          setShowResult(true);

        } else {
          setErrorMsg('Please select a file to add.');
        }
       
    } catch (error) {
      console.log(error.response);
      error.response && setErrorMsg(error.response.data);
      setResMsg({
        variant:'danger',
        msg:'Error uploading your file. Please, try again later.'
      });
      setShowResult(false);
    }
  };


  return (
    <div className='container mt-5'>
      <h3>Upload File</h3>
      <div className="card">
        <FileUpload file={file} setFile={setFile} 
        errorMsg={errorMsg} setErrorMsg={setErrorMsg}
        handleOnSubmit={handleOnSubmit}/>
      </div>
        {resMsg.variant!=='' &&
          <Fade in={resMsg.variant!==''} >
            <ResponseMsg variant={resMsg.variant} res={resMsg.msg}/>
          </Fade>
        }
      {showResult && 
      <div>
        Your file is successfully uploaded. Here is the link to share:
        <a href={response.originalUrl} target='_blank'>{response.shortUrl}</a>
      </div>
      }  
    </div>
  )
}

export default App
