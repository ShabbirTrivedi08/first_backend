import userData from '../model/user.js'
import bcrypt from 'bcrypt'
import authmiddleware from '../utils/authmiddleware.js'
import generateToken from '../utils/jwtutils.js'
import cloudinary, { Proxy_agent } from '../config/cloudinary.js'


const uploadTocloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "A_56", agent: Proxy_agent },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        stream.end(buffer);
    });
};

export const addUser = async (req,res) => {
    try {

        const password = await bcrypt.hash(req.body.password,10)

        let image = ""
        if(req.file){
            const result = await uploadTocloudinary(req.file.buffer)
            image = result.secure_url
        }
       const userDataval = {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            image:image,
            password:password
       }
       const saveUSerData = await userData.create(userDataval)
        res.status(200).json({message:"user added successflly",data:saveUSerData})
    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const getUser = async (req,res) => {
    try {
        const getuserData = await userData.find()
        res.status(200).json({message:"user get successfulyy",data:getuserData})
    } catch(error) {
        res.status(500).json({errorMessage:error.message})
    }

}

export const getSingleUser = async (req,res) =>{
    try{
        const id = req.params.uid
        const getsingleUserdata = await userData.findById(id)
        res.status(200).json({message:"user get successfully",data:getsingleUserdata})

    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const deleteUSer = async (req,res) => {
    try{
        const id = req.params.uid
        const deleteuserData = await userData.findByIdAndDelete(id)
        res.status(200).json({message:"user deleted successfully",data:deleteuserData})

    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const login = async(req,res)=>{
    try{
        const uData = await userData.findOne({email:req.body.email})
        if(!uData){
            return res.status(200).json({message:"User Not Found",status:0})
        }
        const comparePassword  = await bcrypt.compare(req.body.password,uData.password)
        if(!comparePassword){
            return res.status(200).json({message:"Password not match",status:0})
        }

        const token = generateToken(uData)

        res.status(200).json({message:"Login succesfully",token:token,status:1,data:uData})
    }catch(error){
        res.status(500).json({"message":error.message})
    }
}



