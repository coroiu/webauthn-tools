import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'analyze/manual-analysis',
    loadComponent: () =>
      import('./pages/analysis/manual-analysis/manual-analysis.component').then(
        (m) => m.ManualAnalysisComponent
      ),
  },
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
    path: 'security/existence-checker',
    loadComponent: () =>
      import(
        './pages/security/existence-checker/existence-checker.component'
      ).then((m) => m.ExistenceCheckerComponent),
  },
  {
    path: 'analyze',
    redirectTo: '/analyze/data-collection',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/analyze/data-collection',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
