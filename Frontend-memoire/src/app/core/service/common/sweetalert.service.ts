import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  showLoader(content: string): void {
    Swal.fire({
      title: content,
      html: '',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false
    });
  }
}
