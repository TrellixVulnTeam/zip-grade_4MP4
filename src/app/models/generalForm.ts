import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { IModelConvert } from './IModelConvert';
import { Quiz } from './quiz';



export class GeneralForm implements IModelConvert{
  constructor() { }
  convertModelToFormGroup(model: any): FormGroup {
    throw new Error('Method not implemented.');
  }

  
  convertModelToQuizFormGroup(model: Quiz): FormGroup {
    const group: any = {};    

    group.id = new FormControl(model.uuid || '');
    group.musteriAdi = new FormControl(model.quiz_name || '');
    return new FormGroup(group);
  }
  
  formUrunEkle(val: any){ 
    return new FormBuilder().group({
      id: val.id,
      urunAdi: val.productName,
      fiyat: val.price,
      adet: val.quantity || ''
    })
  }
  siparisEkle(val: any){ 
    return new FormBuilder().group({
      id: val.id,
      urunAdi: val.urunAdi,
      fiyat: val.fiyat,
      adet: val.adet,
      aciklama: ''
    })
  }
  
}