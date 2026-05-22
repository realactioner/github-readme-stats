import { afterEach, describe, expect, it, jest } from "@jest/globals";

describe("envs whitelist", () => {
  afterEach(() => {
    delete process.env.WHITELIST;
    delete process.env.GIST_WHITELIST;
    delete process.env.EXCLUDE_REPO;
    jest.resetModules();
  });

  it("parses WHITELIST with trimming and lowercasing", async () => {
    process.env.WHITELIST = "Alice, bob , Charlie";
    const { getWhitelist } = await import("../src/common/envs.js");
    expect(getWhitelist()).toEqual(["alice", "bob", "charlie"]);
  });
});
