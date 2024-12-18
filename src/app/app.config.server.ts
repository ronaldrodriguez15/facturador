import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes),
    FormsModule,
    CommonModule,
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
