import { error } from 'console';
import mongoose from 'mongoose';

export async function connect(){
    try {
        // '!' used to give type safety that string will come for sure. 
        mongoose.connect(process.env.MONOGO_URL!)
        const connection = mongoose.connection

        connection.on('connected', () =>{
            console.log('MongoDB Connected');
        })

        connection.on('error', (err) =>{
            console.log('MongoDB Connection Error, please make sure DB is up&running. Error'+ err);
            process.exit();

        })


    } catch (error) {
        console.log('Something went wrong in connecting to DB');
        console.log(error);
    }
}