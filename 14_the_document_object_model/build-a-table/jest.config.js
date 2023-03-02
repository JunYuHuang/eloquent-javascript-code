module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  testRegex: "./src/.*\\.(test|spec)?\\.(ts|ts)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/src"],
};
