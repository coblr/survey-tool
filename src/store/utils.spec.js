import { fromJS } from 'immutable';

import * as utils from './utils';

describe('Redux Store Utility Functions', () => {
  describe('setRequestFlag Method', () => {
    it('sets the request flag', () => {
      const state = fromJS({
        reqFlagField: {}
      });
      const flagProp = 'reqFlagField';
      const id = '123';
      const result = utils.setRequestFlag(state, flagProp, id);
      expect(result).toEqual(
        fromJS({
          reqFlagField: { '123': true }
        })
      );
    });
  });

  describe('createErrorMap', () => {
    it('turns an error payload object into an error for the UI', () => {
      const payload = {
        status: 409,
        response: {
          errorCode: 1,
          fieldName: 'testField',
          errorMessage: 'There was a problem'
        }
      };
      const errorMap = utils.createErrorMap(payload);
      expect(errorMap).toEqual({
        status: 409,
        code: 1,
        field: 'testField',
        message: 'There was a problem'
      });
    });

    it('turns a 404 error payload object into an error for the UI', () => {
      const payload = {
        name: 'ApiError',
        status: 404,
        statusText: 'Not Found',
        message: '404 - Not Found'
      };
      const errorMap = utils.createErrorMap(payload);
      expect(errorMap).toEqual({
        status: 404,
        message: '404 - Not Found'
      });
    });
  });

  describe('buildQueryString Method', () => {
    it('turns a param object into a query string', () => {
      const params = {
        param1: '123',
        param2: 'abc'
      };
      const query = utils.buildQueryString(params);
      expect(query).toBe('?param1=123&param2=abc');
    });

    it('accepts booleans and zeros as param values', () => {
      const params = {
        param1: true,
        param2: false,
        param3: 0
      };
      const query = utils.buildQueryString(params);
      expect(query).toBe('?param1=true&param2=false&param3=0');
    });

    it('ignores undefined and null values', () => {
      const params = {
        param1: 123,
        param2: null,
        param3: 'abc',
        param4: undefined
      };
      const query = utils.buildQueryString(params);
      expect(query).toBe('?param1=123&param3=abc');
    });
  });
});
