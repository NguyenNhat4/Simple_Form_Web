function Validation() {
  this.KiemTraRong = function (element, error__element) {
    var x = Math.floor(Math.random() * 3);
    var warningText = "";
    if (x === 0) {
      warningText = `Chưa nhập ${element.name}!`;
    } else if (x === 1) {
      warningText = `Nhập ${element.name} đi kìa`;
    } else if (x === 2) {
      warningText = `Không bỏ trống ${element.name}!!`;
    }
    var error_warning = document.getElementById(error__element);

    if (element.value.trim() === "") {
      error_warning.innerHTML = warningText;
      error_warning.style.display = "block";
      element.className = "form-control border-3 border-danger";

      return false;
    }
    error_warning.style.display = "none";
    element.className = "form-control";

    return true;
  };

  this.KiemTraEmail = function (element, error__element) {
    var x = Math.floor(Math.random() * 3);
    var warningText = "";
    if (x === 0) {
      warningText = `Nhập email kì vậy ba`;
    } else if (x === 1) {
      warningText = `Email nhập sai kìa ba!`;
    } else if (x === 2) {
      warningText = `Nhập cho đúng vào!!`;
    }

    var error_warning = document.getElementById(error__element);
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(element.value)) {
      error_warning.innerHTML = warningText;
      error_warning.style.display = "block";
      element.className = "form-control border-3 border-danger";
      return false;
    }
    error_warning.style.display = "none";
    element.className = "form-control";

    return true;
  };

  this.KiemTraSoDT = function (element, error__element) {
    var error_warning = document.getElementById(error__element);

    var re = /^[0-9]+$/;
    if (!re.test(element.value)) {
      error_warning.innerHTML = "Nhập số vào " + element.name;
      error_warning.style.display = "block";
      element.className = "form-control border-3 border-danger";

      return false;
    }
    if (!(element.value.length > 2)) {
      error_warning.innerHTML = element.name + " có tối thiểu 3 số.";
      error_warning.style.display = "block";
      element.className = "form-control border-3 border-danger";

      return false;
    }

    error_warning.style.display = "none";
    element.className = "form-control";

    return true;
  };

  this.KiemTrachiSo = function (element, error__element) {
    var x = Math.floor(Math.random() * 3);
    var warningText = "";
    if (x === 0) {
      warningText = "Biết nhập điểm không";
    } else if (x === 1) {
      warningText = `Nhập lại ${element.name}`;
    } else if (x === 2) {
      warningText = "Nhập cho chuẩn vào";
    }
    var error_warning = document.getElementById(error__element);
    var re = /^[0-9+]$/;
    if (re.test(element.value)) {
      if ((Number(element.value) >= 0) & (Number(element.value) <= 10)) {
        error_warning.style.display = "none";
        element.className = "form-control";
        return true;
      }
    } else {
      error_warning.innerHTML = warningText;
      error_warning.style.display = "block";
      element.className = "form-control border-3 border-danger";

      return false;
    }
  };
}
