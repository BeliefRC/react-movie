const Movie = require('../models/Movie');

exports.detail=(req, res)=>{
    let id=req.query.movieId;
    Movie.findById(id,(err,movie)=>{
      if (err) {
          console.log(err);
          let data = {
              success: false,
              msg: err.toString(),
              backData: null
          };
          res.end(JSON.stringify(data));
      } else {
          let data = {
              success: true,
              msg: '查看电影详情成功',
              backData: movie
          };
          res.end(JSON.stringify(data));
      }
    })
};

exports.movieList = (req, res) => {
    Movie.fetch((err, movies) => {
        if (err) {
            console.log(err);
            let data = {
                success: false,
                msg: err.toString(),
                backData: null
            };
            res.end(JSON.stringify(data));
        } else {
            let data = {
                success: true,
                msg: '查询电影列表成功',
                backData: movies
            };
            res.end(JSON.stringify(data));
        }
    })
};


exports.saveMovie = (req, res) => {
    let _movie = req.body;
    Movie.find({title: _movie.title}, (err, movie) => {
        if (err) {
            console.log(err);
            let data = {
                success: false,
                msg: err.toString(),
                backData: null
            };
            res.end(JSON.stringify(data))
        } else {
            //已保存过当前电影
            if (movie.length) {
                let data = {
                    success: false,
                    msg: `电影《${_movie.title}》已存在`,
                    backData: null
                };
                res.end(JSON.stringify(data))
            } else {
                movie = new Movie (_movie);
                movie.save(err => {
                    if (err) {
                        console.log(err);
                        let data = {
                            success: false,
                            msg: err.toString(),
                            backData: null
                        };
                        res.end(JSON.stringify(data))
                    } else {
                        let data = {
                            success: true,
                            msg: `新增电影《${_movie.title}》成功`,
                            backData: null
                        };
                        res.end(JSON.stringify(data))
                    }
                })
            }
        }
    })
};

exports.updateMovie=(req,res)=>{
    let _movie=req.body;
    if (_movie._id){
         Movie.findById(_movie._id,(err,movie)=>{
             if (err) {
                 console.log(err);
                 let data = {
                     success: false,
                     msg: err.toString(),
                     backData: null
                 };
                 res.end(JSON.stringify(data))
             } else {
                 Object.assign(movie,_movie);
                 movie.save((err,movie)=>{
                    if (err) {
                        console.log(err);
                        let data = {
                            success: false,
                            msg: err.toString(),
                            backData: null
                        };
                        res.end(JSON.stringify(data))
                    } else {
                        let data = {
                            success: true,
                            msg: `更新电影《${_movie.title}》成功`,
                            backData: null
                        };
                        res.end(JSON.stringify(data))
                    }
                })
             }
         })
    }else {
        let data = {
            success: false,
            msg: 'id不存在，请勿随意修改页面url',
            backData: null
        };
        res.end(JSON.stringify(data))

    }};

//删除电影
exports.deleteMovie=(req,res)=>{
    let _id=req.query._id;
    if (_id){
         Movie.remove({_id},(err,movie)=>{
             if (err) {
                 console.log(err);
                 let data = {
                     success: false,
                     msg: err.toString(),
                     backData: null
                 };
                 res.end(JSON.stringify(data))
             } else {
                 let data = {
                     success: true,
                     msg: `删除电影《${movie.title}》成功`,
                     backData: null
                 };
                 res.end(JSON.stringify(data))
             }
         })
    }
};