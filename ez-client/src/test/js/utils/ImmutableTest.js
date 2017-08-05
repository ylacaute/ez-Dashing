import { assert } from 'chai';

describe('ImmutableTest', () => {

  it('Verify immutable behavior on changing an existing state', () => {

    let initialState = {
      'jira#todo': {
        total: 42
      },
      'jira#inProgress': {
        total: 10
      }
    };

    let newJiraTodo = {
      total: 100
    };

    let newState = {
      ...initialState,
      ['jira#todo']: newJiraTodo
    };

    assert.equal(initialState['jira#todo'].total, 42);
    assert.equal(initialState['jira#inProgress'].total, 10);
    assert.equal(newState['jira#todo'].total, 100);
    assert.equal(newState['jira#inProgress'].total, 10);

    assert.equal(initialState.jenkins, newState.jenkins);
    assert.notEqual(initialState, newState);
    assert.notEqual(initialState['jira#todo'], newState['jira#todo']);
  });


  it('Verify immutable behavior on changing an non existing state', () => {

    let initialState = {
      jenkins: {
        inProgress: {
          total: 10
        }
      }
    };

    let newJira = {
      todo: {
        total: 100
      }
    };

    let newState = {
      ...initialState,
      ['jira']: newJira
    };

    assert.equal(initialState.jira, null);
    assert.equal(initialState.jenkins.inProgress.total, 10);
    assert.equal(newState.jira.todo.total, 100);
    assert.equal(newState.jenkins.inProgress.total, 10);

    assert.equal(initialState.jenkins, newState.jenkins);

  });


  it('Verify immutable behavior on changing an totaly empty existing state', () => {

    let initialState = {};

    let newJira = {
      todo: {
        total: 100
      }
    };

    let newState = {
      ...initialState,
      ['jira']: newJira
    };

    assert.equal(initialState.jira, null);
    assert.equal(newState.jira.todo.total, 100);
  });

});
