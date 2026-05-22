/** Comma-separated usernames used by API tests. */
export const TEST_WHITELIST = "anuraghazra,renovate-bot";

/**
 * Applies the default test whitelist. Call from `beforeEach` in API route tests.
 */
export const applyTestWhitelist = () => {
  process.env.WHITELIST = TEST_WHITELIST;
};
