const { authReducer } = require("../../auth/authReducer");
const { types } = require("../../types");

describe("Pruebas en authReducer.js", () => {
  test("Debe de retornar un estado por defecto", () => {
    const initialState = { logged: false };
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("Debe de autenticar correctamente", () => {
    const initialState = { logged: false };
    const action = {
      type: types.login,
      payload: {
        name: "daniel",
      },
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual({
      logged: true,
      name: "daniel",
    });
  });

  test("Debe de hacer logut correctamente", () => {
    const initialState = { logged: true, name: "daniel" };

    const action = {
      type: types.logout,
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual({
      logged: false,
    });
  });
});
