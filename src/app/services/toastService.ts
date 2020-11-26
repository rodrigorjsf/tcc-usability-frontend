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
    } else if (type === 'send') {
      if (status === 'danger') {
        this.toastrService.show(
          `Failed to send the ${object}.` || status,
          `Error!`,
          {position, status, destroyByClick: true, duration: 3000});
      } else {
        this.toastrService.show(
          `${object} sended successfully!` || status,
          `Success!`,
          {position, status, destroyByClick: true, duration: 3000});
      }
    } else if (type === 'download') {
      if (status === 'danger') {
        this.toastrService.show(
          `Could not download the ${object} plan.` || status,
          `Error!`,
          {position, status, destroyByClick: true, duration: 3000});
      }
    }else if (type === 'section') {
      if (status === 'danger') {
        this.toastrService.show(
          `This section is being edited by ${object}. Try again later.` || status,
          `Error!`,
          {position, status, destroyByClick: true, duration: 6000});
      }
    } else if (type === 'collab') {
      if (status === 'danger') {
        this.toastrService.show(
          `Error adding ${object} to the assessment. Check that the code is correct.` || status,
          `Error!`,
          {position, status, destroyByClick: true, duration: 3000});
      } else {
        this.toastrService.show(
          `${object} successfully added to the assessment.` || status,
          `Success!`,
          {position, status, destroyByClick: true, duration: 3000});
      }
    } else if (type === 'collabAdd') {
      if (status === 'danger') {
        this.toastrService.show(
          `Error sending ${object} request to enter the assessment.` || status,
          `Error!`,
          {position, status, destroyByClick: true, duration: 3000});
      } else {
        this.toastrService.show(
          `Entry invitation successfully sent to ${object}.` || status,
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
