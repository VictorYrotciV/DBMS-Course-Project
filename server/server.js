const express=require('express')
const bodyParser =require('body-parser')
const app=express()
const mysql = require('mysql')
app.use(bodyParser.json())

//处理post请求
app.post('/',(req,res) => {
  console.log(req.body)
  res.json(req.body)
})

app.post('/show',(req,res)=>{
  console.log(req.body.name)
  const a=req.body.name
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library'
  })
  connection.connect();
  //测试用sql语句
  connection.query("select 证件号码 from 读者 where 姓名='"+a+"'",function(error,results,fields){
   
    res.json(results)
    console.log(results)
    
  })
 
  connection.end();
  
})
app.post('/addviolationinfo',(req,res)=>{
  const id=req.body.id
  const viotime=req.body.viotime
  const vioreason=req.body.vioreason
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library'
  })
  var sql = "INSERT INTO `library`.`违规记录` (`证件号码`, `违规原因`, `违规时间`) VALUES ("+id+", '"+vioreason+"', '"+viotime+"')"
  connection.connect();
  //测试用sql语句
  connection.query(sql,function(error,results,fields){
    //if(error) throw console.error;
    //if(results){
      if(error){
        res.json(error)
      }
      else{
        res.json(results)
        console.log(results)
      }
    //}

    
    
  });
 
  connection.end();
  
})

app.post('/delviolationinfo',(req,res)=>{
  const id=req.body.id
  const viotime=req.body.viotime
  const vioreason=req.body.vioreason
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library',
    multipleStatements:true
  })
  var sql = "set @res = 99;call del_vio("+id+",'"+vioreason+"','"+viotime+"',@res);select @res as newres;"
  connection.connect();
  //测试用sql语句
  connection.query(sql,function(error,results,fields){
    //if(error) throw console.error;
    //if(results){
      if(error){
        res.json(error)
      }
      else{
        res.json(results)
        console.log(results)
      }
    //}  
  });
  connection.end(); 
})


