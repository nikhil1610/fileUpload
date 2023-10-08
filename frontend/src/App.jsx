import { useState } from 'react'
import axios from 'axios';
import { Alert, Fade, Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import download from 'downloadjs';

import './App.css'
import FileUpload from './components/FileUpload'
import { API_URL } from './utils/constants';

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
  const [loading,setLoading] = useState(false);
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
    setLoading(true);
  
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
          setLoading(false);
          setShowResult(true);

        } else {
          setLoading(false)
          setErrorMsg('Please select a file to add.');
        }
       
    } catch (error) {
      console.log(error.response);
      error.response && setErrorMsg(error.response.data);
      setLoading(false)
      setResMsg({
        variant:'danger',
        msg:'Error uploading your file. Please, try again later.'
      });
      setShowResult(false);
    }
  };


  const donwloadFile = () =>{
    download(response.originalUrl);
  }


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

      {loading && 
      <Spinner animation="border" style={{width:'100px', height:'100px'}} />
      }  
      {showResult && 
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <p>
          Your file is successfully uploaded. 
          <br/>
          Here is the link to share:
        </p>
        <a href={response.originalUrl} target='_blank'>{response.shortUrl}</a>
        <Button className="mt-3 w-50 " variant="success"
        onClick={donwloadFile}>
          Download</Button>
      </div>
      }  
    </div>
  )
}

export default App
