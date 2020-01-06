
describe("ImmutableTest", () => {

  it("Verify immutable behavior on changing an existing state", () => {

    let initialState = {
      "jira#todo": {
        total: 42
      },
      "jira#inProgress": {
        total: 10
      }
    };

    let newJiraTodo = {
      total: 100
    };

    let newState = {
      ...initialState,
      ["jira#todo"]: newJiraTodo
    };

    expect(initialState["jira#todo"].total).toStrictEqual(42);
    expect(initialState["jira#inProgress"].total).toStrictEqual(10);
    expect(newState["jira#todo"].total).toStrictEqual(100);
    expect(newState["jira#inProgress"].total).toStrictEqual(10);

    expect(initialState.jenkins).toStrictEqual(newState.jenkins);
    expect(initialState).not.toStrictEqual(newState);
    expect(initialState["jira#todo"]).not.toStrictEqual(newState["jira#todo"]);
  });


  it("Verify immutable behavior on changing an non existing state", () => {

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
      ["jira"]: newJira
    };

    expect(initialState.jira).toStrictEqual(undefined);
    expect(initialState.jenkins.inProgress.total).toStrictEqual(10);
    expect(newState.jira.todo.total).toStrictEqual(100);
    expect(newState.jenkins.inProgress.total).toStrictEqual(10);
    expect(initialState.jenkins).toStrictEqual(newState.jenkins);
  });


  it("Verify immutable behavior on changing an totally empty existing state", () => {

    let initialState = {};

    let newJira = {
      todo: {
        total: 100
      }
    };

    let newState = {
      ...initialState,
      ["jira"]: newJira
    };

    expect(initialState.jira).toStrictEqual(undefined);
    expect(newState.jira.todo.total).toStrictEqual(100);
  });

});
