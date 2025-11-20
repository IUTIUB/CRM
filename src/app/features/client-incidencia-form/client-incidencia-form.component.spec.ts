import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIncidenciaFormComponent } from './client-incidencia-form.component';

describe('ClientIncidenciaFormComponent', () => {
  let component: ClientIncidenciaFormComponent;
  let fixture: ComponentFixture<ClientIncidenciaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientIncidenciaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientIncidenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
