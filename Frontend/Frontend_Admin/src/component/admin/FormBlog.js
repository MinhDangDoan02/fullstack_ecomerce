import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../config/Config'



export default function FormBlog() {

  const [getInputBlog , setInputBlog ] = useState({
    title: '',
    description:'',
    content:''

  })
  const [files , setFiles] = useState()
  const [errors, setErrors] = useState({})

  function handleInput(e){
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setInputBlog(state => ({...state, 
      [name]: value} ))
  }
  
  function handleFile(e){
    e.preventDefault()
    const selectedFiles = e.target.files
    if(selectedFiles.length > 3){
      alert('chi duong upload toi da 3 anh')
      
       e.target.value = ''
       return
    }
    setFiles(selectedFiles)
  }

  function handleSubmit(e){
    e.preventDefault()
    let errorSubmit = {}
    let flag = true
    if(getInputBlog.title == ''){
      errorSubmit.title = 'vui long nhap title'
      flag = false
    }
    if(getInputBlog.description == ''){
      errorSubmit.content = 'vui long nhap mo ta'
      flag = false
    }
    if(getInputBlog.content == ''){
      errorSubmit.content = 'vui long nhap content'
      flag = false
    }
    if(!files){
      errorSubmit.image = 'vui long chon anh'
      flag = false
    }
    else{
      Object.keys(files).forEach((key) =>{
        const file = files[key]
        const maxSize = 1024*1024
        let type = file.name.split(".").pop().toLowerCase()
        const arrImage = ['png', 'jpg', 'jpeg']
        if(file.size > maxSize ){
          errorSubmit.image = 'vui long upload anh duoi 1MB'
          flag = false
        }
        if(!arrImage.includes(type)){
          errorSubmit.file = 'file ko dung dinh dang'
          flag = false
        }
      })
    }
    if(!flag){
      setErrors(errorSubmit)
      return ''
    }
    else {
      const token = JSON.parse(localStorage.getItem('token'))
      const config = {
        headers: {
          Authorization: 'Bearer ' + token
        }
  }
      const formData = new FormData();

      formData.append('title', getInputBlog.title);
      formData.append('description', getInputBlog.description);
      formData.append('content', getInputBlog.content);
     if (files) {
        Object.keys(files).forEach((key) => {
          formData.append('image', files[key])
        })
}
       API.post('/admin/blog/add',formData, config)
       .then(res => {
       if(res.data.errors){
        alert('dang blog that bai')
      }
        alert('dang blog thanh cong')
    })
    }
  }
  function renderError(){
        if(Object.keys(errors).length > 0){
        return Object.keys(errors).map((key,index)=>
        {
            return  (
            <li key={index}>{errors[key]}</li>
        )
        })
    }
    return ''
    }

  function fetchData(e){
    if(getInputBlog){
      return(
         <form onSubmit={handleSubmit}>   
          <div className="mb-3 text-center">
            <ul>
                {renderError()}
            </ul>
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input 
              type="text" 
              name="title" 
              className="form-control" 
              onChange={handleInput} 
              id="title" 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input 
              type="file" 
              name="image"
              className="form-control"
              multiple 
               onChange={handleFile}
              id="image" 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input 
              type="text" 
              name="description"
              className="form-control" 
              onChange={handleInput} 
              id="desciption" 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content</label>
            <input 
              type="text" 
              name="content"
              className="form-control" 
              onChange={handleInput} 
              id="content" 
            />
          </div>
           

          <button type="submit" className="btn btn-success me-2">Submit Update</button>
          
        </form>
      )
    }
}


  return (
    <div className="flex-grow-1 p-4">
      <h1 className="text-success">FormBlog</h1>
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-success text-white">Form Blog</div>
        <div className="card-body">
          {fetchData()}
        </div>
      </div>
    </div>
    
  )
}
