import React, { useEffect, useState } from 'react'
import API from '../Config/Config'

export default function Product_Add() {
   
    const [getCategory, setCategory] = useState([])
    const [getBrand, setBrand] = useState([])
    
    const [getFiles , setFiles] = useState()
    const [errors, setErrors] = useState()
    const [getInputs, setInputs] = useState({
      name:"",
      price:"",
      company:"",
      brand:"",
      category:"",
      status:"1",
      detail:"",
      sale:""
    })
    useEffect(()=>{
        API.get("/category-brand")
        .then(res =>{
          console.log("setcategory",res.data.category)
            setCategory(res.data.category)
            setBrand(res.data.brand)
        })
        .catch(res =>{
          setCategory(res.data.errors)
        })
    },[])

    function handleInput(e){
      e.preventDefault()
      const name = e.target.name
      const value = e.target.value
      setInputs(state =>({...state,
        [name]:value
      }))
    }
    
   
    function handleFileChange(e){
      e.preventDefault()
        const selectedFiles = e.target.files
        if (selectedFiles.length > 3) {
            alert("ban chi dc upload toi da 3 hinh anh")
            e.target.value = "" 
            return
        }
        setFiles(selectedFiles)
    }
      function handleSubmit(e){
        e.preventDefault()
        let errorSubmit = {}
        let flag = true
        if(getInputs.name == ""){
            errorSubmit.name = "vui long nhap ten"
            flag = false
        }
        if(getInputs.price == ""){
            errorSubmit.price = "vui long nhap price"
            flag = false
        }
        if(getInputs.category == ""){
            errorSubmit.category =" vui long nhap category"
            flag = false
        }
        if(getInputs.brand ==""){
            errorSubmit.brand =" vui long nhap brand"
            flag = false
        }
        if(getInputs.status ==""){
            errorSubmit.status = "vui long nhap dia chi"
            flag = false
        }
         if(getInputs.company ==""){
            errorSubmit.company = "vui long nhap company"
            flag = false
        }
         if(getInputs.detail ==""){
            errorSubmit.detail = "vui long nhap chi tiet"
            flag = false
        }
         if(!getFiles){
            errorSubmit.getFiles = "vui lòng uload ảnh"
            flag = false
        }else{
        Object.keys(getFiles).forEach((key) => {
        const file = getFiles[key]; // lay tung file ra
        const size = file.size;
        const name = file.name;
        const type = name.split(".").pop().toLowerCase();
        const arrType = ["png", "jpg", "jpeg", "webp"];

        if (!arrType.includes(type)) {
            errorSubmit.getFiles = "File " + name + " không đúng định dạng";
            flag = false;
        }
        if (size > 1024 * 1024) {
            errorSubmit.getFiles = "File " + name + " vượt quá 1MB";
            flag = false;
        }
    });
}

        if(!flag){
            setErrors(errorSubmit)
            return
        }
        let token = JSON.parse(localStorage.getItem("token"))
   
        let config = { 
                    headers: { 
                    'Authorization': 'Bearer '+ token,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                    } 
                };


                const formData_Prd_Add = new FormData()
                formData_Prd_Add.append("name" , getInputs.name)
                formData_Prd_Add.append("price", getInputs.price)
                formData_Prd_Add.append("category", getInputs.category)
                formData_Prd_Add.append("brand", getInputs.brand)
                formData_Prd_Add.append("company",getInputs.company)
                formData_Prd_Add.append("detail", getInputs.detail)
                formData_Prd_Add.append("status", getInputs.status)
                formData_Prd_Add.append("sale", getInputs.status == "0" ? getInputs.sale :"")

                Object.keys(getFiles).map((item, i) => {
                  formData_Prd_Add.append("file[]" , getFiles[item])
                })

                API.post("/user/product/add" , formData_Prd_Add,config)
                .then(res => {
                  console.log(res.data)
                  alert("thanh cong ")
                })
    }
       

  return (
    <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Add user</h2>
          <div className="signup-form">{/*sign up form*/}
            <h2>New User Signup!</h2>
            <form action="#" onSubmit={handleSubmit}>
              <input type="text" placeholder="Name" name='name' onChange={handleInput} />
              <input type="text" placeholder="Price" name='price' onChange={handleInput}/>
              <select  name='category' onChange={handleInput}>
                <option value="">Please choose category</option>
                {getCategory && getCategory.length > 0 && getCategory.map((value, index)=>{
                  return(
                     <option key={value.id} value={value.id}>
                    {value.category}
                  </option>
                  )
                 

                })}
                 </select>
              <select  name='brand' onChange={handleInput}>
                <option value="">Please choose brand</option>
                {getBrand && getBrand.length > 0 && getBrand.map((value, index)=>{
                  return(
                     <option key={value.id} value={value.id}>
                      {value.brand}
                     </option>
                  )
                })}
                </select>
              <select placeholder="Status" name='status' onChange={handleInput}>
              <option value={1}>New</option>
              <option value={0}>Sale</option>
               </select>
              {getInputs.status == "0" && (<input type='text' placeholder="Sale" name='sale' onChange={handleInput}></input>)}
              <input type='text' placeholder="Company Profile" name='company' onChange={handleInput} ></input>
              <input type='file' name='image' multiple onChange={handleFileChange}></input>
              <input type='text' placeholder='Details' name='detail' onChange={handleInput}></input>

              <button type="submit" className="btn btn-default">Signup</button>
            </form>
          </div>
        </div>
      </div>
  )
}
