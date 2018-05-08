import { fromJS } from 'immutable';

import reducer, * as PageLogicActions from './PageLogic';
import * as SurveyActions from '../api/Survey';
import * as PageActions from '../api/SurveyPage';

const actions = Object.assign(
  {},
  PageLogicActions,
  SurveyActions,
  PageActions
);

describe('PageLogic Module', () => {
  describe('Showing & Hiding Editors', () => {
    it('sets a flag to show the editor for a page', () => {
      const state = fromJS({
        isEditing: {}
      });
      const action = actions.openEditor('p123');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          isEditing: {
            p123: true
          }
        })
      );
    });

    it('removes the flag to hide the editor for a page', () => {
      const state = fromJS({
        isEditing: {
          p123: true
        }
      });
      const action = actions.closeEditor('p123');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          isEditing: {}
        })
      );
    });
  });

  describe('Creating & Resetting Logic', () => {
    it('creates an object for page logic and puts into edit mode', () => {
      const state = fromJS({
        isEditing: {},
        pageLogic: {}
      });
      const action = actions.createPageLogic('p123');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          isEditing: {
            p123: true
          },
          pageLogic: {
            p123: {}
          }
        })
      );
    });

    it('creates page logic with a payload to prepopulate', () => {
      const state = fromJS({
        isEditing: {},
        pageLogic: {}
      });
      const action = actions.createPageLogic('p123', {
        defaultPage: 'page123',
        branchStatements: [
          {
            destinationPageId: 'page111',
            conditions: [
              {
                questionId: 'q111',
                answerId: 'a222'
              }
            ]
          }
        ]
      });
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          isEditing: {
            p123: true
          },
          pageLogic: {
            p123: {
              defaultPage: 'page123',
              branchStatements: [
                {
                  destinationPageId: 'page111',
                  conditions: [
                    {
                      questionId: 'q111',
                      answerId: 'a222'
                    }
                  ]
                }
              ]
            }
          }
        })
      );
    });

    it('resets page logic by removing from this state', () => {
      const state = fromJS({
        isEditing: { p123: true },
        pageLogic: {
          p123: {}
        }
      });
      const action = actions.resetPageLogic('p123');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          isEditing: {},
          pageLogic: {}
        })
      );
    });
  });

  describe('Setting Default Page', () => {
    it('sets the default page to a provided page ID', () => {
      const state = fromJS({
        pageLogic: {
          p123: {}
        }
      });
      const action = actions.setDefaultPage('p123', 'p234');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          pageLogic: {
            p123: {
              defaultPage: 'p234'
            }
          }
        })
      );
    });
  });

  describe('Creating, Updating and Deleting Branches', () => {
    it('creates a new branch of page logic with an empty condition', () => {
      const state = fromJS({
        pageLogic: {
          p123: {}
        }
      });
      const action = actions.createBranch('p123');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          pageLogic: {
            p123: {
              branchStatements: [
                {
                  destinationPageId: '',
                  conditions: [
                    {
                      questionId: '',
                      answerId: '',
                      selected: true
                    }
                  ]
                }
              ]
            }
          }
        })
      );
    });

    it('updates a property of a page logic branch', () => {
      const state = fromJS({
        pageLogic: {
          p123: {
            branchStatements: [
              {
                destinationPageId: '',
                conditions: []
              },
              {
                destinationPageId: '',
                conditions: []
              }
            ]
          }
        }
      });
      const action = actions.updateBranch(
        'p123',
        0,
        'destinationPageId',
        'destPage1'
      );
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          pageLogic: {
            p123: {
              branchStatements: [
                {
                  destinationPageId: 'destPage1',
                  conditions: []
                },
                {
                  destinationPageId: '',
                  conditions: []
                }
              ]
            }
          }
        })
      );
    });

    it('deletes a branch of page logic', () => {
      const state = fromJS({
        pageLogic: {
          p123: {
            branchStatements: [
              {
                destinationPageId: 'p234'
              },
              {
                destinationPageId: 'p345'
              }
            ]
          }
        }
      });
      const action = actions.deleteBranch('p123', 1);
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          pageLogic: {
            p123: {
              branchStatements: [
                {
                  destinationPageId: 'p234'
                }
              ]
            }
          }
        })
      );
    });
  });

  describe('Creating, Updating and Deleting Conditions', () => {
    it('creates a condition within a branch', () => {
      const state = fromJS({
        pageLogic: {
          p123: {
            branchStatements: [
              {
                destinationPageId: 'p222',
                conditions: []
              },
              {
                destinationPageId: 'p333',
                conditions: []
              }
            ]
          }
        }
      });
      const action = actions.createCondition('p123', 1);
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          pageLogic: {
            p123: {
              branchStatements: [
                {
                  destinationPageId: 'p222',
                  conditions: []
                },
                {
                  destinationPageId: 'p333',
                  conditions: [
                    {
                      questionId: '',
                      answerId: '',
                      selected: true
                    }
                  ]
                }
              ]
            }
          }
        })
      );
    });

    it('creates conditions with "operator" property when conditions > 1', () => {
      const state = fromJS({
        pageLogic: {
          p123: {
            branchStatements: [
              {
                destinationPageId: 'p123',
                conditions: [
                  {
                    questionId: 'q123',
                    answerId: 'a123',
                    selected: true
                  }
                ]
              }
            ]
          }
        }
      });
      const action = actions.createCondition('p123', 0);
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          pageLogic: {
            p123: {
              branchStatements: [
                {
                  destinationPageId: 'p123',
                  conditions: [
                    {
                      questionId: 'q123',
                      answerId: 'a123',
                      selected: true
                    },
                    {
                      questionId: '',
                      answerId: '',
                      selected: true,
                      operator: 'AND'
                    }
                  ]
                }
              ]
            }
          }
        })
      );
    });

    it('updates a condition within a branch', () => {
      const state = fromJS({
        pageLogic: {
          p123: {
            branchStatements: [
              {
                destinationPageId: 'p222',
                conditions: []
              },
              {
                destinationPageId: 'p333',
                conditions: [
                  {
                    questionId: '',
                    answerId: '',
                    selected: true
                  },
                  {
                    questionId: '',
                    answerId: '',
                    selected: true
                  }
                ]
              }
            ]
          }
        }
      });
      const pageId = 'p123';
      const branchIndex = 1;
      const conditionIndex = 1;
      const propField = 'answerId';
      const value = 'answer1234';
      const action = actions.updateCondition(
        pageId,
        branchIndex,
        conditionIndex,
        propField,
        value
      );
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          pageLogic: {
            p123: {
              branchStatements: [
                {
                  destinationPageId: 'p222',
                  conditions: []
                },
                {
                  destinationPageId: 'p333',
                  conditions: [
                    {
                      questionId: '',
                      answerId: '',
                      selected: true
                    },
                    {
                      questionId: '',
                      answerId: 'answer1234',
                      selected: true
                    }
                  ]
                }
              ]
            }
          }
        })
      );
    });

    it('clears the answerId if we update the questionId', () => {
      const state = fromJS({
        pageLogic: {
          p123: {
            branchStatements: [
              {
                destinationPageId: 'p222',
                conditions: []
              },
              {
                destinationPageId: 'p333',
                conditions: [
                  {
                    questionId: '',
                    answerId: '',
                    selected: true
                  },
                  {
                    questionId: 'question123',
                    answerId: 'answer1234',
                    selected: true
                  }
                ]
              }
            ]
          }
        }
      });
      const pageId = 'p123';
      const branchIndex = 1;
      const conditionIndex = 1;
      const propField = 'questionId';
      const value = 'question234';
      const action = actions.updateCondition(
        pageId,
        branchIndex,
        conditionIndex,
        propField,
        value
      );
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          pageLogic: {
            p123: {
              branchStatements: [
                {
                  destinationPageId: 'p222',
                  conditions: []
                },
                {
                  destinationPageId: 'p333',
                  conditions: [
                    {
                      questionId: '',
                      answerId: '',
                      selected: true
                    },
                    {
                      questionId: 'question234',
                      answerId: '',
                      selected: true
                    }
                  ]
                }
              ]
            }
          }
        })
      );
    });

    it('deletes a condition and removes operator if condition is now first', () => {
      const state = fromJS({
        pageLogic: {
          p123: {
            branchStatements: [
              {
                destinationPageId: 'p234',
                conditions: [
                  {
                    questionId: 'q123',
                    answerId: 'a123',
                    selected: true
                  },
                  {
                    questionId: 'q234',
                    answerId: 'a234',
                    selected: false,
                    operator: 'OR'
                  }
                ]
              }
            ]
          }
        }
      });
      const action = actions.deleteCondition('p123', 0, 0);
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          pageLogic: {
            p123: {
              branchStatements: [
                {
                  destinationPageId: 'p234',
                  conditions: [
                    {
                      questionId: 'q234',
                      answerId: 'a234',
                      selected: false
                    }
                  ]
                }
              ]
            }
          }
        })
      );
    });
  });

  describe('Validating Page Logic', () => {
    it('throws errors when conditions are missing data', () => {
      const state = fromJS({
        pageLogic: {
          p123: {
            branchStatements: [
              {
                destinationPageId: '',
                conditions: [
                  {
                    questionId: 'q111',
                    answerId: '',
                    selected: true
                  },
                  {
                    questionId: '',
                    answerId: 'a222',
                    selected: true,
                    operator: 'AND'
                  }
                ]
              }
            ]
          }
        },
        pageLogicErrors: {}
      });
      const action = actions.validateLogic('p123');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          pageLogic: {
            p123: {
              branchStatements: [
                {
                  destinationPageId: '',
                  conditions: [
                    {
                      questionId: 'q111',
                      answerId: '',
                      selected: true
                    },
                    {
                      questionId: '',
                      answerId: 'a222',
                      selected: true,
                      operator: 'AND'
                    }
                  ]
                }
              ]
            }
          },
          pageLogicErrors: {
            p123: {
              branchStatements: [
                {
                  conditions: [
                    {
                      answerId: 'required'
                    },
                    {
                      questionId: 'required'
                    }
                  ],
                  destinationPageId: 'required'
                }
              ]
            }
          }
        })
      );
    });
  });

  describe('Survey Side Effects', () => {
    it('sets up page logic based on currently existing logic', () => {
      const state = fromJS({
        pageLogic: {}
      });
      const action = {
        type: actions.FETCH_SURVEY_SUCCESS,
        payload: {
          id: '123',
          title: 'survey 123',
          pages: [
            {
              id: 'p123',
              branchLogic: {
                defaultPage: 'p111',
                branchStatements: [
                  {
                    destinationPageId: 'p222',
                    questionId: 'q111',
                    answerId: 'a333'
                  }
                ]
              }
            }
          ]
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          pageLogic: {
            p123: {
              defaultPage: 'p111',
              branchStatements: [
                {
                  destinationPageId: 'p222',
                  questionId: 'q111',
                  answerId: 'a333'
                }
              ]
            }
          }
        })
      );
    });
  });

  describe('Survey Page Side Effects', () => {
    it('removes logic when pages are deleted', () => {
      const state = fromJS({
        pageLogic: {
          p123: {
            defaultPage: 'p123',
            branchStatements: []
          }
        }
      });
      const action = {
        type: actions.DELETE_PAGE_SUCCESS,
        meta: { page: { id: 'p123' } }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          pageLogic: {}
        })
      );
    });

    it('deletes page logic from here when deleted from the page', () => {
      const state = fromJS({
        isEditing: {
          p123: true
        },
        pageLogic: {
          p123: {}
        }
      });
      const action = {
        type: actions.DELETE_LOGIC_SUCCESS,
        meta: { pageId: 'p123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          isEditing: {},
          pageLogic: {}
        })
      );
    });
  });
});
