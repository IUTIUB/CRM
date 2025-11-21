import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIncidenciaListComponent } from './admin-incidencia-list.component';

describe('AdminIncidenciaListComponent', () => {
  let component: AdminIncidenciaListComponent;
  let fixture: ComponentFixture<AdminIncidenciaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminIncidenciaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminIncidenciaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
