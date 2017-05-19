import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, KeyValueDiffers } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SponsorAction } from '../../model/backend-typings';
import { SponsorActionModel } from './sponsor-action-form.model';
import { SelectionChangedEvent } from '../../shared/util';

@Component({
  selector: 'gymapp-sponsor-action-form',
  templateUrl: './sponsor-action-form.component.html',
  styleUrls: ['./sponsor-action-form.component.scss'],
})
export class SponsorActionFormComponent implements OnInit, OnChanges {

  // https://juristr.com/blog/2016/04/angular2-change-detection/
  private differ: any;

  @Input()
  action: SponsorAction;


  @Input()
  isSelected: boolean;

  form: FormGroup;

  @Output()
  toggleSelected = new EventEmitter<SelectionChangedEvent<SponsorAction>>();

  @Output()
  actionChanged = new EventEmitter<SponsorAction>();

  onToggleSelected() {
    this.isSelected = !this.isSelected;
    this.toggleSelected.emit({origin: this.action, selected: this.isSelected});
  }

  constructor(private fb: FormBuilder,
              private differs: KeyValueDiffers) {
    this.differ = differs.find({}).create(null);
    this.form = this.fb.group(SponsorActionModel);
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
