const mongoose=require("mongoose");
const conn= process.env.MONGO_CON;
const connection = mongoose.connect(conn)
.then(() => {
  console.log('DB Connected');
})
.catch((err) => {
  console.log('Failed to connect DB', err);
});
module.exports=connection;