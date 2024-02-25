import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() modalLable?: string;
  @Input() onClose!: () => void;

  constructor() { }

  handleClose(e:any){
    if(e.target.className === 'modal-container'){
      this.onClose()
    }
    return null
  }

}
