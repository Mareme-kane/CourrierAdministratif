import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '×', {
      duration: 10000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
}
