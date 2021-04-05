
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()

const { check, validationResult } = require('express-validator/check');
const router = express.Router();
const session = require('express-session');

const bcrypt = require('bcrypt');



app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));


app.use(express.static('public'));
// フォームから送信された値を受け取れるようにしてください
const mysql = require('mysql')


const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'izushi26',
  port: '3306',
  database: 'restaurant'
});

app.use(
  session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
  })
)

app.use((req, res, next) => {
  if (req.session.userId === undefined) {
   res.locals.Namae = 'ゲスト';
   // res.localsオブジェクトのisLoggedInプロパティにfalseを代入してください
   res.locals.isLoggedIn = false;
 } else {
   res.locals.Namae = req.session.Namae;
   // res.localsオブジェクトのisLoggedInプロパティにtrueを代入してください
   res.locals.isLoggedIn = true;
 }
  next();
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/top', (req, res) => {
	const sql = "SELECT guide.Name, guide.エリア, guide.genre,ROUND(AVG(subguide.Food),2)AS food,ROUND(AVG(subguide.Decor),2)AS decor,ROUND(AVG(subguide.Service),2)AS service,ROUND(AVG(subguide.Cost),2)AS cost,guide.住所,guide.電話,guide.コメント FROM guide LEFT JOIN subguide ON guide.Name=subguide.Name GROUP BY guide.Name,guide.エリア, guide.genre,guide.住所,guide.電話,guide.コメント";
	con.query(sql, function (err, result, fields) {
	if (err) throw err;
	res.render('top.ejs',{content : result});
	});
});

app.get('/delete/:Name',(req,res)=>{
  	const sql = "DELETE FROM guide WHERE Name = ?";
  	con.query(sql,[req.params.Name],function(err,result,fields){
  		if (err) throw err;
  		console.log(result)
  		res.redirect('/loggedinindex');
  	})
  });


app.get('/loggedinindex', (req, res) => {

	const sql = "SELECT guide.Name, guide.エリア, guide.genre,ROUND(AVG(subguide.Food),2)AS food,ROUND(AVG(subguide.Decor),2)AS decor,ROUND(AVG(subguide.Service),2)AS service,ROUND(AVG(subguide.Cost),2)AS cost,guide.住所,guide.電話,guide.コメント FROM guide LEFT JOIN subguide ON guide.Name=subguide.Name GROUP BY guide.Name,guide.エリア, guide.genre,guide.住所,guide.電話,guide.コメント";
	con.query(sql, function (err, result, fields) {
	if (err) throw err;
	res.render('loggedinindex.ejs',{content : result});
	});
});

app.post('/loggedinindex', (req, res) => {
	const sql = "INSERT INTO guide SET ?";


	con.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.redirect('/loggedinindex');
	});
});



app.post('/top', (req, res) => {
	const sql = "INSERT INTO subguide SET ?";


	con.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.redirect('top');
	});
});

app.get('/signup', (req, res) => {
  // res.renderの第２引数にオブジェクトを追加してください
  res.render('signup.ejs', {errors:[]});
});

// ユーザーを登録するルーティングを作成してください
app.post('/signup', (req, res,next) => {

  console.log('入力値の空チェック');
  const Namae = req.body.Namae;

   const password = req.body.password;

   // 空の配列errorsを定義してください。
   const errors = [];

   // 3つの定数が空文字列と等しいかどうかを調べるif文をそれぞれ作成してください。
   // 空の場合、配列errorsにエラーメッセージを追加してください。
   if (Namae === '') {
     errors.push('ユーザー名が空です');
   }

   if (password === '') {
     errors.push('パスワードが空です');
   }
   // console.logを用いて、ターミナルに配列errorsを出力してください
   console.log(errors);

   // if文を用いて、配列errorsの要素数が0より大きいかどうかを確認してください
   // また分岐結果に応じて、処理を記載してください
   if(errors.length > 0) {
     res.render('signup.ejs', {errors:errors});
   }
   else {

    // next関数を呼び出してください
  next();}

  },

  (req, res, next) => {
  // console.logを用いて「メールアドレスの重複チェック」と出力してください
  console.log('メールアドレスの重複チェック');

  // next関数を呼び出してください
  next();

},
  (req, res) => {
    // console.logを用いて「ユーザー登録」と出力してください
  console.log('ユーザー登録');

  const Namae = req.body.Namae;
  const password = req.body.password;
  bcrypt.hash(password, 10, (error, hash) =>{
    con.query(
      'INSERT INTO users (Namae, password) VALUES (?, ?)',
      [Namae, hash],
      (error, results) => {
        // 一覧画面にリダイレクトしてください
        res.redirect('/signupresult');
      }
    );
    });

    // ここから移動してください
    // 第２引数に指定しているpasswordをhashに変更してください

    // ここまで移動してください
  }
);

app.post('/signupresult', (req, res) => {
	const sql = "INSERT INTO users SET ?";


	con.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.redirect('/top');
	});
});

app.get('/signupresult', (req, res) => {
  res.render('signupresult.ejs');
});


app.post('/addthreeresult', (req, res) => {
	const sql = "INSERT INTO guide SET ?";


	con.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.redirect('/addfour');
	});
});

