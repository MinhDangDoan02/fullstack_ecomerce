const blogModel = require('../Model/blogModel')
const blogVadication = require('../vadication/blogVadication')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/upload/blog')
    },
    filename : (req, file, cb) => {
        const nameImageBlog = Date.now() + '-' + Math.round(Math.random()* 1e9)
        cb(null, nameImageBlog + path.extname(file.originalname))
    }

})
const upload = multer({storage}).array('image', 5)
const rateParser = multer().none()
const commentParser = multer().none()

const createBlog = async (req, res) => {
    const data = req.body
    const file = req.files
    const errors = blogVadication(data, file)
    if(Object.keys(errors).length > 0){
        res.status(400).json(errors)
    }
    data.image = file? file.map(file =>  file.filename) : []
    data.image = JSON.stringify(data.image)
    const blog = await blogModel.createBlog(data)
    res.json(blog)  
}
const updateBlog = async (req, res) => {
    const data = req.body
    const id = parseInt(req.params.id)
    const file = req.files
    data.image = file? file.map(file => file.filename) : []
    data.image = JSON.stringify(data.image)
    const blog = await blogModel.updateBlog(id, data)
    if(blog){
        res.json(blog)
    } else{
        res.status(404).json({message:'not found blog to update'})
    }
}

const deleteBlog = async (req, res) => {
    const id = parseInt(req.params.id)
    await blogModel.deleteBlog(id)
    res.json({message:'da xoa blog'+''+ id + '' +'thanh cong'})

}
const getBlog = async (req, res) => {
    const blog = await blogModel.getBlog()
    res.json(blog)
}
const getBlogById = async (req, res) => {
    const id = parseInt(req.params.id)
    const blog = await blogModel.getBlogById(id)
    if (!blog) {
        return res.status(404).json({ message: 'Blog không tồn tại' })
    }
    const commentList = blog.comments || []
    delete blog.comments
    blog.comment = commentList
    res.json(blog)
}

const createBlogComment = async (req, res) => {
    try {
        const blog_id = parseInt(req.params.id)
        const user_id = req.user?.userId
        const { comment, image_user, name_user, id_comment } = req.body || {}

        if (!blog_id || !user_id || !comment) {
            return res.status(400).json({ error: 'blog_id, user_id, comment là bắt buộc' })
        }

        const commentData = {
            blog_id,
            user_id,
            comment,
            image_user: image_user || null,
            name_user: name_user || null,
            id_comment: parseInt(id_comment || 0)
        }

        const newComment = await blogModel.createBlogComment(commentData)
        res.json({ message: 'Bình luận thành công', data: newComment })
    } catch (error) {
        console.error('Lỗi tạo bình luận:', error)
        res.status(500).json({ error: 'Lỗi tạo bình luận' })
    }
}

const getBlogComments = async (req, res) => {
    try {
        const blog_id = parseInt(req.params.id)
        if (!blog_id) {
            return res.status(400).json({ error: 'blog_id không hợp lệ' })
        }
        const comments = await blogModel.getBlogComments(blog_id)
        res.json({ message: 'Lấy bình luận thành công', data: comments })
    } catch (error) {
        console.error('Lỗi lấy bình luận:', error)
        res.status(500).json({ error: 'Lỗi lấy bình luận' })
    }
}

// ============= BLOG RATING CONTROLLER =============
const getBlogRate = async (req, res) => {
    try {
        const blog_id = parseInt(req.params.id)
        
        if (!blog_id) {
            return res.status(400).json({error: 'blog_id không hợp lệ'})
        }

        const ratings = await blogModel.getBlogRates(blog_id)
        
        res.json({
            message: 'Lấy đánh giá thành công',
            data: ratings
        })
    } catch (error) {
        console.error('Lỗi lấy đánh giá:', error)
        res.status(500).json({error: 'Lỗi lấy đánh giá'})
    }
}

const createBlogRate = async (req, res) => {
    try {
        const { rate } = req.body || {}
        const blog_id = parseInt(req.params.id)
        const user_id = req.user?.userId || (req.body ? parseInt(req.body.user_id) : null)

        // Validation
        if (!blog_id || !user_id || rate == null) {
            return res.status(400).json({error: 'blog_id, user_id, rate là bắt buộc'})
        }

        if (rate < 1 || rate > 5) {
            return res.status(400).json({error: 'Đánh giá phải từ 1 đến 5'})
        }

        const ratingData = {
            blog_id,
            user_id,
            rate: parseInt(rate)
        }

        const newRating = await blogModel.createBlogRate(ratingData)
        
        res.json({
            message: 'Đánh giá thành công',
            data: newRating
        })
    } catch (error) {
        console.error('Lỗi tạo đánh giá:', error)
        res.status(500).json({error: 'Lỗi tạo đánh giá'})
    }
}

const searchBlogByName = async (req, res) => {
    const { name } = req.query
    if (!name) {
        return res.status(400).json({ message: 'Vui lòng nhập tên blog để tìm kiếm' })
    }
    const blogs = await blogModel.searchBlogByName(name)
    res.json(blogs)
}

module.exports = {
    createBlog,
    upload,
    updateBlog,
    deleteBlog,
    getBlog,
    getBlogById,
    getBlogRate,
    createBlogRate,
    createBlogComment,
    getBlogComments,
    searchBlogByName,
    rateParser,
    commentParser
}