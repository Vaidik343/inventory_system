const productSchema = new mongoose({

    _id:{
        type:String,
        default: uudidv4
    },

    name:{
        type: String,
        require: true
    },
    sku:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    categoryId:{
        type: String,
        ref:"Category",
        require: true
    },
    supplierId:{
        type: String,
        ref:"Supplier",
        require: true
    },

    unit:{
        type: String,
        require: true
    },
    cost:{
        type: String,
        require: true
    },
    sell_price:{
        type: String,
        require: true
    },
    tax_rate:{
        type: String,
        require: true
    },
    stock_qty:{
        type: String,
        require: true
    },
    image:{
        type: String,
        ref: "Gallery",
       
    },
    

})