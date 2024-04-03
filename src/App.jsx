import { useState,useEffect } from 'react'
import Select from 'react-select';
import {Region,Cities,Neighborhoods,RSClass,RSType,CityMapping,NeighborhoodMapping,RSPrice,postData} from './assets/MetaData'
import './App.css'


function App() {

  const [City, setCity] = useState(null)
  const [region, setRegion] = useState(null)
  const [Neighborhood, setNeighborhood] = useState(null)
  const [rSClass, setRSClass] = useState(null)
  const [rSType, setRSType] = useState(null)
  const [RSNumber, setRSNumber] = useState(null)
  const [RSSize, setRSSize] = useState(null)
  const [Message,setMessage]=useState(null)
  const [pop,setpop]=useState(false)
  const [Submit,setSubmit]=useState(false)
  const [Price,setPrice]=useState(null)
  async function Fun(){
    if(City==null||region==null||Neighborhood==null||rSClass==null||rSType==null||RSNumber==null||RSSize==null){
      setMessage('الرجاء ملء جميع الحقوق لمعالجة طلبك')
    }else{
      setpop(true)

      const response = await postData('https://realstate-latest.onrender.com', {
        Region: Region.indexOf(region),
        City: CityMapping.indexOf(City),
        Neighborhood: NeighborhoodMapping.indexOf(Neighborhood),
        RSClass: RSClass.indexOf(rSClass),
        RStype: RSType.indexOf(rSType),
        RSNumber: RSNumber,
        Size: RSSize
      });
      if (response) {
        setPrice(RSPrice[response.pred]);
        setSubmit(true)
      } else {
        location.replace("https://www.google.com");
      }

     
    }
  }
  const reload=()=>window.location.reload();

  if(pop==false){
  return (
    <>
    <div className="App">
      <h5>{Message}</h5>
      <Select
        options={Region.map(opt => ({ label: opt, value: opt }))}
        onChange={opt => setRegion(opt.value)}
        className="Select"
        placeholder={'المنطقة'}
      />
      <Select
        options={region==null?[]:Cities[region].map(opt => ({ label: opt, value: opt }))}
        onChange={opt => setCity(opt.value)}
        className="Select"
        placeholder={'المدينة'}
      />
      <Select
        options={City==null?[]:Neighborhoods[City].map(opt => ({ label: opt, value: opt }))}
        className="Select"
        onChange={opt => setNeighborhood(opt.value)}
        placeholder={'الحي'}
      />
      <Select
        options={Neighborhood==null?[]:RSClass.map(opt => ({ label: opt, value: opt }))}
        className="Select"
        onChange={opt => setRSClass(opt.value)}
        placeholder={'تصنيف العقار'}
      />
      <Select
        options={rSClass==null?[]:RSType.map(opt => ({ label: opt, value: opt }))}
        className="Select"
        onChange={opt => setRSType(opt.value)}
        placeholder={'نوع العقار'}
      />
       <div className="Num">
      <input name="age" type="number" min={1} max={36}  onChange={opt => setRSNumber(opt.target.value)} />
      <label>:عدد العقارات</label>

      <input name="age" type="number" step="0.01" min={0.0} max={4100322.87}  onChange={opt => setRSSize(opt.target.value)} />
      <label>:المساحة</label>
    </div>
     <button onClick={Fun} >أضغط هنا لحساب القيمة</button>
    </div>
    </>
 );
 }else{
    if(Submit==false){
      return(
        <div className="App">
          <div className='pop'>
            <p>نقوم الان بتحليل طلبك بواسطة نماذج الذكاء الاصطناعي الخاصة بنا</p>
        <div class="loader"></div>
        </div>
        </div>
        )}
      else{
      return(
        <div className="App">
          <h2>قيمة العقار</h2>
          <h2>{Price}</h2>
          <p>القيمة الموضحة أعلاه تقديرية مبنية على مجموعة بيانات حكومية مفتوحة للمبايعات العقارية للربع الثاني والثالث من سنة ٢٠٢٣م</p>
          <button onClick={reload}>العودة للصفحة الرئيسية</button>
        </div>
      )
    }
    }
  }

//onClick={shoot}
export default App
