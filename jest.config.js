module.exports = {
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/config/CSSStub.js",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/config/fileMock.js",
  },
};
