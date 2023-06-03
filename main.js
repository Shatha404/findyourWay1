
 document.querySelector("#show-login").addEventListener("click",function(){
    document.querySelector(".popup").classList.add("active");
});

document.querySelector(".popup .close-btn").addEventListener("click",function(){
    document.querySelector(".popup").classList.remove("active");
});


//trackin login attempts
var loginAttempts = 0;
var MaxLoginAttempts = 3;

//login function 
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (email === "admin@admin.com" && password === "1"){
    // Redirect to admin page
    window.location.assign("admin.html");
    // Successful login
    alert("Login successful!");
  } else{
      // Failed login
      alert("Invalid username or password!");
    
    loginAttempts++;

    if(loginAttempts >= MaxLoginAttempts){
      //mas attempts reached, send temp password via email
     let email = prompt("Max login attempts reached. Enter your email address to receive a temporary password: ");
      alert("Temporary password sent to " + email);
    } else{
      //display error message and reset input fields
      alert("Incorrect username or password. Please try again. ")
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";

      }
    }
  }
  //attach login function to login button

  const loginBtn = document.getElementById("loginBtn");
  loginBtn.addEventListener("click", login);

  //admin page

  $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    var actions = $("table td:last-child").html();
    // Append table with add row form on add new button click
      $(".add-new").click(function(){
      $(this).attr("disabled", "disabled");
      var index = $("table tbody tr:last-child").index();
          var row = '<tr>' +
              '<td><input type="text" class="form-control" name="name" id="name"></td>' +
              '<td><input type="text" class="form-control" name="department" id="department"></td>' +
              '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +'<td><input type="text" class="form-control" name="phone" id="phone"></td>' +'<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
        '<td>' + actions + '</td>' +
          '</tr>';
        $("table").append(row);		
      $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
          $('[data-toggle="tooltip"]').tooltip();
      });
    // Add row on add button click
    $(document).on("click", ".add", function(){
      var empty = false;
      var input = $(this).parents("tr").find('input[type="text"]');
          input.each(function(){
        if(!$(this).val()){
          $(this).addClass("error");
          empty = true;
        } else{
                  $(this).removeClass("error");
              }
      });
      $(this).parents("tr").find(".error").first().focus();
      if(!empty){
        input.each(function(){
          $(this).parent("td").html($(this).val());
        });			
        $(this).parents("tr").find(".add, .edit").toggle();
        $(".add-new").removeAttr("disabled");
      }		
      });
    // Edit row on edit button click
    $(document).on("click", ".edit", function(){		
          $(this).parents("tr").find("td:not(:last-child)").each(function(){
        $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
      });		
      $(this).parents("tr").find(".add, .edit").toggle();
      $(".add-new").attr("disabled", "disabled");
      });
    // Delete row on delete button click
    $(document).on("click", ".delete", function(){
          $(this).parents("tr").remove();
      $(".add-new").removeAttr("disabled");
      });
  });



//data base 
  fetch("DB.json")
  .then(function(response){
        return response.json();   
  })
  .then(function(Employee){
            let placceholder = document.querySelector("#data-output");
            let out ="";
            for(let Employees of Employee){
                out += `
                  
                <tr>
                
                  <td> ${Employee.name}  </td>
                  <td> ${Employee.officeNumber}  </td>
                  <td> ${Employee.floorNumber}  </td>
            
                </tr>

                `;
      }
      placceholder.innerHTML=out;
  })