const productVadication = (data, file) => {
    const errors = {}
    if(data.name == ''){
        errors.name = 'vui long nhap name'
    }
    if(data.price == ''){
        errors.price = 'vui long nhap gia'
    }
    if(data.status ==''){
        errors.status = 'vui long nhap status'
    }
    if(data.sale ==''){
        errors.sale = 'vui long nhap sale'
    }
    if(data.company ==''){
        errors.company = 'vui long nhap company'
    }

    if(!file){
        errors.image = 'vui long upload anh'
    }
    else{
      file.map((value, key) =>{
       const listImageBlog = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
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
module.exports = productVadication