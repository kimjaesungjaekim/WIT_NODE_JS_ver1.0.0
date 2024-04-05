import prisma from "../../prisma/prisma-client.js";
import HttpException from "../../models/http-exception.model.js";

export const createBoard = async (input) => {
    console.log("input :", input);
    const title = input.TITLE ;
    const CONTENT =input.CONTENT ;
    const user_num = input.user_num;
    const WRITE_DAY = new Date();
    const UPDATE_AT = new Date();
    const HIT = 0;
    const BOARD_USE = "Y";

    if (!title) {
        throw new HttpException(422, { errors: { title: ["can't be blank"] } });
    }
    if (!CONTENT) {
        throw new HttpException(422, { errors: { CONTENT: ["can't be blank"] } });
    }
    const board = await prisma.bOARD.create({
        data: {
            title,
            CONTENT,
            WRITE_DAY,
            UPDATE_AT,
            HIT,
            BOARD_USE,
            user_num,
        }
        
    });
    return board;
};

export const retrieveBoardList = async function() {
    const boardList = await prisma.bOARD.findMany({
        include:{
            COMMENTS: true
        },
        orderBy:{
            id : "desc",
        }
    });

    return boardList;
}

export const ModifyBoard = async function(input){

    const title = input.TITLE ;
    const CONTENT =input.CONTENT ;
    const UPDATE_AT = new Date();
    const id = input.idNum;
    const board = await prisma.bOARD.updateMany({
        where:{
            id : {
                equals: id
            }
        },
        data:{
            title,
            CONTENT,
            UPDATE_AT,
        },
    });

    return board;
}

export const RemoveBoard = async(input)=> {
    const idNum = input.idNum;
    const boardUse = "N";
    const res = await prisma.bOARD.updateMany({
        where:{
            id:idNum,
        },
        data:{
            BOARD_USE : boardUse
        },
    });

    return res;
}

export const SelectOneBoard = async(input)=> {
    const boNum = input.boNum;

    const bOARD = await prisma.bOARD.findUnique({
        where:{
            id : boNum,
        },
        select:{
            id : true,
            COMMENTS : true,
        }
    });

    return bOARD;
}
