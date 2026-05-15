const {PrismaClient} = require('../generated/client')
const prisma = new PrismaClient()


const createBlog = async (data) => {
    return prisma.blog.create({data})
}
const updateBlog = async (id ,data) => {
    return prisma.blog.update({
        where: {id}, data
    })
}
const deleteBlog = async (id) => {
    return prisma.blog.delete({
        where: {id}
    })
}
const getBlog = async () => {
    return prisma.blog.findMany()
}
const getBlogById = async (id) => {
    return prisma.blog.findUnique({
        where: {id},
        include: {
            comments: {
                orderBy: {
                    created_at: 'asc'
                }
            }
        }
    })
}

const createBlogComment = async (data) => {
    return prisma.blogComment.create({
        data
    })
}

const getBlogComments = async (blog_id) => {
    return prisma.blogComment.findMany({
        where: { blog_id },
        orderBy: { created_at: 'asc' }
    })
}

// ============= BLOG RATING FUNCTIONS =============
const createBlogRate = async (data) => {
    return prisma.blogRate.upsert({
        where: {
            blog_id_user_id: {
                blog_id: data.blog_id,
                user_id: data.user_id
            }
        },
        update: {
            rate: data.rate
        },
        create: {
            blog_id: data.blog_id,
            user_id: data.user_id,
            rate: data.rate
        }
    })
}

const getBlogRates = async (blog_id) => {
    return prisma.blogRate.findMany({
        where: {blog_id},
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true
                }
            }
        }
    })
}

const getBlogRateByUserAndBlog = async (blog_id, user_id) => {
    return prisma.blogRate.findUnique({
        where: {
            blog_id_user_id: {
                blog_id,
                user_id
            }
        }
    })
}

const searchBlogByName = async (name) => {
    return prisma.blog.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
        },
        include: {
            comments: {
                orderBy: {
                    created_at: 'asc'
                }
            }
        }
    })
}

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlog,
    getBlogById,
    createBlogComment,
    getBlogComments,
    createBlogRate,
    getBlogRates,
    getBlogRateByUserAndBlog,
    searchBlogByName
}