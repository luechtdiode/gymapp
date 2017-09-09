import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, KeyValueDiffers } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { SelectionChangedEvent } from '../../shared/util';
import { Competition, CompSponsorAction } from '../../model/backend-typings';
import { RouterPath } from '../../router-path';
import { CompetitionActionModel } from './competition-action-form.model';

@Component({
  selector: 'gymapp-competition-action-form',
  templateUrl: './competition-action-form.component.html',
  styleUrls: ['./competition-action-form.component.scss'],
})
export class CompetitionActionFormComponent implements OnInit, OnChanges {

  // https://juristr.com/blog/2016/04/angular2-change-detection/
  // private differ: any;

  @Input()
  action: CompSponsorAction;


  @Input()
  isSelected: boolean;

  form: FormGroup;

  @Output()
  toggleSelected = new EventEmitter<SelectionChangedEvent<CompSponsorAction>>();

  @Output()
  actionChanged = new EventEmitter<CompSponsorAction>();

  onToggleSelected() {
    this.isSelected = !this.isSelected;
    this.toggleSelected.emit({origin: this.action, selected: this.isSelected});
  }

  constructor(private fb: FormBuilder,
              private differs: KeyValueDiffers) {
    // this.differ = differs.find({}).create(null);
    this.form = this.fb.group(CompetitionActionModel);
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(this.actionChanged);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.form) {
      if (changes['action']) {
        this.form.patchValue(changes['action'].currentValue);
      }
    }
  }

}
