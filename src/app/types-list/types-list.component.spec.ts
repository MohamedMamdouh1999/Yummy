import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesListComponent } from './types-list.component';

describe('TypesListComponent', () => {
  let component: TypesListComponent;
  let fixture: ComponentFixture<TypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
