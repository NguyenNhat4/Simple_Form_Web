function SinhVien(
  masv,
  hoten,
  svemail,
  sodienthoai,
  chungminhnd,
  toan,
  ly,
  hoa,xepLoai
) {
  this.maSV = masv;
  this.hoten = hoten;
  this.sodt = sodienthoai;
  this.cmnd = chungminhnd;
  this.diemToan = toan;
  this.diemLy = ly;
  this.diemHoa = hoa;
  this.email = svemail;

  this.TinhDiemTB =
    ((parseFloat(this.diemHoa) +
      parseFloat(this.diemToan) +
      parseFloat(this.diemLy)) /
    3).toFixed(2);
 
   this.xepLoaiSV = xepLoai;
   
}
