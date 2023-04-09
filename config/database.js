const mongoos= require("mongoose");

const connectDatabase=()=>{
  console.log(`${process.env.DB_URL}`)
    mongoos.connect(`mongodb+srv://maneeshmondal56:maneesh1120@cluster0.nmhiooa.mongodb.net/?retryWrites=true&w=majority`,{
        useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
};

module.exports = connectDatabase;