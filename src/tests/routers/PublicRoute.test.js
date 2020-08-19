import React from "react";

import { mount } from "enzyme";
import { PublicRoute } from "../../routers/PublicRoute";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en <PublicRoute />", () => {
  const props = {
    location: {
      pathname: "/marvel",
    },
  };

  Storage.prototype.setItem = jest.fn();

  let wrapper = mount(
    <MemoryRouter>
      <PublicRoute
        isAuth={true}
        component={() => <span>test</span>}
        {...props}
      />
    </MemoryRouter>
  );

  test("No debe de mostrar el componente si esta autenticado ", () => {
    expect(wrapper.find("span").exists()).toBe(false);
  });
});
