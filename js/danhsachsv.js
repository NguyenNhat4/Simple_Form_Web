function DanhSachSinhVien(){
    this.AR_DSSV = [];
    this.themSinhVien = function (svThem){
        this.AR_DSSV.push(svThem);
    }
    this.xoaSinhVien = function(listSvXoa){
for (let i = 0; i < listSvXoa.length; i++) {
    for (let j = 0; j < this.AR_DSSV.length; j++) {
       var sinhvien = this.AR_DSSV[j];
       if(listSvXoa[i] ==  sinhvien.maSV){
        this.AR_DSSV.splice(j,1);
       }
        
    }
    
}


    }
    this.TimSVTheoMa = function(keyword)
    {
        for(var i=0;i<this.AR_DSSV.length;i++)
        {
            
             sv = this.AR_DSSV[i];
           
            if(sv.maSV === keyword)
            {
                return sv;
            }
        }
        return null;
    }
 
    
    
}