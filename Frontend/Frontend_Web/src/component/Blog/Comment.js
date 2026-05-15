import React, { useState } from 'react'
import API from '../Config/Config'

export default function Comment(props) {
  const [inputs, setInputs] = useState({
    message: ""
  })
  function handleInput(e){
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setInputs(state =>({... state,
      [name]:value
    }))
  }

  let auth = localStorage.getItem("user")
  if(auth){
    auth = JSON.parse(auth)
  }
  const [errors, setErrors] = useState({})
  function handleSubmit(e){
    e.preventDefault()
    let errorSubmit = {}
    let flag = true

    if(auth){
      if(inputs.message ==""){
        errorSubmit.message = "vui long nhap binh luan"
        flag= false
      }
    }
    if(!auth){
      errorSubmit.message = "vui long login"
      flag = false
    }
    if(!flag){
      setErrors(errorSubmit)
      return
    }
    const token = localStorage.getItem("token")
    if(!token){
      alert("Vui lòng đăng nhập lại")
      return
    }
    const config = {
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(token),
        'Accept': 'application/json'
      }
    };

    const formData = new FormData()
    formData.append('comment', inputs.message)
    formData.append('image_user', auth?.avatar || "")
    formData.append('name_user', auth?.name || "")
    formData.append('id_comment', props.id_comment ? props.id_comment : 0)

    API.post("/blog/comment/" + props.id_blog, formData, config)
      .then(res =>{
        console.log(res)
        alert("thanh cong")
        const data = res.data.data
        setInputs({ message: "" })
        setErrors({})
        props.getCmt({
          ...data,
          id_comment: props.id_comment || 0
        })
      })
      .catch(err => {
        console.log(err)
        alert("Lỗi gửi bình luận, vui lòng thử lại")
      })
    

        
    

  }
   function renderError(){
      if(Object.keys(errors).length > 0){
        return Object.keys(errors).map((key, index) => 
          {
           return  (
            <li key={index}>{errors[key]}</li>
        )
        })
      }
    }
   


  return (
    
        <div 

        className="replay-box">
    <div className="row">
    <div className="col-sm-12">
      <h2>Leave a reply</h2>
      {renderError()}

      <div className="text-area">
        <div className="blank-arrow">
          <label htmlFor="message">Your Name</label>
        </div>
        <span>*</span>
        <textarea
          id="message"
          name="message"
          rows={11}
          
          onChange={handleInput}
        />
        <button className="btn btn-primary"  onClick={handleSubmit}>
          Post Comment
        </button>
      </div>
    </div>
  </div>

  
</div>
  )
}
