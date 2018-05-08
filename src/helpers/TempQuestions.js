import _ from 'lodash';

export const generateTempId = () => {
  return JSON.stringify(new Date()).replace(/"/g, '');
};

export const getRealQuestions = collection => {
  let real = [];

  // collection is a list of questions
  if (_.isArray(collection) && typeof collection[0] === 'string') {
    real = collection;
  }

  // collection is a single page
  if (collection.questions) {
    real = collection.questions;
  }

  // collection an array of pages
  if (
    _.isArray(collection) &&
    collection[0] &&
    collection[0].questions
  ) {
    collection.forEach(page => {
      real = real.concat(page.questions);
    });
  }

  return real.filter(q => q.indexOf(':') < 0);
};

export const isTempQuestion = predicate => {
  predicate = predicate.id || predicate;
  return predicate.indexOf(':') > 0;
};
