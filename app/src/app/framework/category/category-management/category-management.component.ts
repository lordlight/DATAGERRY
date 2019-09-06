/*
* DATAGERRY - OpenSource Enterprise CMDB
* Copyright (C) 2019 NETHINKS GmbH
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.

* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { Component, OnInit } from '@angular/core';
import { CmdbCategory } from '../../models/cmdb-category';
import { CategoryService } from '../../services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeService } from '../../services/type.service';
import { CmdbType } from '../../models/cmdb-type';
import { ToastService } from '../../../layout/services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../../layout/helpers/modal/modal.component';

@Component({
  selector: 'cmdb-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {

  public categoryList: CmdbCategory[];
  public typeList: CmdbType[];
  public categoryAddForm: FormGroup;
  public categoryEditForm: FormGroup;
  public selectedEditCategory: CmdbCategory;

  constructor(private categoryService: CategoryService, private typeService: TypeService,
              private toast: ToastService, private modalService: NgbModal) {
    this.categoryAddForm = new FormGroup({
      name: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      parent_id: new FormControl(null),
      type_list: new FormControl(null)
    });

    this.categoryEditForm = new FormGroup({
      public_id: new FormControl(null),
      name: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      parent_id: new FormControl(null),
      type_list: new FormControl(null)
    });

  }

  public ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe((list: CmdbCategory[]) => {
      this.categoryList = list;
    });
    this.typeService.getTypeList().subscribe((typeList: CmdbType[]) => {
      this.typeList = typeList;
    });

    this.categoryAddForm.get('label').valueChanges.subscribe(value => {
      this.categoryAddForm.get('name').setValue(value.replace(/ /g, '-').toLowerCase());
      this.categoryAddForm.get('name').markAsDirty({onlySelf: true});
      this.categoryAddForm.get('name').markAsTouched({onlySelf: true});
    });
  }

  public addCategory(): void {
    const tmpCategory: CmdbCategory = new CmdbCategory();
    tmpCategory.name = this.categoryAddForm.get('name').value;
    tmpCategory.label = this.categoryAddForm.get('label').value;
    tmpCategory.parent_id = this.categoryAddForm.get('parent_id').value;
    tmpCategory.type_list = this.categoryAddForm.get('type_list').value;

    this.categoryService.postCategory(tmpCategory).subscribe(resp => {
        tmpCategory.public_id = +resp;
      }, (error) => {
        console.error(error);
      },
      () => {
        this.categoryService.getCategoryList().subscribe((list: CmdbCategory[]) => {
          this.categoryList = list;
        });
      });
    this.categoryAddForm.reset();
  }

  public selectCategory(publicID: number): void {
    this.categoryEditForm.reset();
    this.selectedEditCategory = this.categoryList.find(category => category.public_id === publicID);
    this.categoryEditForm.patchValue(this.selectedEditCategory);
  }

  public editCategory(): void {
    this.categoryService.updateCategory(this.categoryEditForm.value).subscribe((resp: number) => {
      if (resp > 0) {
        this.toast.show('Category was updated');
      }
    }, (error) => {
      console.error(error);
    }, () => {
      this.categoryService.getCategoryList().subscribe((list: CmdbCategory[]) => {
        this.categoryList = list;
      });
    });
  }

  public deleteCategory(publicID: number): void {
    const deleteModal = this.modalService.open(ModalComponent);
    deleteModal.componentInstance.title = 'Delete Category # ' + publicID;
    deleteModal.componentInstance.modalMessage = 'Are you sure you want to delete this Category?';
    deleteModal.componentInstance.buttonDeny = 'Cancel';
    deleteModal.componentInstance.buttonAccept = 'Delete';
    deleteModal.result.then((result) => {
      if (result) {
        this.categoryService.deleteCategory(publicID).subscribe((confirm) => {
          if (confirm === true) {
            this.categoryService.getCategoryList().subscribe((list: CmdbCategory[]) => {
              this.categoryList = list;
            });
          }
        });
      }
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }
}
