var dssv = new DanhSachSinhVien();
("use strict");
function getEle(id) {
  return document.getElementById(id);
}
function TaoTheTD(className, value) {
  var td = document.createElement("td");
  td.className = className;
  td.innerHTML = value;
  return td;
}
var validation = new Validation();
function ThemSinhVien() {
  // takeing user's inputs
  var maSV = document.getElementById("masv");
  var hoten = document.getElementById("hoten");
  var cmnd = document.getElementById("cmnd");
  var sdt = document.getElementById("sdt");
  var email = document.getElementById("email");
  var Toan = document.getElementById("Toan");
  var Ly = document.getElementById("Ly");
  var Hoa = document.getElementById("Hoa");
  var xepLoaiSV = xetXepLoaiSinhVien(Toan.value, Ly.value, Hoa.value);
  var flag = true; // false === valid
  // kiem tra rong
  flag &=
    validation.KiemTraRong(maSV, "masv-error") &
    validation.KiemTraRong(hoten, "hoten-error") &
    validation.KiemTraRong(cmnd, "cmnd-error") &
    validation.KiemTraRong(sdt, "sdt-error") &
    validation.KiemTraRong(email, "email-error") &
    validation.KiemTraRong(Toan, "Toan-error") &
    validation.KiemTraRong(Ly, "Ly-error") &
    validation.KiemTraRong(Hoa, "Hoa-error");
  // kiem tra email
  if (validation.KiemTraRong(email, "email-error")) {
    flag &= validation.KiemTraEmail(email, "email-error");
  }
  //kiem tra so
  if (validation.KiemTraRong(Toan, "Toan-error")) {
    flag &= validation.KiemTrachiSo(Toan, "Toan-error");
  }
  if (validation.KiemTraRong(Ly, "Ly-error")) {
    flag &= validation.KiemTrachiSo(Ly, "Ly-error");
  }
  if (validation.KiemTraRong(Hoa, "Hoa-error")) {
    validation.KiemTrachiSo(Hoa, "Hoa-error");
  }

  // kiem tra so dien
  flag &=
    validation.KiemTraSoDT(cmnd, "cmnd-error") &
    validation.KiemTraSoDT(sdt, "sdt-error");

  //
  if (!flag) {
    return;
  } //

  // THEM SINH VIEN

  var sv = new SinhVien(
    maSV.value,
    hoten.value,
    email.value,
    sdt.value,
    cmnd.value,
    Toan.value,
    Ly.value,
    Hoa.value,
    xepLoaiSV
  );
  dssv.themSinhVien(sv);
  // cap nhat danh sach sinh vien
  CapNhatDanhSachSV(dssv.AR_DSSV);
}

var CapNhatDanhSachSV = function (listSV) {
  var list_Table_SV = document.getElementById("tbodySinhVien");
  list_Table_SV.innerHTML = "";
  for (var i = 0; i < listSV.length; i++) {
    //take student's information from array student
    var sv = listSV;

    // create table for that student
    var trSV = document.createElement("tr");
    trSV.id = sv[i].maSV;
    trSV.className = "trSinhVien";
    // tao check box
    var tdCheckBox = document.createElement("td");
    var ckbMaSinhVien = document.createElement("input");

    ckbMaSinhVien.setAttribute("class", "ckbMaSV");
    ckbMaSinhVien.setAttribute("type", "checkbox");
    ckbMaSinhVien.setAttribute("value", sv[i].maSV);
    tdCheckBox.appendChild(ckbMaSinhVien);
    // others
    var diemTb = sv[i].TinhDiemTB;

    var tdMaSV = TaoTheTD("maSV", sv[i].maSV);
    var tdHoTen = TaoTheTD("HOTEN", sv[i].hoten);
    var tdCMND = TaoTheTD("cmnd", sv[i].cmnd);
    var tdEmail = TaoTheTD("Email", sv[i].email);
    var tdSoDT = TaoTheTD("SoDT", sv[i].sodt);
    var tdDiemTB = TaoTheTD("diemTB", diemTb);
    var tdXepLoai = TaoTheTD("XepLoai", sv[i].xepLoaiSV);
    trSV.appendChild(tdCheckBox);
    trSV.appendChild(tdMaSV);
    trSV.appendChild(tdHoTen);
    trSV.appendChild(tdEmail);
    trSV.appendChild(tdCMND);
    trSV.appendChild(tdSoDT);
    trSV.appendChild(tdDiemTB);
    trSV.appendChild(tdXepLoai);

    list_Table_SV.appendChild(trSV);
  }
};

function SetStorage() {
  var jsonDanhsachsinhvien = JSON.stringify(dssv.AR_DSSV);
  console.log(jsonDanhsachsinhvien);
  localStorage.setItem("DanhsachSV", jsonDanhsachsinhvien);
}

function GetStorage() {
  var jsonDanhsachsinhvien = localStorage.getItem("DanhsachSV");

  var mangDSSV = JSON.parse(jsonDanhsachsinhvien);

  dssv.AR_DSSV = mangDSSV;
  CapNhatDanhSachSV(dssv.AR_DSSV);
}

function xetXepLoaiSinhVien(diemToan, diemLy, diemHoa) {
  var diemTrungBinh =
    (parseFloat(diemHoa) + parseFloat(diemToan) + parseFloat(diemLy)) / 3;
  if (diemTrungBinh < 5) {
    return "Yếu";
  } else if ((diemTrungBinh >= 5) & (diemTrungBinh < 6.5)) {
    return "Trung Bình";
  } else if ((diemTrungBinh >= 6.5) & (diemTrungBinh < 8)) {
    return "Khá";
  } else if ((diemTrungBinh >= 8) & (diemTrungBinh < 9)) {
    return "Giỏi";
  } else if ((diemTrungBinh >= 9) & (diemTrungBinh < 10)) {
    return "Xuất sắc";
  } else {
    return "Không hợp lệ";
  }
}

function XoaSinhVien() {
  var listMaSV = document.getElementsByClassName("ckbMaSV");
  var listSVDuocChon = [];
  var textError = document.getElementById("chon_SV");
  for (let i = 0; i < listMaSV.length; i++) {
    if (listMaSV[i].checked) {
      listSVDuocChon.push(listMaSV[i].value);
    }
  }
  if (listSVDuocChon.length == 0) {
    textError.innerHTML = "Chọn sinh viên để xóa!";
    textError.style.display = "block";
    return;
  } else {
    textError.style.display = "none";
    textError.innerHTML = "";
  }

  dssv.xoaSinhVien(listSVDuocChon);
  SetStorage();
  CapNhatDanhSachSV(dssv.AR_DSSV);
}

function TimKiemSinhVien() {
  document.getElementById('error_timkiem').innerHTML = '';
var listSV = [];
  var maSVInput = document.getElementById("tukhoa").value;
  var sv = dssv.TimSVTheoMa(maSVInput);
 if (sv === null) {
  return false;
 }
  listSV.push(sv);
  CapNhatDanhSachSV(listSV);
 
}

document.getElementById('btn_timkiem').onclick = function (){
  var maSVInput = document.getElementById("tukhoa").value;
  if(!TimKiemSinhVien()){
    document.getElementById('error_timkiem').innerHTML = '*Không tìm thấy sinh viên có mã số ' + maSVInput;
  }

}
