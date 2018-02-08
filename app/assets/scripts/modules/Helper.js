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

                this.regBtn = $("#reg_btn");

               

                
                this.events();


        }

        events() {
                var that = this;

                this.regBtn.click(function(){
                        that.nameError.hide();
                        that.emailErrorReg.hide();
                        that.phnError.hide();
                        that.passErrorReg.hide();
                        that.cpassError.hide();

                        var data = {};
                        data.name = that.name.val();
                        data.email = that.emailReg.val();
                        data.phn = that.phn.val();
                        data.pass = that.passReg.val();
                        data.cpass = that.cpass.val();

                        var schema = new passwordValidator();
                        schema.is().min(5);

                        var nameE = validator.isEmpty(data.name);
                        var emailE = validator.isEmail(data.email);
                        var phnE = validator.isNumeric(data.phn);
                        var passE = schema.validate(data.pass);

                        if(nameE){
                                that.nameError.show();
                                that.nameError.html("Name Can't Be Empty");
                                return;        
                        }
                        if(!emailE){
                                that.emailErrorReg.show();
                                that.emailErrorReg.html("Enter Valid Email Address");
                                return;        
                        }
                        if(!phnE){
                                that.phnError.show();
                                that.phnError.html("Enter Valid Phone Number");
                                return;        
                        }
                        if(!passE){
                                that.passErrorReg.show();
                                that.passErrorReg.html("Passwords must be at least 5 chars long");
                                return;        
                        }
                        if(data.pass != data.cpass){
                                that.cpassError.show();
                                that.cpassError.html("Passwords not matched");
                                return;        
                        }

                        $.ajaxSetup({
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                }
                        });

                        $.ajax({
                                typye: 'GET',
                                data: data,
                                contentType: 'application/json',
                                url: 'http://localhost:8000/register',						
                                success: function(data) {
                                        console.log('success');
                                        console.log(data);
                                },
                                error: function(data) {
                                        console.log('Error');
                                        console.log(data);
                                }
                        });

                        console.log(data);
                });
        }
}

export default Helper;