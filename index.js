$(function() {
    //初始化
    var APP_ID = '93YtLRQzyhjHaQnNujaw3FCR-gzGzoHsz';
    var APP_KEY = 'UXXnIsMS8seP7K7AUS5GfceY';
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });

    //注册功能
    let signUpForm = document.querySelector('form[name=sign-up]');
    console.log(signUpForm);
    signUpForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        // 新建 AVUser 对象实例
        var user = new AV.User();
        // 设置用户名
        user.setUsername(signUpForm.username.value);
        // 设置密码
        user.setPassword(signUpForm.password.value);
        // 设置邮箱
        user.setEmail(signUpForm.email.value);
        user.signUp().then(function (loginedUser) {
            console.log(loginedUser);
            window.location.reload();
        }, function (error) {
            console.log(error);
        });
    })

    //欢迎当前用户功能
    var currentUser = AV.User.current();
    console.log("currentuser"+currentUser);
    if (currentUser) {
        document.getElementById('current-user').innerText = currentUser.attributes.username;
        console.log(currentUser.attributes.username);
    }
    else {
        document.getElementById('current-user').innerText = "游客";
        console.log("游客")
    }

    //登出功能
    var logOutBtn = document.getElementById('log-out');
    logOutBtn.addEventListener('click', function() {
        AV.User.logOut();
        // 现在的 currentUser 是 null 了
        window.location.reload();
        var currentUser = AV.User.current();
    })

    //登录功能
    let logInForm = document.querySelector('form[name=log-in]');
    console.log(logInForm);
    logInForm.addEventListener('submit', (event)=> {
        event.preventDefault();
        var username = logInForm.username.value;
        var password = logInForm.password.value;
        AV.User.logIn(username, password).then(function (loginedUser) {
            console.log(loginedUser);
            window.location.reload();
            alert("登录成功");
        }, function (error) {
            console.log(error);
            switch(error.code){
                case 210: 
                    alert("密码错误");
                case 211:
                    alert("用户名不存在");
            }
        });
    })


    console.log("hello");
    $("#sign-up-btn").click(function() {
        console.log("click");
        $(".form-log-in").addClass("disabled");
        $(".form-sign-up").removeClass("disabled");
    })
    $("#log-in-btn").click(function() {
        console.log("click");
        $(".form-log-in").removeClass("disabled");
        $(".form-sign-up").addClass("disabled");
    })  
})