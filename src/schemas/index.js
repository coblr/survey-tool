import { schema } from 'normalizr';

export const surveySchema = new schema.Entity('surveys');
export const surveyPageSchema = new schema.Entity('surveyPages');
export const surveyQuestionSchema = new schema.Entity(
  'surveyQuestions'
);

surveyPageSchema.define({
  questions: [surveyQuestionSchema]
});

surveySchema.define({
  pages: [surveyPageSchema]
});
