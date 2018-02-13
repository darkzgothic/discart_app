import $ from 'jquery';
import alertify from 'alertify.js';
import validator from 'validator';

class GoogleMapHelper {
    constructor() {
           this.title = $("#title");
           this.phn = $("#phn");
           this.address = $("#address");
           this.category = $("#category");
           this.location = $("#location");
           this.lat = $("#lat");
           this.lon = $("#lon");

           this.titleError = $("#title_error");
           this.phnError = $("#phn_error");
           this.addressError = $("#address_error");
           this.locationError = $("#location_error");

           
           this.createBtn = $("#createBtn");

           this.loadingIconCreate = $("#loading_icon_create");

           this.loadingIconCreate.hide();
           this.create();
    }

    create(){
        var that = this;

        this.createBtn.click(function(){
            that.titleError.html("");
            that.phnError.html("");
            that.addressError.html("");
            that.locationError.html("");

            var data = {};
            data.title = that.title.val();
            data.phn = that.phn.val();
            data.address = that.address.val();
            data.category = that.category.val();
            data.location = that.location.html();
            data.lat = that.lat.html();
            data.lon = that.lon.html();
            
            var titleE = validator.isEmpty(data.title);
            var phnE = validator.isNumeric(data.phn);
            var addressE = validator.isEmpty(data.address);
            var locationE = validator.isEmpty(that.location.html());
            var latE = validator.isEmpty(that.lat.html());
            var lonE = validator.isEmpty(that.lon.html());
            

            if(titleE){
                that.titleError.html("Title Can't be Empty");
                alertify.error("Title Can't be Empty");
                return; 
            }
            if(!phnE){
                that.phnError.html("Enter Valid Phone Number");
                alertify.error("Enter Valid Phone Number");
                return; 
            }
            if(addressE){
                that.addressError.html("Address Can't be Empty");
                alertify.error("Address Can't be Empty");
                return; 
            }
            if(locationE || latE || lonE){
                that.locationError.html("Please Select Location");
                alertify.error("Please Select Location");
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
                url: 'http://localhost:8000/user/create-company-profile',						
                success: function(data) {
                        that.loadingIconCreate.hide();

                        if(data == "error"){
                                alertify.error("Something Wrong.. Try again");
                                console.log(data);
                        }
                        if(data == "success"){
                                alertify.success("Profile Successfully Created");
                        }
                },
                error: function(data) {
                        that.loadingIconCreate.hide();
                        alertify.error("Something Wrong.. Try again");
                        console.log(data);
                }
        });
            console.log(data);
        });
    }
}

export default GoogleMapHelper;