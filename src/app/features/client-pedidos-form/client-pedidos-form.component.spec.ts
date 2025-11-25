import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPedidosFormComponent } from './client-pedidos-form.component';

describe('ClientPedidosFormComponent', () => {
  let component: ClientPedidosFormComponent;
  let fixture: ComponentFixture<ClientPedidosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPedidosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPedidosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
