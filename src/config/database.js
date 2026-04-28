const mongoose = require('mongoose');


const connectDB = async () => {
mongoose.connect(
    "mongodb+srv://vishalsinghpanghal_db_user:vishalsinghpanghal@namastaynode.3apklvh.mongodb.net/namastaynode_DB"
)
};
connectDB().then(()=>{
    console.log("Database connected Succesfully ✅")
})
.catch((err)=>{
    console.log("Database connection failed ❌",err)
})

module.exports = connectDB;