app.post('/loadallreasons',(req,res)=>{
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library'
  })
  var sql = "SELECT * FROM `违规原因表`"
  connection.connect();
  //测试用sql语句
  connection.query(sql,function(error,results,fields){
    //if(error) throw console.error;
    //if(results){
      if(error){
        res.json(error)
      }
      else{
        res.json(results)
        console.log(results)
      }
    //}

    
    
  });
 
  connection.end();
  
})
app.post('/searchid',(req,res)=>{
  const id=req.body.id
  var sql1 = "SELECT 证件号码,姓名,信用分,部门名称 FROM 读者 natural join 校内人员 where "+id+"=校内人员.证件号码 ; SELECT 证件号码,姓名,信用分,来访单位 FROM 读者 natural join 校外人员 where "+id+"=校外人员.证件号码 "
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library',
    multipleStatements:true
  })
  connection.connect();
  connection.query(sql1,function(error,results,fields){
    //if(error) throw console.error;
    if(results){
      console.log(results)
      return res.json(results)
    }
    return false;
  });
  connection.end();
  
})
app.post('/deletereader',(req,res)=>{
  const id=req.body.id
  var sql1 = "START TRANSACTION;delete from 预约记录 where 证件号码="+id+";delete from 违规记录 where 证件号码="+id+";delete from 借阅记录 where 证件号码="+id+";delete from 校内人员 where 证件号码="+id+";delete from 校外人员 where 证件号码="+id+";delete from 读者 where 证件号码="+id+";COMMIT;ROLLBACK;";
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library',
    multipleStatements:true
  })
  connection.connect();
  connection.query(sql1,function(error,results,fields){
    //if(error) throw console.error;
    if(error){
      res.json(error)
    }
    else{
      res.json(results)
      console.log(results)
    }
  });
  connection.end();
  
})
app.post('/insertinnerreader',(req,res)=>{
  const id=req.body.id
  const name=req.body.name
  const dept=req.body.dept
  var sql1 = "INSERT INTO `library`.`读者` (`证件号码`, `姓名`, `信用分`) VALUES ("+id+", '"+name+"', 100);INSERT INTO `library`.`校内人员` (`证件号码`, `部门名称`) VALUES ("+id+", '"+dept+"')"
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library',
    multipleStatements:true
  })
  connection.connect();
  connection.query(sql1,function(error,results,fields){
    //if(error) throw console.error;
    if(error){
      res.json(error)
    }
    else{
      res.json(results)
      console.log(results)
    }
  });
  connection.end();
  
})
app.post('/insertouterreader',(req,res)=>{
  const id=req.body.id
  const name=req.body.name
  const dept=req.body.dept
  var sql1 = "INSERT INTO `library`.`读者` (`证件号码`, `姓名`, `信用分`) VALUES ("+id+", '"+name+"', 100);INSERT INTO `library`.`校外人员` (`证件号码`, `来访单位`) VALUES ("+id+", '"+dept+"')"
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library',
    multipleStatements:true
  })
  connection.connect();
  connection.query(sql1,function(error,results,fields){
    //if(error) throw console.error;
    if(error){
      res.json(error)
    }
    else{
      res.json(results)
      console.log(results)
    }
  });
  connection.end();
  
})
app.post('/readersignin',(req,res)=>{
  const id=req.body.id
  const code=req.body.code
  var sql1 = "SELECT `姓名`,`证件号码` FROM `读者` WHERE `证件号码`="+id+" AND 密码='"+code+"';"
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library',
  })
  connection.connect();
  connection.query(sql1,function(error,results,fields){
    //if(error) throw console.error;
    if(error){
      res.json(error)
    }
    else{
      res.json(results)
      console.log(results)
    }
  });
  connection.end();
  
})
app.post('/managersignin',(req,res)=>{
  const id=req.body.id
  const code=req.body.code
  var sql1 = "SELECT `姓名`,`工号` FROM `图书馆管理人员` WHERE `工号`="+id+" AND 密码='"+code+"';"
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library',
  })
  connection.connect();
  connection.query(sql1,function(error,results,fields){
    //if(error) throw console.error;
    if(error){
      res.json(error)
    }
    else{
      res.json(results)
      console.log(results)
    }
  });
  connection.end();
  
})
app.post('/searchpopularbooks',(req,res)=>{
  const cls=req.body.class
  var sql1 =" "
  if(cls=="按类型"){
    console.log("按类型")
    sql1 = "SELECT class,SUM(times) as times FROM popular_books GROUP BY class ORDER BY times DESC LIMIT 0,5"
  }else if(cls=="按书"){
    console.log("按书")
    sql1 = "SELECT bookname,author,publisher,times FROM popular_books LIMIT 0,5"
  }else if(cls=="按作者"){
    console.log("按作者")
    sql1 = "SELECT author,SUM(times) as times FROM popular_books GROUP BY author ORDER BY times DESC LIMIT 0,5"
  }
 
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library',
  })
  connection.connect();
  connection.query(sql1,function(error,results,fields){
    //if(error) throw console.error;
    if(error){
      res.json(error)
    }
    else{
      res.json(results)
      console.log(results)
    }
  });
  connection.end();
  
})
app.post('/searchsinglebook',(req,res)=>{
  const name=req.body.bookname
  var sql1 = "SELECT `书名`,`作者`,`地址`,`状态` FROM `图书` WHERE `书名`='"+name+"'"
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library',
  })
  connection.connect();
  connection.query(sql1,function(error,results,fields){
    //if(error) throw console.error;
    if(error){
      res.json(error)
    }
    else{
      res.json(results)
      console.log(results)
    }
  });
  connection.end();
  
})
app.post('/addbook',(req,res)=>{
  const id=req.body.workerid
  const bookname=req.body.bookname
  const author = req.body.author
  const publisher = req.body.publisher
  const pubtime = req.body.pubtime
  const clss = req.body.clss
  const address = req.body.address
  var sql1 = "INSERT INTO `library`.`图书` (`编号`, `工号`, `书名`, `作者`, `出版商`, `时间`, `地址`, `类别`) VALUES (-1, "+id+", '"+bookname+"', '"+author+"', '"+publisher+"', '"+pubtime+"', '"+address+"', '"+clss+"')"
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library',
  
  })
  connection.connect();
  connection.query(sql1,function(error,results,fields){
    //if(error) throw console.error;
    if(error){
      res.json(error)
    }
    else{
      res.json(results)
      console.log(results)
    }
  });
  connection.end();
  
})
app.post('/searchuserinfo',(req,res)=>{
  console.log(req.body.userid)
  console.log(req.body.username)
  const id = req.body.userid
  var sql1 = "SELECT `信用分` AS score FROM `读者` WHERE `证件号码` = "+id+"; SELECT COUNT(*) AS countborrow FROM `借阅记录` WHERE `证件号码` = "+id+"; SELECT COUNT(*) AS countyuyue FROM `预约记录` WHERE `证件号码` = "+id+";  "
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library',
    multipleStatements:true
  })
  connection.connect();
  connection.query(sql1,function(error,results,fields){
    //if(error) throw console.error;
    if(error){
      res.json(error)
    }
    else{
      res.json(results)
      console.log(results)
    }
  });
  connection.end();
  
})
app.post('/borrowbooks',(req,res)=>{
  const userid = req.body.userid
  const bookid = req.body.bookid
  const borrowtime = req.body.borrowtime 
  var sql1 = "INSERT INTO `library`.`借阅记录` (`编号`, `证件号码`, `借阅时间`, `归还期限`) VALUES ("+bookid+", "+userid+", '"+borrowtime+"', '20221230')"
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'',
    database:'library',
  
  })
  connection.connect();
  connection.query(sql1,function(error,results,fields){
    //if(error) throw console.error;
    if(error){
      res.json(error)
    }
    else{
      res.json(results)
      console.log(results)
    }
  });
  connection.end();
  
})
app.listen(3000,()=>{
  console.log('server running at http://127.0.0.1:3000')
})


