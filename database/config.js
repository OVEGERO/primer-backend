import mongoose from "mongoose"

export const dbConnection = async() => {
  try {

    mongoose.set('strictQuery', false);
    await mongoose.connect( process.env.MONGODB_CNN );

    console.log('Base de datos online');

  } catch (err) {
    console.log(err);
    throw new Error('Error a la hora de inicializar la base de datos');
  }
};