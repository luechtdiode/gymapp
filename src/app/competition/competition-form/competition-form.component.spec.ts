import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectionChangedEvent } from '../../shared/util';
import { CompSponsorAction, Competition, Action } from '../../model/backend-typings';
import { CompetitionFormComponent } from './competition-form.component';
import { CompetitionFormModel } from './competition-form.model';
import { SplitCurrency } from '../../shared/split-currency.pipe';

describe('CompetitionFormComponent', () => {
  let comp: CompetitionFormComponent;
  let fixture: ComponentFixture<CompetitionFormComponent>;
  const compSponsorActionStub = <CompSponsorAction>{
      action: {
        name: 'testaction',
        _id: {},
      },
      costperaction: 10.00,
      maxcnt: 100,
    };

  const selectionChangedEventStub = {
      selected: true,
      origin: compSponsorActionStub,
    };

  const fb = new FormBuilder();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionFormComponent, SplitCurrency ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FormBuilder, useValue: fb },
      ],
    });
    fixture = TestBed.createComponent(CompetitionFormComponent);
    comp = fixture.componentInstance;
    comp.form = fb.group(CompetitionFormModel);
    comp.regactions = [
        <CompSponsorAction>{
          action: <Action>{
            _id: 'testaction',
            name: 'testaction',
          },
          costperaction: 10.00,
          maxcnt: 100,
        },
      ];
    comp.competition = <Competition>{
      name: 'testcompetition',
      dates: [],
      sponsoractions: [
        <CompSponsorAction>{
          action: <Action>{
            _id: 'testaction',
            name: 'testaction',
          },
          costperaction: 10.00,
          maxcnt: 100,
        },
      ],
    };
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  describe('replaceOrAddAction', () => {
    it('makes expected calls', () => {
      spyOn(comp, 'areActionIdsEqual');
      spyOn(comp, 'sortActions');
      spyOn(comp, 'recalculateBudget');
      comp.replaceOrAddAction(this.compSponsorActionStub);
      expect(comp.areActionIdsEqual).toHaveBeenCalled();
      expect(comp.sortActions).toHaveBeenCalled();
      expect(comp.recalculateBudget).toHaveBeenCalled();
    });
  });

  describe('updateAction', () => {
    it('makes expected calls', () => {
      spyOn(comp, 'areActionIdsEqual');
      spyOn(comp, 'recalculateBudget');
      comp.updateAction(this.compSponsorActionStub);
      expect(comp.areActionIdsEqual).toHaveBeenCalled();
      expect(comp.recalculateBudget).toHaveBeenCalled();
    });
  });

  describe('removeAction', () => {
    it('makes expected calls', () => {
      spyOn(comp, 'areActionIdsEqual');
      spyOn(comp, 'recalculateBudget');
      comp.removeAction(this.compSponsorActionStub);
      expect(comp.areActionIdsEqual).toHaveBeenCalled();
      expect(comp.recalculateBudget).toHaveBeenCalled();
    });
  });

  describe('isActionSelected', () => {
    it('makes expected calls', () => {
      spyOn(comp, 'areActionIdsEqual');
      const action = Object.assign({
        selected: false,
      }, this.compSponsorActionStub);
      comp.isActionSelected(action);
      expect(comp.areActionIdsEqual).toHaveBeenCalled();
    });
  });

  describe('onCompSponsorActionChaned', () => {
    it('makes expected calls', () => {
      spyOn(comp, 'updateAction');
      spyOn(comp, 'updateFormGroupActions');
      const action = Object.assign({
        selected: false,
      }, this.compSponsorActionStub);
      comp.onCompSponsorActionChaned(action);
      expect(comp.updateAction).toHaveBeenCalled();
      expect(comp.updateFormGroupActions).toHaveBeenCalled();
    });
  });

  describe('onCompSponsorActionSelected removed', () => {
    it('makes expected calls', () => {
      spyOn(comp, 'replaceOrAddAction');
      spyOn(comp, 'removeAction');
      spyOn(comp, 'updateFormGroupActions');
      comp.onCompSponsorActionSelected({
         selected: false,
         origin: compSponsorActionStub,
      });
      expect(comp.removeAction).toHaveBeenCalled();
      expect(comp.updateFormGroupActions).toHaveBeenCalled();
    });
  });

  describe('onCompSponsorActionSelected added', () => {
    it('makes expected calls', () => {
      spyOn(comp, 'replaceOrAddAction');
      spyOn(comp, 'removeAction');
      spyOn(comp, 'updateFormGroupActions');
      comp.onCompSponsorActionSelected({
         selected: true,
         origin: compSponsorActionStub,
      });
      expect(comp.replaceOrAddAction).toHaveBeenCalled();
      expect(comp.updateFormGroupActions).toHaveBeenCalled();
    });
  });

  describe('syncCompSponsorActions', () => {
    it('makes expected calls', () => {
      spyOn(comp, 'replaceOrAddAction');
      spyOn(comp, 'sortActions');
      comp.syncCompSponsorActions();
      expect(comp.replaceOrAddAction).toHaveBeenCalled();
      expect(comp.sortActions).toHaveBeenCalled();
    });
  });

  describe('updateFormGroupActions', () => {
    it('makes expected calls', () => {
      const formBuilderStub = fixture.debugElement.injector.get(FormBuilder);
      spyOn(formBuilderStub, 'group').and.callThrough();
      comp.updateFormGroupActions();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

});
