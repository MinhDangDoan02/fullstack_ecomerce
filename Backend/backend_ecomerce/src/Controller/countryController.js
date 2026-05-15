const countryModel = require('../Model/countryModel')



const createCountry = async (req, res) => {
    const data = req.body
    const country = await countryModel.createCountry(data)
    res.json(country)
}
const updateCountry = async (req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body
    const country = await countryModel.updateCountry(id, data)
    res.json(country)
}

const deleteCountry = async (req, res) => {
    const id = parseInt(req.params.id)
    await countryModel.deleteCountry(id)
    res.json({message: ' da xoa thanh cong'})
}

const getCountry = async (req, res) => {
    const country = await countryModel.getCountry() 
    res.json(country)
}
module.exports = {
    createCountry,
    updateCountry,
    deleteCountry,
    getCountry


}