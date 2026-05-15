const {PrismaClient} =  require('../generated/client')
const prisma = new PrismaClient()


const createCart = async (data) => {
    return await prisma.cart.create({data})
}

const getCartByUserId = async (userId) => {
return await prisma.cart.findMany({
   where:{
      userId:userId
   },
   include:{
      product:true
   }
})
}

const deleteCartItem = async (id) => {
   return await prisma.cart.delete({
      where:{id}
   })
}
const updateCartItem = async (id, data) => {
   return await prisma.cart.update({
      where:{id},
      data
   })
}
const deleteCartByUserId = async (userId) => {
    return await prisma.cart.deleteMany({
        where: {
            userId: userId
        }
    });
};

module.exports = {
    createCart,
    getCartByUserId,
    deleteCartItem,
    updateCartItem,
    deleteCartByUserId
}