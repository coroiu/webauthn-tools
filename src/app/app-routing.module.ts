import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'analyze/analysis',
    loadComponent: () =>
      import('./pages/analysis/analyze/analyze.component').then(
        (m) => m.AnalyzeComponent
      ),
  },
  {
    path: 'analyze/data-collection',
    loadComponent: () =>
      import('./pages/analysis/data-collection/data-collection.component').then(
        (m) => m.DataCollectionComponent
      ),
  },
  {
    path: 'prf-demo',
    loadComponent: () =>
      import('./pages/prf-demo/prf-demo.component').then(
        (m) => m.PrfDemoComponent
      ),
  },
  {
    path: 'analyze',
    redirectTo: '/analyze/analysis',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/analyze/analysis',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
