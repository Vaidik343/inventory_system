const {Settings} = require("../models/index")

const createSetting = async (req,res) => {
    const {companyName, address, invoice_prefix, tax_rates, currency} = req.body;
    try {
        const setting = await Settings.create({companyName, address, invoice_prefix, tax_rates, currency})
        console.log("🚀 ~ createSetting ~ setting:", setting);

        res.status(201).json(setting)
    } catch (error) {
        console.log("🚀 ~ createSetting ~ error:", error)
        res.status(500).json({message:"Server error!"})
        
    }
}

const getSetting = async (req,res) => {
    try {
        const setting = await Settings.find()
        console.log("🚀 ~ getSetting ~ setting:", setting)
        res.status(200).json(setting)
    } catch (error) {
        console.log("🚀 ~ getSetting ~ error:", error)
         res.status(500).json({message:"Server error!"})
    }

}

const updateSetting = async (req, res) => {
    const settingId = req.params.id;
   const {companyName, address, invoice_prefix, tax_rates, currency} = req.body;
    try {
        const setting = await Settings.findByIdAndUpdate(
            settingId,
            {companyName, address, invoice_prefix, tax_rates, currency},
            { new:true});
        console.log("🚀 ~ updateSetting ~ setting:", setting)

        if(!setting)
        {
            return res.status(404).json({message:"Not found!"});
        }

        res.status(200).json({message:"Update successful!"});
        
    } catch (error) {
        console.log("🚀 ~ updateSetting ~ error:", error)
        res.status(500).json({message:"Server error!"})
    }

}
module.exports.settingController={createSetting , updateSetting , getSetting}