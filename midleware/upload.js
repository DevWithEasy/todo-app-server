const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/upload')
    },
    filename:(req,file,cb)=>{
        const fileName = Date.now()+file.originalname.toLowerCase().split(' ').join('-')
        cb(null,fileName)
    }
})
const upload = multer({
    storage: storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==='image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null,true)
        }else{
            cb(null,false)
            return cb(new Error('Invalid file type. Only jpg.jepg and png are allowed.'));
        }
    }
})

module.exports = upload