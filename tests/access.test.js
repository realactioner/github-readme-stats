import { afterEach, describe, expect, it, jest } from "@jest/globals";

describe("guardAccess whitelist", () => {
  afterEach(() => {
    delete process.env.WHITELIST;
    jest.resetModules();
  });

  it("blocks all usernames when WHITELIST is unset", async () => {
    const { guardAccess } = await import("../src/common/access.js");
    const res = { send: jest.fn() };

    const access = guardAccess({
      res,
      id: "anyuser",
      type: "username",
      colors: {},
    });

    expect(access.isPassed).toBe(false);
    expect(res.send).toHaveBeenCalled();
  });

  it("blocks usernames that are not whitelisted", async () => {
    process.env.WHITELIST = "alloweduser";
    const { guardAccess } = await import("../src/common/access.js");
    const res = { send: jest.fn() };

    const access = guardAccess({
      res,
      id: "blockeduser",
      type: "username",
      colors: {},
    });

    expect(access.isPassed).toBe(false);
    expect(res.send).toHaveBeenCalled();
  });

  it("allows whitelisted usernames regardless of case", async () => {
    process.env.WHITELIST = "AllowedUser";
    const { guardAccess } = await import("../src/common/access.js");
    const res = { send: jest.fn() };

    const access = guardAccess({
      res,
      id: "alloweduser",
      type: "username",
      colors: {},
    });

    expect(access.isPassed).toBe(true);
    expect(res.send).not.toHaveBeenCalled();
  });
});
