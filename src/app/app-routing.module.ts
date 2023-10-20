import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'analysis',
    loadComponent: () =>
      import('./pages/analysis/analysis.component').then(
        (m) => m.AnalysisComponent
      ),
  },
  {
    path: 'data-collection',
    loadComponent: () =>
      import('./pages/data-collection/data-collection.component').then(
        (m) => m.DataCollectionComponent
      ),
  },
  {
    path: '',
    redirectTo: '/analysis',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
