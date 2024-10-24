import { Router } from "express";
import { authMiddleware } from "./middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "../config";

const router=Router();
router.post('/signup',async (req,res)=>{
    const body=req.body;
    const parseData=SignupSchema.safeParse(body);

    if(!parseData.success){
        res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    else{
        try{
            
            const userExists=await prismaClient.user.findFirst({
                where:{
                    email:parseData.data?.username
                }
            });
            if(userExists){
                res.status(403).json({
                    message:"user already exists"
                })
            }
            else{

                const user=await prismaClient.user.create({
                    data:{
                        email:parseData.data?.username||"",
                        password:parseData.data?.password||"",
                        name:parseData.data?.name||""
                    }
                })
                const token=jwt.sign({
                    id:user?.id
                },JWT_PASSWORD)
                
                res.json({
                    token:token,
                    message:"please verify your accpunt by checking your email "
                })
            }
        }
        catch(e){
            console.log(e)
        }
    }
})

router.post("/signin",async (req,res)=>{
    const body=req.body;
    const parseData=SigninSchema.safeParse(body);

    if(!parseData.success){
        res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    else{

        try{
            const user=await prismaClient.user.findFirst({
                where:{
                    email:parseData.data?.username,
                    password:parseData.data?.password
                }
            })
            
            if(!user){
                res.status(403).json({
                    message:"Sorry credential are wrongs."
                })
            }
            else{

                const token=jwt.sign({
                    id:user?.id
                },JWT_PASSWORD)
                res.json({
                    token:token
                })
            }
        }
        catch(e){
            console.log(e)
        }
    }
        
})

router.get('/',authMiddleware,async (req,res)=>{
    // @ts-ignore
    const id=req.id;
    const user=await prismaClient.user.findFirst({
        where:{
            id
        },
        select:{
            name:true,
            email:true
        }
    })
    res.json({
        user
    })
})

export const userRouter=router;