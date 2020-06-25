import { TranslateService } from '@ngx-translate/core';

export class CustomErrorMessage {
  errorMessage: string;

  constructor(private translate: TranslateService) {
  }

  selectErrorMessage(code: string): string {
    console.log('code: ', code);
    switch (code) {
      case '101':
        this.errorMessage = this.translate.instant('error_code.101');
        break;
      case '102':
        this.errorMessage = this.translate.instant('error_code.102');
        break;
      case '103':
        this.errorMessage = this.translate.instant('error_code.103');
        break;
      case '104':
        this.errorMessage = this.translate.instant('error_code.104');
        break;
      case '105':
        this.errorMessage = this.translate.instant('error_code.105');
        break;
      case '106':
        this.errorMessage = this.translate.instant('error_code.106');
        break;
      case '107':
        this.errorMessage = this.translate.instant('error_code.107');
        break;
      default:
        this.errorMessage = '';
    }
    return this.errorMessage;
  }
}
