// @ts-check

/**
 * Parses a comma-separated environment variable into a trimmed string array.
 *
 * @param {string | undefined} value The comma-separated environment variable value.
 * @returns {string[] | undefined} The parsed list, or undefined when empty.
 */
const parseCommaSeparatedList = (value) => {
  if (!value) {
    return undefined;
  }

  const items = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length ? items : undefined;
};

/**
 * Parses a comma-separated username whitelist with case normalization.
 *
 * @param {string | undefined} value The comma-separated whitelist value.
 * @returns {string[] | undefined} Lowercased usernames, or undefined when empty.
 */
const parseUsernameWhitelist = (value) => {
  const items = parseCommaSeparatedList(value);
  return items?.map((username) => username.toLowerCase());
};

/**
 * Returns the current username whitelist from the environment.
 *
 * @returns {string[] | undefined} Lowercased usernames, or undefined when unset.
 */
const getWhitelist = () => parseUsernameWhitelist(process.env.WHITELIST);

/**
 * Returns the current gist whitelist from the environment.
 *
 * @returns {string[] | undefined} Gist IDs, or undefined when unset.
 */
const getGistWhitelist = () =>
  parseCommaSeparatedList(process.env.GIST_WHITELIST);

const excludeRepositories =
  parseCommaSeparatedList(process.env.EXCLUDE_REPO) ?? [];

export {
  getWhitelist,
  getGistWhitelist,
  excludeRepositories,
  parseCommaSeparatedList,
  parseUsernameWhitelist,
};
