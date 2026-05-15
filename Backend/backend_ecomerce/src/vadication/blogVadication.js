const blogVadication = (data, file) => {
    const errors = {}
    if(data.title == ''){
        errors.title = 'vui long nhap tieu de'
    }
    if(data.description == ''){
        errors.description = 'vui long nhap mo ta'
    }
    if(data.content ==''){
        errors.content = 'vui long nhap noi dung'
    }
    if(!file){
        errors.image = 'vui long upload anh'
    }
    else{
      file.map((value, key) =>{
       const listImageBlog = ['image/jpeg', 'image/png', 'image/gif']
       if (!listImageBlog.includes(value.mimetype)) {
         errors.avatar = 'Định dạng file không hợp lệ. Chỉ chấp nhận JPEG, PNG hoặc GIF'
       }
  
       
       const maxSize = 1024 * 1024
       if (value.size > maxSize) {
         errors.avatar = 'Dung lượng file quá lớn. Vui lòng chọn file có dung lượng nhỏ hơn 1MB'
       }
     })
    
   }

    return errors
}
module.exports = blogVadication