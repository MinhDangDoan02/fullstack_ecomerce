const { PrismaClient } = require('../generated/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

const createUser = async (data) => {
    return prisma.user.create({data})
}
const checkEmailUser = async (email) => {
    const errors = {}
    const existingEmail = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if(existingEmail){
    errors.email = 'email da ton tai'

    }
    return errors
} 
const checkLogin = async(data) => {
    const axistingUser = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    })
    if(!axistingUser){
        return false
    }
    const matchPass = await bcrypt.compare(data.password , axistingUser.password )
    if(!matchPass){
        return false
    }
    return axistingUser
}
 const getUser = async () => {
    return prisma.user.findMany()
 }
 const getUserById = async (id) => {
    return prisma.user.findUnique({
        where: {id}
    })
 }
const updateUser = async (id, data) => {
    return prisma.user.update({where:{id}, data})
}
const deleteUser = async (id) => {
    return prisma.user.delete({where:{id}})
}

const getProductByUser = async (name) => {
    return prisma.user.findMany({
        where: {name},
        include: {
            product: true
        }
    })
}


module.exports = {
    createUser,
    checkEmailUser,
    checkLogin,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    getProductByUser
}