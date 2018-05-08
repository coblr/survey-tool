import * as actions from './TempQuestions';

describe('Temp Questions Helper', () => {
  const mockTempId = JSON.stringify(new Date()).replace(/"/g, '');

  describe('generateTempId Method', () => {
    it('generates a time-stamp based ID for temporary questions', () => {
      const regex = /^[\d]{4}(-[\d]{2}){2}T([\d]{2}:){2}[\d]{2}.[\d]{3}Z$/;
      expect(regex.test(actions.generateTempId())).toBeTruthy();
    });
  });

  describe('getRealQuestions Method', () => {
    it('can get all the real questions from a list of questions', () => {
      const collection = ['123', mockTempId, '234'];
      const realQuestions = actions.getRealQuestions(collection);
      expect(realQuestions).toEqual(['123', '234']);
    });

    it('can get all the real questions out of a single page', () => {
      const page = {
        questions: ['123', mockTempId, '234']
      };
      const realQuestions = actions.getRealQuestions(page);
      expect(realQuestions).toEqual(['123', '234']);
    });

    it('can get all the real questions from a list of pages', () => {
      const pages = [
        {
          questions: [mockTempId, '1-234', '1-345']
        },
        {
          questions: ['2-123', mockTempId, '2-345']
        },
        {
          questions: ['3-123', '3-234', mockTempId]
        }
      ];
      const realQuestions = actions.getRealQuestions(pages);
      expect(realQuestions).toEqual([
        '1-234',
        '1-345',
        '2-123',
        '2-345',
        '3-123',
        '3-234'
      ]);
    });
  });

  describe('isTempQuestion Method', () => {
    it('returns false if question is not a temp question', () => {
      expect(actions.isTempQuestion('123')).toBe(false);
    });

    it('returns true if question is a temp question', () => {
      expect(actions.isTempQuestion(mockTempId)).toBe(true);
    });

    it('handles being passed a full question object', () => {
      expect(actions.isTempQuestion({ id: '123' })).toBe(false);
      expect(actions.isTempQuestion({ id: mockTempId })).toBe(true);
    });
  });
});
