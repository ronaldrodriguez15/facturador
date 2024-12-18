import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailRowComponent } from './product-detail-row.component';

describe('ProductDetailRowComponent', () => {
  let component: ProductDetailRowComponent;
  let fixture: ComponentFixture<ProductDetailRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
