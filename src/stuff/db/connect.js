import mongoose from 'mongoose';
const uri = process.env.DB_URL || 'mongodb://localhost:27017/myapp';

function startDB() {
  mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));
}

export default startDB;
