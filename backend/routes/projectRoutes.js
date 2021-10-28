import express from 'express';
import multer from 'multer';
import Project from '../models/projectModel';
import Member from '../models/memberModel';
import Resource from '../models/resourceModel';
import Partner from '../models/partnerModel';
import asyncHandler from 'express-async-handler';

import fs from 'fs';
import copyDir from '../utils/copyFile';

const projectRoutes = express.Router();


//upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../front-end/public/uploads')
    },
    filename: (req, file, cb) => {

        cb(null, file.fieldname + Date.now())
    }
});

const upload = multer({
    storage: storage
});


//get all products
projectRoutes.get("/", asyncHandler(async (req, res) => {
    Project.find({}, (err, docs) => {
        if (err) {
            res.status(404).json({
                messgae: 'oh, error'
            });
            return;
        };
        res.json(docs);
    });
}))

//get product by id
projectRoutes.get("/:id", asyncHandler(async (req, res) => {
    const product = await Project.findOne({
        _id: req.params.id
    })
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('cannot find the product')
    }
}))

// create a new project in data base and change according database
projectRoutes.post("/", upload.single('cover'), asyncHandler(async (req, res) => {

    // create a new project in data base 
    const newProject = new Project(req.body);

    if (req.file) {
        newProject.cover = './uploads/' + req.file.filename;
    }
    await newProject.save((err, result) => {
        if (err) {
            console.log(err);
            return res.status(400)
                .send({
                    messgae: err
                })
        }
    })

    //do the change to the according team leader & member 
    await Member.updateOne({
            _id: newProject.teamleader
        }, {
            $set: {
                leadpjs: newProject._id
            }
        }).then((obj) => {})
        .catch((err) => {
            console.log('Error: ' + err);
        });

    await newProject.member.map((id) => {
        Member.updateOne({
                _id: id
            }, {
                $push: {
                    pjs: newProject._id
                }
            }).then((obj) => {})
            .catch((err) => {
                console.log('Error: ' + err);
            })
    })

    //do the change to the according partners
    await newProject.partner.map((id) => {
        Partner.updateOne({
                _id: id
            }, {
                $push: {
                    project: newProject._id
                }
            }).then((obj) => {})
            .catch((err) => {
                console.log('Error: ' + err);
            })
    })

    //do the change to the according partners
    await newProject.resource.map((id) => {
        Resource.updateOne({
                _id: id
            }, {
                $push: {
                    project: newProject._id
                }
            }).then((obj) => {})
            .catch((err) => {
                console.log('Error: ' + err);
            })
    })

    res.json({
        message: 'create project successfully'
    })

}))

