(function(){
  const fonts = ["cursive","sans-serif","serif","monospace"];
  let captchaValue = "";

  function generateCaptcha(){
    let value = btoa(Math.random()*1000000000);
    value = value.substr(0,5+Math.random()*5);
    captchaValue = value;
  }

  function setCaptcha(){
    let html = captchaValue.split("").map((char)=>{
      const rotate = -20 + Math.trunc(Math.random()*30);
      const font = Math.trunc(Math.random()*fonts.length);
      return `<span
        style="
          transform:rotate(${rotate}deg);
          font-family:${fonts[font]}
        "
      >${char}</span>`;
    }).join("");
    document.querySelector(".login-form .captcha .preview").innerHTML = html;
  }

  function initCaptcha(){
    document.querySelector(".login-form .captcha .captcha-refresh").addEventListener("click",function(){
      generateCaptcha();
      setCaptcha();
    });
    generateCaptcha();
    setCaptcha();
  }

  function validateUsernameAndPassword() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      swal("Error", "Username must contain only letters and numbers", "error");
      return false;
    }

    if (!username) {
      swal("Error", "Username cannot be empty", "error");
      return false;
    }

    if (!password) {
      swal("Error", "Password cannot be empty", "error");
      return false;
    }

    // Strong password validation criteria
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      swal("Error", "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character", "error");
      return false;
    }

    return true;
  }

  document.querySelector(".login-form #login-btn").addEventListener("click",function(){
    if (validateUsernameAndPassword()) {
      let inputCaptchaValue = document.querySelector(".login-form .captcha input").value;
      if(inputCaptchaValue === captchaValue){
        swal("", "Logging In!", "success");
      } else {
        swal("Error", "Invalid captcha", "error");
      }
    }
  });

  initCaptcha();
})();
