import {Competition, Club} from './backend-typings';

export class TestDataGenerator {
    static generateCompetitions(): Competition[] {
        const competitions: Competition[] = [];
        const club: Club = {
          _id: '1',
          name: 'Testclub',
          kind: [''],
        } as Club;
        competitions.push(TestDataGenerator.createCompetition('1', 'Test Competition 1', '4057 Basel', 'KuTu', club));
        competitions.push(TestDataGenerator.createCompetition('2', 'Test Competition 2', '4057 Basel', 'GeTu', club));
        competitions.push(TestDataGenerator.createCompetition('3', 'Test Competition 3', '4057 Basel', 'KiTu', club));
        return competitions;
    }
    static createCompetition(id: string, name: string, location: string, kind: string, club: Club): Competition {
        const competition: Competition = {
            _id: id,
            name: name,
            clubid: club,
            location: location,
            kind: kind,
            dates: [new Date()],
        } as Competition;

        return competition;
    }

}
