import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideZard } from '@/shared/core/provider/providezard';
import { VIEW_ACTIVE_REGISTRY, VIEW_COMMAND_MAPPER_REGISTRY, VIEW_REF_MAPPER_REGISTRY, ViewActive } from '@view/base';
import { ViewCommandMapper } from './core/view-config/view.command.mapper';
import { ViewRefMapper } from './core/view-config/view.ref.mapper';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(),
    provideRouter(routes),
    provideZard(),
    { provide: VIEW_COMMAND_MAPPER_REGISTRY, useClass: ViewCommandMapper },
    { provide: VIEW_REF_MAPPER_REGISTRY, useClass: ViewRefMapper },
    { provide: VIEW_ACTIVE_REGISTRY, useClass: ViewActive },
  ]
};
