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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component';
import { CollectionTemplateListComponent } from './collection-template-list/collection-template-list.component';
import { CollectionTemplateAddComponent } from './collection-template-add/collection-template-add.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionAddComponent } from './collection-add/collection-add.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CollectionComponent, CollectionTemplateListComponent, CollectionTemplateAddComponent, CollectionListComponent, CollectionAddComponent],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class CollectionModule { }
