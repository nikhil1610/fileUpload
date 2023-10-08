import { useState, useRef } from 'react';
import { Form, Row, Col, Button, Card, Container } from 'react-bootstrap';

import Dropzone, { useDropzone } from 'react-dropzone';

const FileUpload = ({file,setFile,errorMsg,setErrorMsg,handleOnSubmit}) => {

  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area


  const onDrop = (files) =>{
    const [uploadedFile] = files;
    if(!uploadedFile.name.match(/\.(jpeg|jpg|png|pdf|doc|docx)$/)){
      setErrorMsg('Only jpeg|png|pdf|doc files are accepted.');
      setFile(null);
      setPreviewSrc('');
      setIsPreviewAvailable(false);
      return;
    }
    setErrorMsg('');
    setFile(uploadedFile);
  
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));  
  }

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };


  return (
    <>
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}

          <div className="upload-section">
            <Container>
              <Row>
                <Col>
                  <Dropzone 
                    onDrop={onDrop}
                    onDragEnter={() => updateBorder('over')}
                    onDragLeave={() => updateBorder('leave')}            
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                        <input {...getInputProps()} />
                        <Card border="secondary">
                          <p>Drag and drop a file OR click here to select a file</p>
                        </Card>

                        {file && (
                          <div>
                            <strong>Selected file:</strong> {file.name}
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                  {previewSrc ? (
                    isPreviewAvailable ? (
                      <div className="image-preview">
                        <img className="preview-image" style={{height:'350px',width:'350px',objectFit:'contain'}} src={previewSrc} alt="Preview" />
                      </div>
                    ) : (
                      <div className="preview-message">
                        <p>No preview available for this file</p>
                      </div>
                    )
                  ) : (
                    <div className="preview-message">
                      <p>Image preview will be shown here after selection</p>
                    </div>
                  )}
                </Col>
            </Row>
          </Container>

          <Button className="mt-3" variant="primary" type="submit">
            Upload
          </Button>

        </div>
      </Form>
      </>
  )
}

export default FileUpload;