import {NbToastrService} from "@nebular/theme";


export class ToastService {
  private destroyByClick = true;

  constructor(private toastrService: NbToastrService) {
  }

  showToast(type, position, status, object) {
    if (type === 'delete') {
      if (status === 'danger') {
        this.toastrService.show(
          `Failed to delete the ${object}.` || status,
          `Error!`,
          {position, status, destroyByClick: true, duration: 3000});
      } else {
        this.toastrService.show(
          `${object} deleted successfully!` || status,
          `Success!`,
          {position, status, destroyByClick: true, duration: 3000});
      }
    } else if (type === 'update') {
      if (status === 'danger') {
        this.toastrService.show(
          `Failed to edit the ${object}.` || status,
          `Error!`,
          {position, status, destroyByClick: true, duration: 3000});
      } else {
        this.toastrService.show(
          `${object} edited successfully!` || status,
          `Success!`,
          {position, status, destroyByClick: true, duration: 3000});
      }
    } else {
      if (status === 'danger') {
        this.toastrService.show(
          `Failed to insert the ${object}.` || status,
          `Error!`,
          {position, status, destroyByClick: true, duration: 3000});
      } else if (status === 'success') {
        this.toastrService.show(
          `${object} inserted successfully!` || status,
          `Success!`,
          {position, status, destroyByClick: true, duration: 3000});
      } else {
        this.toastrService.show(
          `${object} already registered!` || status,
          `Ups!`,
          {position, status, destroyByClick: true, duration: 3000});
      }
    }
  }

}