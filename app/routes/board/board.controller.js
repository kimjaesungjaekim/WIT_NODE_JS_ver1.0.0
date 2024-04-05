import { Router } from "express";
import {
    createBoard,
    retrieveBoardList,
    ModifyBoard,
    RemoveBoard,
    SelectOneBoard
} from "./board.service.js";

const router = Router();

/**
 * 게시글 쓰기
 */
router.post("/board/create", async(req, res, next) => {
    try {
        const board = await createBoard({ ...req.body, demo:false});
        res.status(201).json({board});
    } catch (error) {
        next(error);
    }
});

/**
 * 게시글 목록
 */
router.get("/board/boardList", async(req, res, next)=>{
    try {
        const boardList = await retrieveBoardList({...req.body, demo:false});
        res.status(201).json({boardList});
    } catch (error) {
        next(error);
    }
});

/**
 * 게시글 수정
 */
router.post("/board/Modify", async(req,res,next)=>{
    try {
        const res = await ModifyBoard({...req.body, demo:false});
        res.status(201).json({res});
        
    } catch (error) {
        next(error);
    }
});

/**
 * 게시글 삭제(USE -> N 으로 업데이트)
 */
router.post("/board/Remove", async(req,res,next)=>{
    try {
        const res = await RemoveBoard({...req.body, demo:false});
        res.status(201).json({res});
    } catch (error) {
        next(error);
    }
});

/**
 * 게시글 개별 조회
 */
router.post("/board/SelectOne", async(req,res,next)=>{
    try {
        const board =  await SelectOneBoard({...req.body, demo:false});
        res.status(201).json(board);
    } catch (error) {
        next(error);
    }
});

export default router;
