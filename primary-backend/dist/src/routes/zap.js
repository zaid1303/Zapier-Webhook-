"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("./middleware");
const types_1 = require("../types");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.post('/', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.id;
    const body = req.body;
    const parsedData = types_1.ZapCreateSchema.safeParse(body);
    if (!parsedData.success) {
        res.status(411).json({
            message: "incorrect inputs"
        });
    }
    else {
        try {
            const zapId = yield db_1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
                const zap = yield db_1.prismaClient.zap.create({
                    data: {
                        userId: parseInt(id),
                        triggerId: "",
                        actions: {
                            create: parsedData.data.actions.map((x, index) => ({
                                actionId: x.availableActionId,
                                sortingOrder: index,
                                metadata: x.actionMetadata
                            }))
                        }
                    }
                });
                const trigger = yield tx.trigger.create({
                    data: {
                        triggerId: parsedData.data.availableTriggerId,
                        zapId: zap.id
                    }
                });
                yield db_1.prismaClient.zap.update({
                    where: {
                        id: zap.id
                    },
                    data: {
                        triggerId: trigger.id
                    }
                });
                return zap.id;
            }));
            res.json({
                zapId
            });
        }
        catch (e) {
            console.log(e);
        }
    }
}));
router.get('/', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.id;
    const zaps = yield db_1.prismaClient.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    res.json({
        zaps
    });
}));
router.get('/:zapId', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqid = req.params.zapId;
    // @ts-ignore
    const id = req.id;
    const zaps = yield db_1.prismaClient.zap.findFirst({
        where: {
            id: reqid,
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    res.json({
        zaps
    });
}));
exports.zapRouter = router;
