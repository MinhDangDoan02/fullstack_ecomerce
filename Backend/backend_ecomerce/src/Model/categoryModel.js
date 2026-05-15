const {PrismaClient} = require('../generated/client')
const prisma = new PrismaClient()


const createCategory = async (data) => {
    return category = await prisma.category.create({data})
}
const getCategory = async () => {
    return category = await prisma.category.findMany()
}
const updateCategory = async (id, data) => {
    return await prisma.category.update({
        where: { id },
        data
    })
}
const deleteCategory = async (id) => {
    return await prisma.category.delete({
        where: { id }
    })
}
module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}