//change a exsiting project 
projectRoutes.put("/:id", upload.single('cover'), asyncHandler(async (req, res) => {

    const updatedProject = new Project(req.body);

    const oldProject = await Project.findById(req.params.id);

    if (oldProject) {
        //change the team leader
        if (oldProject.teamleader !== updatedProject.teamleader) {
            //pull project from old leader
            Member.updateOne({
                    _id: oldProject.teamleader
                }, {
                    $pull: {
                        leadpjs: oldProject._id
                    }
                }).then((obj) => {})
                .catch((err) => {
                    console.log('Error: ' + err);
                })
            //push project to new leadr
            Member.updateOne({
                    _id: updatedProject.teamleader
                }, {
                    $set: {
                        leadpjs: oldProject._id
                    }
                }).then((obj) => {})
                .catch((err) => {
                    console.log('Error: ' + err);
                })
        }

        // change the team members
        if (oldProject.member !== updatedProject.member) {
            // when previouse member of the project is empty, add project to new members
            if (oldProject.member === '') {
                updatedProject.member.map((id) => {
                    Member.updateOne({
                            _id: id
                        }, {
                            $push: {
                                pjs: oldProject._id
                            }
                        }).then((obj) => {})
                        .catch((err) => {
                            console.log('Error: ' + err);
                        })
                })
            } else {
                //pull the project from the old member 
                oldProject.member.map((id) => {
                    if (!updatedProject.member.includes(id)) {
                        Member.updateOne({
                                _id: id
                            }, {
                                $pull: {
                                    pjs: oldProject._id
                                }
                            }).then((obj) => {})
                            .catch((err) => {
                                console.log('Error: ' + err);
                            })
                    }
                })
                //push the project to the new member
                updatedProject.member.map((id) => {
                    if (!oldProject.member.includes(id)) {
                        Member.updateOne({
                                _id: id
                            }, {
                                $push: {
                                    pjs: oldProject._id
                                }
                            }).then((obj) => {})
                            .catch((err) => {
                                console.log('Error: ' + err);
                            })
                    }
                })

            }

        }

        // change the partner
        if (oldProject.partner !== updatedProject.partner) {
            // when previouse partner of the project is empty, add project to new partner
            if (oldProject.partner === '') {
                updatedProject.partner.map((id) => {
                    Partner.updateOne({
                            _id: id
                        }, {
                            $push: {
                                project: oldProject._id
                            }
                        }).then((obj) => {})
                        .catch((err) => {
                            console.log('Error: ' + err);
                        })
                })
            } else {
                //pull the project from the old partner 
                oldProject.partner.map((id) => {
                    if (!updatedProject.partner.includes(id)) {
                        Partner.updateOne({
                                _id: id
                            }, {
                                $pull: {
                                    project: oldProject._id
                                }
                            }).then((obj) => {})
                            .catch((err) => {
                                console.log('Error: ' + err);
                            })
                    }
                })
                //push the project to the new partner
                updatedProject.partner.map((id) => {
                    if (!oldProject.partner.includes(id)) {
                        Partner.updateOne({
                                _id: id
                            }, {
                                $push: {
                                    project: oldProject._id
                                }
                            }).then((obj) => {})
                            .catch((err) => {
                                console.log('Error: ' + err);
                            })
                    }
                })

            }

        }

        // change the resource
        if (oldProject.resource !== updatedProject.resource) {
            // when previouse resource of the project is empty, add project to new resource
            if (oldProject.resource === '') {
                updatedProject.resource.map((id) => {
                    Resource.updateOne({
                            _id: id
                        }, {
                            $push: {
                                project: oldProject._id
                            }
                        }).then((obj) => {})
                        .catch((err) => {
                            console.log('Error: ' + err);
                        })
                })
            } else {
                //pull the project from the old resource 
                oldProject.resource.map((id) => {
                    if (!updatedProject.resource.includes(id)) {
                        Resource.updateOne({
                                _id: id
                            }, {
                                $pull: {
                                    project: oldProject._id
                                }
                            }).then((obj) => {})
                            .catch((err) => {
                                console.log('Error: ' + err);
                            })
                    }
                })
                //push the project to the new resource
                updatedProject.resource.map((id) => {
                    if (!oldProject.resource.includes(id)) {
                        Resource.updateOne({
                                _id: id
                            }, {
                                $push: {
                                    project: oldProject._id
                                }
                            }).then((obj) => {})
                            .catch((err) => {
                                console.log('Error: ' + err);
                            })
                    }
                })


            }

        }

        //update this project
        if (req.file) { // if there is a new cover
            updatedProject.cover = './uploads/' + req.file.filename;
            const url = '../front-end/public/uploads' + oldProject.cover;
            //delete the old cover 
            if (!oldProject.cover.includes('robot')) {
                fs.stat(url, function (err, stat) {
                    if (stat && stat.isFile()) {
                        fs.unlinkSync(url)
                    } else {
                        console.log('文件不存在或不是标准文件');
                    }
                });
            };
            await Project.updateOne({
                    _id: req.params.id
                }, {
                    $set: {
                        title: updatedProject.title,
                        brief:updatedProject.brief,
                        detail: updatedProject.detail,
                        status: updatedProject.status,
                        teamleader: updatedProject.teamleader,
                        member: updatedProject.member,
                        supervisor: updatedProject.supervisor,
                        sponsor: updatedProject.sponsor,
                        cover: updatedProject.cover,
                        isFeatured: updatedProject.isFeatured,
                        partner: updatedProject.partner,
                        resource: updatedProject.resource
                    }
                }).then((obj) => {})
                .catch((err) => {
                    console.log('Error: ' + err);
                })
        } else { //if ther is no new cover
            await Project.updateOne({
                    _id: req.params.id
                }, {
                    $set: {
                        title: updatedProject.title,
                        brief:updatedProject.brief,
                        detail: updatedProject.detail,
                        status: updatedProject.status,
                        teamleader: updatedProject.teamleader,
                        supervisor: updatedProject.supervisor,
                        member: updatedProject.member,
                        sponsor: updatedProject.sponsor,
                        isFeatured: updatedProject.isFeatured,
                        partner: updatedProject.partner,
                        resource: updatedProject.resource
                    }
                }).then((obj) => {})
                .catch((err) => {
                    console.log('Error: ' + err);
                })

        }

       

        res.json({message:'modify project successfully'})

    } else {
        res.status(404)
        throw new Error('cannot find the product')
    }



}))

projectRoutes.delete("/:id", asyncHandler(async (req, res) => {



    const oldProject = await Project.findOne({
        _id: req.params.id
    })

    if (oldProject) {
        const url = '../front-end/public/uploads' + oldProject.cover;
        if (!oldProject.cover.includes('robot')) {
            fs.stat(url, function (err, stat) {
                if (stat && stat.isFile()) {
                    fs.unlinkSync(url)
                } else {
                    console.log('no such cover');
                }
            });
        }
        await Member.updateOne({
            leadpjs: req.params.id
        }, {
            $pull: {
                leadpjs: req.params.id
            }
        })
        await Member.updateMany({
            pjs: req.params.id
        }, {
            $pull: {
                pjs: req.params.id
            }
        })
        await oldProject.remove();

        res.json({messgae: 'project delete successfully'})


    } else {
        res.status(404)
        throw new Error('cannot find the product')
    }


}))

export default projectRoutes;