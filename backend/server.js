import express from 'express';
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware';
import mongoose from 'mongoose';




import Project from './models/projectModel';
import Member from './models/memberModel';
import Partner from './models/partnerModel';
import Resource from './models/resourceModel';

import multer from 'multer';
import fs from 'fs';
import copyDir from './utils/copyFile';

import projectRoutes from './routes/projectRoutes'



dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


const dbUrl = "mongodb://localhost:27017/lab";
mongoose.connect(dbUrl);




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

// import file when first time use the app

app.get("/api/import", async (req, res) => {

   Project.count({}, async (err,result)=>{
       if(result !==0) {
           res.send({message: 'data existed already, please click it only first time running the app'});
       }else {
            const lab = [Project,Member,Partner,Resource];
            lab.map(async (e) => {

                //set targeted json file url
                let url = '../webportal/src/data/'+ e.prototype.collection.modelName +'.json';

                let dt = require(url);

                 await e.insertMany(dt, function(err,result) {
                    if (err) {
                        // handle error
                    } else {
                        // handle success
                    }
                    });

            })
         await res.send({message: 'successfully imported data'});
       }
   })
  


})

// export file
app.get("/api/export", async (req, res) => {

    const lab = [Project,Member,Partner,Resource];
    
    //export file from database to json file
   await  lab.map((e) => {

        //set targeted json file url
        let url = '../webportal/src/data/'+ e.prototype.collection.modelName +'.json'
       

        e.find({}, (err,docs) => {
            if (err) return;
            try {
                fs.stat(url, async function(err, stat){
                    if(stat&&stat.isFile()) {
                       await  fs.unlinkSync(url);
                         fs.writeFileSync(url, JSON.stringify(docs));                      
                    } else {
                        fs.writeFileSync(url, JSON.stringify(docs));
                    }
                });
            } catch (err) {
                console.log('Error writing to file', err)
            }
        } )
    });

    await copyDir('../front-end/public/uploads', '../webportal/public/uploads', function(err){
        if(err){
          console.log(err);
        }
      });

    await res.send('successful')

})



//project

app.use('/api/project', projectRoutes);

app.get("/api/project/:id", projectRoutes);

app.post("/api/project", projectRoutes)

app.put("/api/project/:id", projectRoutes)

app.delete("/api/project/:id", projectRoutes)


//member

app.get("/api/member", (req, res) => {
    Member.find({}, (err, docs) => {
        if (err) return;
        res.send(docs);
    });
});


app.get("/api/member/:id", (req, res) => {
    Member.findOne({
        _id: req.params.id
    }, (err, docs) => {
        if (err) return;
        res.json(docs);
    });
});


app.post("/api/member", upload.single('img'), (req, res) => {
    let newMember = new Member(req.body);
    if (req.file) {
        newMember.img = './uploads/' + req.file.filename;
    }
    newMember.save((err, result) => {
        if (err) {
            console.log(err);
            return res.status(400)
                .send({
                    messgae: err
                })
        }
    })
})

app.put("/api/member/:id", upload.single('img'), async (req, res) => {
    let updatedMember = new Member(req.body);

    if (req.file) {
        updatedMember.img = './uploads/' + req.file.filename;
        await Member.findOne({
            _id: req.params.id
        }, (err, member) => {
            if (err) return;
            // delete the cover image in the file system
            const url = '../front-end/public/uploads' + member.img;
            if (!member.img.includes('face')) {
                fs.stat(url, function(err, stat){
                    if(stat&&stat.isFile()) {
                        fs.unlinkSync(url)
                    } else {
                    console.log('no such img');
                    }
                });
            }
        });
        Member.updateOne({
                _id: req.params.id
            }, {
                $set: {
                    email: updatedMember.email,
                    name: updatedMember.name,
                    role: updatedMember.role,
                    img: updatedMember.img,
                    isCurrent: updatedMember.isCurrent
                }
            }).then((obj) => {})
            .catch((err) => {
                console.log('Error: ' + err);
            })
    } else {
        Member.updateOne({
                _id: req.params.id
            }, {
                $set: {
                    email: updatedMember.email,
                    name: updatedMember.name,
                    role: updatedMember.role,
                    isCurrent: updatedMember.isCurrent
                }
            }).then((obj) => {})
            .catch((err) => {
                console.log('Error: ' + err);
            })
    }
})

app.delete("/api/member/:id", async (req, res) => {

    //delet the pic in the file system
     Member.findOne({
        _id: req.params.id
    }, (err, member) => {
        if (err) return;
        // delete the cover image
        const url = '../front-end/public/uploads' + member.img;
        if (!member.img.includes('face')) {
            fs.stat(url, function(err, stat){
                if(stat&&stat.isFile()) {
                    fs.unlinkSync(url)
                } else {
                console.log('no such img');
                }
            });
        }
    });

    //delete this memeber in database 
    Member.deleteOne({
            _id: req.params.id
        }).then((obj) => {})
        .catch((err) => {
            console.log('Error: ' + err);
        })
})

//partner

app.get("/api/partner", (req, res) => {
    Partner.find({}, (err, docs) => {
        if (err) return;
        res.send(docs);
    });
});

app.get("/api/partner/:id", (req, res) => {
    Partner.findOne({
        _id: req.params.id
    }, (err, docs) => {
        if (err) return;
        res.json(docs);
    });
});

