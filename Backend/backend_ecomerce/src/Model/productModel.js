const {PrismaClient} = require('../generated/client')
const prisma = new PrismaClient()


const createProduct = async (data) => {
    return prisma.product.create({data})
}
const getProduct = async (includeDeleted = false) => {
    const where = includeDeleted ? {} : { isDeleted: false }
    return prisma.product.findMany({
        where,
        include: {
            category: true
        }
    })    
}
    
   


const updateProduct = async ( id, data) => {
    return prisma.product.update({
        where:{id}, data
    })
}

const getProductById = async (id) => {
    return prisma.product.findUnique({
        where: { id } 
    })
}

const deleteProduct = async (id) => {
    return prisma.product.update({ where: { id }, data: { isDeleted: true } })
}

const restoreProduct = async (id) => {
    return prisma.product.update({ where: { id }, data: { isDeleted: false } })
}

const forceDeleteProduct = async (id) => {
    return prisma.product.delete({ where: { id } })
}

const getProductWishlistById = async (id) => {
    return prisma.product.findMany({
        where: { id } 
    })
}
const getProductWishlist = async () => {
    return prisma.productWishlist.findMany({
        include: {
            product: true,
            user: true
        }
    })
}
const createProductWishlist = async (data) => {
    return prisma.productWishlist.create({data})
}

const searchProductByName = async (name) => {
    return prisma.product.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
}

module.exports = {
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct,
    getProductById,
    getProductWishlist,
    getProductWishlistById,
    createProductWishlist,
    searchProductByName
    ,
    restoreProduct,
    forceDeleteProduct
}