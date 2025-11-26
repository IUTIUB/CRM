import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDatosFormComponent } from './client-datos-form.component';

describe('ClientDatosFormComponent', () => {
  let component: ClientDatosFormComponent;
  let fixture: ComponentFixture<ClientDatosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDatosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDatosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