app.post("/api/partner", upload.single('pic'), (req, res) => {
    let newPartner = new Partner(req.body);
    if (req.file) {
        newPartner.pic = './uploads/' + req.file.filename;
    }
    newPartner.save((err, result) => {
        if (err) {
            console.log(err);
            return res.status(400)
                .send({
                    messgae: err
                })
        }
    })
})

app.put("/api/partner/:id", upload.single('pic'),  (req, res) => {
    const updatedPartner = new Partner(req.body);
    if (req.file) {
        updatedPartner.pic = './uploads/' + req.file.filename;

        // delete previous pic in the file system
         Partner.findOne({
            _id: req.params.id
        }, (err, partner) => {
            if (err) return;
            // delete the cover image
            const url = '../front-end/public/uploads' + partner.pic;
            if (!partner.pic.includes('robot')) {
                fs.stat(url, function(err, stat){
                    if(stat&&stat.isFile()) {
                        fs.unlinkSync(url)
                    } else {
                    console.log('no such img');
                    }
                });
            }
        });

        Partner.updateOne({
                _id: req.params.id
            }, {
                $set: {
                    name: updatedPartner.name,
                    brief: updatedPartner.brief,
                    pic: updatedPartner.pic
                }
            }).then((obj) => {})
            .catch((err) => {
                console.log('Error: ' + err);
            })
    } else {
        Partner.updateOne({
                _id: req.params.id
            }, {
                $set: {
                    name: updatedPartner.name,
                    brief: updatedPartner.brief,
                }
            }).then((obj) => {})
            .catch((err) => {
                console.log('Error: ' + err);
            })
    }

})

app.delete("/api/partner/:id", async (req, res) => {


    //delet the pic in the file system
     Partner.findOne({
        _id: req.params.id
    }, (err, partner) => {
        if (err) return;
        // delete the cover image
        const url = '../front-end/public/uploads' + partner.pic;
        if (!partner.pic.includes('robot')) {
            fs.stat(url, function(err, stat){
                if(stat&&stat.isFile()) {
                    fs.unlinkSync(url)
                } else {
                console.log('no such img');
                }
            });
        }
    });

    //delete this partner in database
    Partner.deleteOne({
            _id: req.params.id
        }).then((obj) => {})
        .catch((err) => {
            console.log('Error: ' + err);
        });


})

//resource

app.get("/api/resource", (req, res) => {
    Resource.find({}, (err, docs) => {
        if (err) return;
        res.send(docs);
    });
});

app.get("/api/resource/:id", (req, res) => {
    Resource.findOne({
        _id: req.params.id
    }, (err, docs) => {
        if (err) return;
        res.json(docs);
    });
});

app.post("/api/resource", upload.single('rsimg'), (req, res) => {
    let newResource = new Resource(req.body);
    if (req.file) {
        newResource.rsimg = './uploads/' + req.file.filename;
    }
    newResource.save((err, result) => {
        if (err) {
            console.log(err);
            return res.status(400)
                .send({
                    messgae: err
                })
        }
    })
})

app.put("/api/resource/:id", upload.single('rsimg'), async (req, res) => {
    const updatedResource = new Resource(req.body);
    if (req.file) {
        updatedResource.rsimg = './uploads/' + req.file.filename;

        // delete previous pic in the file system
         Resource.findOne({
            _id: req.params.id
        }, (err, resource) => {
            
            // delete the cover image
            const url = '../front-end/public/uploads' + resource.rsimg;
            if (!resource.rsimg.includes('robot')) {
                fs.stat(url, function(err, stat){
                    if(stat&&stat.isFile()) {
                        fs.unlinkSync(url)
                    } else {
                    console.log('no such img');
                    }
                });
            }
        });

        Resource.updateOne({
                _id: req.params.id
            }, {
                $set: {
                    name: updatedResource.name,
                    brief: updatedResource.brief,
                    rsimg: updatedResource.rsimg,
                    detail:updatedResource.detail
                }
            }).then((obj) => {})
            .catch((err) => {
                console.log('Error: ' + err);
            })
    } else {
        Resource.updateOne({
                _id: req.params.id
            }, {
                $set: {
                    name: updatedResource.name,
                    brief: updatedResource.brief,
                    detail:updatedResource.detail
                }
            }).then((obj) => {})
            .catch((err) => {
                console.log('Error: ' + err);
            })
    }




})

app.delete("/api/resource/:id", async (req, res) => {

    //delet the pic in the file system
     Resource.findOne({
        _id: req.params.id
    }, (err, resource) => {
        if (err) return;
        // delete the cover image
        const url = '../front-end/public/uploads' + resource.rsimg;
        if (!resource.rsimg.includes('robot')) {
            fs.stat(url, function(err, stat){
                if(stat&&stat.isFile()) {
                    fs.unlinkSync(url)
                } else {
                console.log('no such img');
                }
            });
        }
    });

    //delete this partner in database
    Resource.deleteOne({
            _id: req.params.id
        }).then((obj) => {})
        .catch((err) => {
            console.log('Error: ' + err);
        });


})




const PORT = process.env.PORT || 8080


app.use(notFound);
app.use(errorHandler);

app.listen(8080, () => console.log(`server is running on localhost: ${PORT}`)); 