app.get('/addthreeresult', (req, res) => {
  res.render('addthreeresult.ejs');
});




app.get('/addtwo', (req, res) => {
  const sql = "SELECT Name FROM guide GROUP BY Name";
  con.query(sql, function (err, result, fields) {
  if (err) throw err;
  res.render('addtwo.ejs',{content : result});
  });
});

app.get('/addfour', (req, res) => {
  const sql = "SELECT Name FROM guide ORDER BY id DESC LIMIT 1";
  con.query(sql, function (err, result, fields) {
  if (err) throw err;
  res.render('addfour.ejs',{content : result});
  });
});

con.connect(function(err) {
	if (err) throw err;
	console.log('Connected');
});











//localhost:3000/add
app.get('/addthree', function (req, res, next) {
  const data = {
      errorMessage: ''
  }
  res.render('./addthree', data);
});

//localhost:3000/addへのPOST
app.post('/addthree', (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

      const errors_array = errors.array();

      res.render('./addthree', {
          errorMessage: errors_array,
      })
  } else {

      const name = req.body.Name;
      const post = { 'name': name };

      const connection = mysql.createConnection(mysql_setting);
      connection.connect();

      connection.query('INSERT INTO guide SET ?', post, function (error, results, fields) {
          if (error) throw error;
          res.redirect('./addthreeresult');
          console.log('ID:', results.insertId);
      });

      connection.end();

  }

})

app.get('/addtwo', function (req, res, next) {
  const data = {
      errorMessage: ''
  }
  res.render('./addtwo', data);
});

app.post('/addtwo', (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

      const errors_array = errors.array();

      res.render('./addtwo', {
          errorMessage: errors_array,
      })
  } else {

      const name = req.body.Name;
      const post = { 'Name': name };

      const connection = mysql.createConnection(mysql_setting);
      connection.connect();

      connection.query('INSERT INTO subguide SET ?', post, function (error, results, fields) {
          if (error) throw error;
          res.redirect('./');
          console.log('ID:', results.insertId);
      });

      connection.end();

  }

})



module.exports = router;

app.get('/addfour', function (req, res, next) {
  const data = {
      errorMessage: ''
  }
  res.render('./addfour', data);
});


app.post('/addfour', (req, res,next) => {

  console.log('入力値の空チェック');
  const Name = req.body.Name;



   // 空の配列errorsを定義してください。
   const errors = [];

   // 3つの定数が空文字列と等しいかどうかを調べるif文をそれぞれ作成してください。
   // 空の場合、配列errorsにエラーメッセージを追加してください。
   if (Name === '') {
     errors.push('レストランをクリックしてね！');
   }


   // console.logを用いて、ターミナルに配列errorsを出力してください
   console.log(errors);

   // if文を用いて、配列errorsの要素数が0より大きいかどうかを確認してください
   // また分岐結果に応じて、処理を記載してください
   if(errors.length > 0) {
     res.render('addfour.ejs', {errors:errors});
   }
   else {

    // next関数を呼び出してください
  next();}

  },

  (req, res) => {const Name = req.body.Name;
  const Food = req.body.Food;
  const Service = req.body.Service;
  const Decor = req.body.Decor;
  const Cost = req.body.Cost;

    con.query('INSERT INTO subguide (Name, Food,Service, Decor,Cost) VALUES (?,?,?,?, ?)',
      [Name, Food,Service, Decor,Cost],
      (error, results) => {
        // 一覧画面にリダイレクトしてください
        res.redirect('/');
  	});
  });





app.post('/addfour', (req, res, next) => {



  const errors = validationResult(req);

  if (!errors.isEmpty()) {

      const errors_array = errors.array();

      res.render('./addfour', {
          errorMessage: errors_array,
      })
  }


  else {

      const name = req.body.Name;
      const post = { 'Name': name };

      const connection = mysql.createConnection(mysql_setting);
      connection.connect();

      connection.query('INSERT INTO subguide SET ?', post, function (error, results, fields) {
          if (error) throw error;
          res.redirect('./');
          console.log('ID:', results.insertId);
      });

      connection.end();

  }

})



module.exports = router;

app.get('/login', (req, res) => {
  res.render('login.ejs');

});

app.post('/login', (req, res) => {
  // フォームから送信されたメールアドレスを定数emailに代入してください
  const Namae = req.body.Namae;

  //ユーザー情報を取得するコードを貼り付けてください
  con.query(
    'SELECT * FROM users WHERE Namae = ?',
    [Namae],
    (error, results) => {
      // 配列resultsの要素数で処理の分岐をしてください
      if (results.length > 0) {

        const plain = req.body.password;

        // 定数hashを定義してください
        const hash = results[0].password;

        bcrypt.compare(plain, hash, (error, isEqual) => {
        if(isEqual) {
          req.session.userId = results[0].id;
           req.session.Namae = results[0].Namae;
           res.redirect('/loggedinindex');
        }  else {
          res.redirect('/login');
        }
       });

      } else {
        res.redirect('/login');
      }
      }

  );
});

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    res.redirect('/loggedinindex');
  });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
