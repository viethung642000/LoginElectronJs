const us = document.getElementById("validationDefaultUsername");
const pwd = document.querySelector("#pwd");

var login = (event) => {
  event.preventDefault();
  fetch("http://10.32.4.169:81/api/auth/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ code: us.value, password: pwd.value }),
  })
    .then((response) => {
      //console.log(us)
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("access_token", data.data.access_token);
      //console.log(data)
      if (data.code == 0) {
        // get info of user
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
            console.log(result);
            window.api.addUser(result);
          });

        //ipcRenderer.send("login:done", data.data.access_token);
      } else {
        validateLogin(data.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
      validateLogin("Sai tai khoan mat khau !");
    });
};

var validateLogin = (message) => {
  new Notification("Error", { body: message });
};
