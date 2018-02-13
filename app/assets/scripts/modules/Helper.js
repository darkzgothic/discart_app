import $ from 'jquery';
import alertify from 'alertify.js';
import validator from 'validator';
import passwordValidator from 'password-validator';

class Helper {
        constructor(){
                this.name = $("#name_reg");
                this.emailReg = $("#email_reg");
                this.phn = $("#phn_reg");
                this.passReg = $("#pass_reg");
                this.cpass = $("#cpass_reg");

                this.nameError = $("#name_error");
                this.emailErrorReg = $("#email_error_reg");
                this.phnError = $("#phn_error");
                this.passErrorReg = $("#pass_error_reg");
                this.cpassError = $("#cpass_error");

                //Login
                this.emailLogin = $("#email_login");
                this.passLogin = $("#pass_login");

                this.emailError = $("#email_error");
                this.passError = $("#pass_error");

                this.regBtn = $("#reg_btn");
                this.loginBtn = $("#login_btn");

                this.loadingIcon = $("#loading_icon_reg");
                this.loadingIconLogin = $("#loading_icon_login");

                this.loadingIcon.hide();
                this.loadingIconLogin.hide();
                

                //Update
                this.uName = $("#name");
                this.uPhn = $("#phn");
                this.uNameError = $("#name_error");
                this.uPhnError = $("#phn_error");
                this.updateBtn = $("#updateBtn");
                this.loadingIconUpdate = $("#loading_icon_update");

                this.loadingIconUpdate.hide();

                this.register();
                this.login();
                this.update();

        }

        update() {
                var that = this;

                this.updateBtn.click(function(){
                        that.uNameError.html("");     
                        that.uPhnError.html("");   
                        
                        var data = {};
                        data.name = that.uName.val();
                        data.phn = that.uPhn.val();

                        var nameE = validator.isEmpty(data.name);
                        var phnE = validator.isNumeric(data.phn);

                        if(nameE){
                                that.uNameError.html("Name Can't be Empty");
                                return; 
                        }
                        if(!phnE){
                                that.uPhnError.html("Enter Valid Phone Number");
                                return;
                        }

                        that.loadingIconUpdate.show();

                        $.ajaxSetup({
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                }
                        });

                        $.ajax({
                                typye: 'GET',
                                data: data,
                                contentType: 'application/json',
                                url: 'http://localhost:8000/user/update',						
                                success: function(data) {
                                        that.loadingIconUpdate.hide();

                                        if(data == "error"){
                                                that.loadingIconUpdate.hide();
                                                alertify.error("Something Wrong.. Try again");
                                                console.log(data);
                                        }
                                        if(data == "success"){
                                                alertify.success("Profile Successfully Updated");
                                        }
                                },
                                error: function(data) {
                                        that.loadingIconUpdate.hide();
                                        alertify.error("Something Wrong.. Try again");
                                        console.log(data);
                                }
                        });

                });
        }

        login(){
                var that = this;

                this.loginBtn.click(function(){
                        that.emailError.html("");
                        that.passError.html("");

                        var data = {};
                        data.email = that.emailLogin.val();
                        data.pass = that.passLogin.val();

                        var schema = new passwordValidator();
                        schema.is().min(6);

                        var emailE = validator.isEmail(data.email);
                        var passE = schema.validate(data.pass);

                        if(!emailE){
                                // that.emailError.show();
                                that.emailError.html("Enter Valid Email Address");
                                return; 
                        }
                        if(!passE){
                                // that.passError.show();
                                that.passError.html("Passwords must be at least 6 chars long");
                                return;        
                        }

                        that.loadingIconLogin.show();

                        $.ajaxSetup({
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                }
                        });

                        $.ajax({
                                typye: 'GET',
                                data: data,
                                contentType: 'application/json',
                                url: 'http://localhost:8000/auth/login',						
                                success: function(data) {
                                        that.loadingIconLogin.hide();

                                        if(data.error == "error"){
                                                if(data.msg == "Wrong Password"){
                                                        that.passError.html("Wrong Password");
                                                }
                                                if(data.msg == "User Not Found"){
                                                        that.emailError.html("User Not Found");
                                                }
                                                if(data.msg == "Invalid Email"){
                                                        that.emailError.html("Invalid Email");
                                                }
                                        }
                                        if(data == "success"){
                                                console.log("Success Login");
                                                window.location = "profile";
                                        }
                                },
                                error: function(data) {
                                        that.loadingIconLogin.hide();
                                        alertify.error("Something Wrong.. Try again");
                                        console.log(data);
                                }
                        });

                        console.log(data);
                });
        }

        register() {
                var that = this;

                this.regBtn.click(function(){
                        that.nameError.html("");
                        that.emailErrorReg.html("");
                        that.phnError.html("");
                        that.passErrorReg.html("");
                        that.cpassError.html("");

                        var data = {};
                        data.name = that.name.val();
                        data.email = that.emailReg.val();
                        data.phn = that.phn.val();
                        data.pass = that.passReg.val();
                        data.cpass = that.cpass.val();

                        var schema = new passwordValidator();
                        schema.is().min(6);

                        var nameE = validator.isEmpty(data.name);
                        var emailE = validator.isEmail(data.email);
                        var phnE = validator.isNumeric(data.phn);
                        var passE = schema.validate(data.pass);

                        if(nameE){
                                // that.nameError.show();
                                that.nameError.html("Name Can't Be Empty");
                                return;        
                        }
                        if(!emailE){
                                // that.emailErrorReg.show();
                                that.emailErrorReg.html("Enter Valid Email Address");
                                return;        
                        }
                        if(!phnE){
                                // that.phnError.show();
                                that.phnError.html("Enter Valid Phone Number");
                                return;        
                        }
                        if(!passE){
                                // that.passErrorReg.show();
                                that.passErrorReg.html("Passwords must be at least 6 chars long");
                                return;        
                        }
                        if(data.pass != data.cpass){
                                // that.cpassError.show();
                                that.cpassError.html("Passwords not matched");
                                return;        
                        }

                        that.loadingIcon.show();

                        $.ajaxSetup({
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                }
                        });

                        $.ajax({
                                typye: 'GET',
                                data: data,
                                contentType: 'application/json',
                                url: 'http://localhost:8000/auth/register',						
                                success: function(data) {
                                        that.loadingIcon.hide();

                                        if(data == "error"){
                                                // that.emailErrorReg.show();
                                                that.emailErrorReg.html("Email already registered");
                                        }
                                        if(data == "success"){
                                                alertify.success("Registration Successful. Please Login");
                                                that.emailLogin.val(that.emailReg.val());
                                                that.passLogin.val(that.passReg.val());
                                        }
                                },
                                error: function(data) {
                                        that.loadingIcon.hide();
                                        console.log(data);
                                }
                        });

                        console.log(data);
                });
        }
}

export default Helper;