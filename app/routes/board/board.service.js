import prisma from "../../prisma/prisma-client.js";
import HttpException from "../../models/http-exception.model.js";

export const createBoard = async (input) => {
    console.log("input :", input);
    const title = input.TITLE ;
    const CONTENT =input.CONTENT ;
    const user_id = input.userId;
    const WRITE_DAY = new Date();
    const UPDATE_AT = new Date();
    const HIT = 0;
    const EMAIL = input.userMail;
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
            user_id,
            HIT,
            BOARD_USE,
        }
        
    });
    return board;
};

export const retrieveBoardList = async function() {
    const boardList = await prisma.bOARD.findMany({});

    return boardList;
}

export const ModifyBoard = async function(input){

    const title = input.TITLE ;
    const CONTENT =input.CONTENT ;
    const UPDATE_AT = new Date();
    const idNum = input.idNum;

    const res = await prisma.bOARD.updateMany({
        where:{
            id : {
                equals: idNum
            }
        },
        data:{
            title,
            CONTENT,
            UPDATE_AT,
        },
    });

    if(res > 0){
        result = "게시글이 수정 되었습니다.";
    }else{
        result = "게시글 수정 실패";
    }

    return result;
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

    const result = "";

    if(res > 0){
        result = "게시글이 삭제 되었습니다.";
    }else{
        result = "게시글 삭제 실패";
    }

    return result;
}

export const SelectOneBoard = async(input)=> {
    const boNum = input.boNum;

    const bOARD = await prisma.bOARD.findUnique({
        where:{
            id : boNum,
        },
    });

    return bOARD;
}
