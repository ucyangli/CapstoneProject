import fs from 'fs';

export default function copyDir(src, dist, callback) {
    fs.access(dist, function(err){
      if(err){
        // 目录不存在时创建目录 create dir when it is not there
        fs.mkdirSync(dist);
      }
      _copy(null, src, dist);
    });
  
    function _copy(err, src, dist) {
      if(err){
        callback(err);
      } else {
        fs.readdir(src, function(err, paths) {
          if(err){
            callback(err)
          } else {
            paths.forEach(function(path) {
              var _src = src + '/' +path;
              var _dist = dist + '/' +path;
              fs.stat(_src, function(err, stat) {
                if(err){
                  callback(err);
                } else {
                  // is file or dir
                  if(stat.isFile()) {
                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                  } else if(stat.isDirectory()) {
                    // copy file
                    copyDir(_src, _dist, callback)
                  }
                }
              })
            })
          }
        })
      }
    }
  }