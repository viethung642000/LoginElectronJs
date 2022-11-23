


var getInfo = (event) => {
  event.preventDefault();
  if(localStorage.getItem("access_token") != null) {
    fetch("http://10.32.4.169:81/api/auth/info", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      const result = data.data;
      console.log(data);
      document.getElementById('code').value = result.code;
      document.getElementById('email').value = result.mail;
      document.getElementById('phone').value = result.phone;
      document.getElementById('branch_name').value = result.branch_name;
      document.getElementById('firstname').value = result.first_name;
      document.getElementById('username').value = result.user_name;
      
    });
  }
  else {
    ipcRenderer.send("login:failed");
  }
};

