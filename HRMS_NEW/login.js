function loginDetails(){
    var user=document.getElementById("username").value;
    var password=document.getElementById('password').value;
    if (user=='admin' && password=='admin')
    {
       location.href="dashboard.html";
    }
    
   
}
