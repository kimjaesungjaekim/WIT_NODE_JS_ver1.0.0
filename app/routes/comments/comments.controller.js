import { Router } from "express";

import {
    createComments,
    modifyComments,
    RemoveComments,
    SelectOneComments,
    SelectListComments
} from "./comments.service.js";

const router = Router();

/*
댓글 등록
*/
router.post("/comments/create", async(req,res,next)=>{
    try {
        const comments = await createComments({...req.body, demo:false});
        res.status(201).json(comments);

    } catch (error) {
        next(error);
    }
});

/*
댓글 수정
*/
router.post("/comments/modify", async(req,res,next)=>{
    try {
        const comments = await modifyComments({...req.body, demo:false});
        res.status(201).json(comments);

    } catch (error) {
        next(error);
    }
});

/*
댓글 삭제
*/
router.post("/comments/remove", async(req,res,next)=>{
    try {
        const comments = await RemoveComments({...req.body, demo:false});
        res.status(201).json(comments);

    } catch (error) {
        next(error);
    }
});

/*
댓글 상세조회
*/
router.post("/comments/selectOne", async(req,res,next)=>{
    try {
        const comments = await SelectOneComments({...req.body, demo:false});
        res.status(201).json(comments);

    } catch (error) {
        next(error);
    }
});


/*
댓글 목록
*/
router.post("/comments/selectList", async(req,res,next)=>{
    try {
        const comments = await SelectListComments({...req.body, demo:false});
        res.status(201).json(comments);

    } catch (error) {
        next(error);
    }
});

export default router;