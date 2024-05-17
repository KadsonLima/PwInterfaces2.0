import { provideHttpClient, withFetch } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { IConfig, provideEnvironmentNgxMask } from "ngx-mask";
import { provideToastr } from "ngx-toastr";
import { routes } from "./app.routes";

const maskConfig: Partial<IConfig> = {
  validation: false,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideToastr(), 
    provideEnvironmentNgxMask(maskConfig),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance:'outline', floatLabel:"always"} },
    importProvidersFrom(
    
    ),
  ],
};
