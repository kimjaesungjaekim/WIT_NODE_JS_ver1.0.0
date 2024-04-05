import prisma from "../../prisma/prisma-client.js";
import HttpException from "../../models/http-exception.model.js";

export const createComments = async function(input){

    const COMM_CONTENT = input.commContent;
    const BO_NO = input.boNo;
    const COMM_WRITE_DAY = new Date();
    const COMM_HEART = 0;      
    const COMM_USE = "Y";        
    const COMM_SEC = 0;

    if (!COMM_CONTENT) {
        throw new HttpException(422, { errors: { COMM_CONTENT: ["can't be blank"] } });
    }
    
    const comments = await prisma.cOMMENTS.create({
        data: {
            COMM_CONTENT,
            COMM_WRITE_DAY,
            COMM_HEART,
            COMM_USE,
            COMM_SEC,
            BO_NO,
        }
    })
    return comments;
}

export const modifyComments = async function(input){
    const COMM_CONTENT = input.commContent;
    const COMM_ID = input.commId;
    
    const comments = await prisma.cOMMENTS.updateMany({
        where:{
            COMM_ID : {
                equals: COMM_ID
            }
        },
        data:{
            COMM_CONTENT,
        }
    });

    return comments;
}

export const RemoveComments = async function(input){

    const commId = input.commId;
    const COMM_USE = "N";
    const res = await prisma.cOMMENTS.update({
        where:{
            COMM_ID : commId,
        },
        data:{
            COMM_USE : COMM_USE,
        }
    });

    return res;
}

export const SelectOneComments = async function(input){

    const COMM_ID = input.commId;

    const comments = await prisma.cOMMENTS.findUnique({
        where:{
            COMM_ID : COMM_ID,
        }
    });

    return comments;
}

export const SelectListComments = async function(input){

    const BO_NO = input.boNo;
    
    const commnetsList = await prisma.cOMMENTS.findMany({
        where:{
            BO_NO :{
                equals : BO_NO,
            }
        }
    });
    return commnetsList;
}