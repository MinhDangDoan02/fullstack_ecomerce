const userVadication = (data, file) => {
    const errors = {}
    if(data.name == ''){
        errors.name = 'vui long nhap name'
    }
     if(data.email == ''){
        errors.email = 'vui long nhap email'
    }
     if(data.password == ''){
        errors.password = 'vui long nhap password'
    }
     if(data.phone == ''){
        errors.phone = 'vui long nhap phone'
    }
     if(data.address == ''){
        errors.address = 'vui long nhap address'
    }
     if(data.id_country == ''){
        errors.id_country = 'vui long nhap country'
    }
    if(!file){
        errors.avatar = 'vui long nhap file'
    }
    else{
        const listImage = ['image/png', 'image/jpg', 'image/ejpg']
        if(!listImage.includes(file.mimetype)){
            errors.avatar = 'dinh dang ko hop le' 
        }
        const maxSize = 1024*1024
        if(file.size > maxSize){
            errors.avatar = 'anh phai be hon 1 MB'
        }
    }
    return errors
    
}
module.exports = userVadication
