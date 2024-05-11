import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://aditya0102be21:qNOBgLRbP14YZepz@cluster0.gpthpcp.mongodb.net/food-delivery?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("DB connected"));
}