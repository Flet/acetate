# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

[Upcoming Changes](https://github.com/patrickarlt/acetate/compare/v0.3.1...master)

## [0.3.1] - 2015-06-30

### Fixed

* Built-in server now properly supports URLs without trailing slashes.

## [0.3.0] - 2015-06-21

### Changed

* Built-in server is now based on [BrowserSync](http://browsersync.io) and has built in live reload support.
* Built in server no longer needs to wait for the entire site to be built. It now builds and serves pages as requested.
* `server` and `watcher` options are deprecated. Now pass the `mode` option with a value of `'server'` `'watch'` or `'build'`.
* `findPort` option is deprecated. A port is always found by default now.

### Fixed

* Watching for changes to the configuration file should now work as expected.
* Tests now pass on Windows and are run with the AppVeyor CI.

### Removed

* Support for 404 pages. This was a feature that was lost with the move to BrowserSync. It may be added back in the future.

## [0.2.2] - 2015-05-13

### Fixed

* Fixed a bug where `{{relativePath}}` would not produce the correct path in some cases.

## [0.2.1] - 2015-05-01

### Added
* Lots of new tests. Test coverage should now be fairly high with only a few remaining edge cases
* New `watcher:ready` event when the watcher starts watching files
* New `watcher:start` event when the watcher starts
* New `watcher:stop` event when the watcher stops
* New `page:build` method for listneing to when and individual page finished building
* New `page:clean` method for when a pages built output is deleted

### Changed
* Improvements to `travis.yml`, readme and contributing guide.
* Updated depenedancies
* Simplified framework for running tests and gathering coverage information
* `page.clean()` will no longer clear the directory if it is empty
* Previously `acetate.query(name, glob, builder)` and `acetate.transform(glob, transformer)` only accepted globs like `'**/*'` to filter there input. They can now accept functions like `function (page) { return page.transformMe; }` or simple objects `{ transformMe: true }` to filter pages before running the query or transform

### Fixed
* It is not possable to run Acetate without a configuration file. Previously this worked but reported an error.
* Edge cases with building pretty URLs for non HTML files have been fixed
* Sever will now properly use a `404.html` page if it is present in your `src` folder.
* The `url` property on the root page is now properly `/`

## [0.2.0] - 2015-04-25

### Changed
- Large refactor to move to a factory based API and use composition to improve code clarity
- `acetate.args` will no longer include Acetate command line arguments
- The `options`, `args` `src`, `dest`, `root`, and `config` properties are now frozen and cannot be updated.
- Update dependencies

### Added
- Additional CLI doc
- Pages now have more public properties including `metadata` which is a read only copy of the metadata found in the file and `dirty` with will tell you if a page has changed since it was last built.

### Removed
- Remove the `clean` option since it was buggy and did not operate how most people expect.
-
## [0.1.0] - 2015-04-17

### Added
- tests for error handling
- tests for edge cases in templating
- tests for data loading
- added release automation
- added changelog

### Changed
- **BREAKING** `acetate.src` and `acetate.dest` are removed. Pass them as options or with the `-i` or `-o` flags on the command line
- refactored error handling and logging to be more compact
- refactored page loading to be simpler
- move runner and CLI to event based system

## 0.0.27 - 2015-04-13

### Added
- Unit testing
- Continuous integration

[0.1.0]: https://github.com/patrickarlt/acetate/compare/db93ca4703148fe1a962a8cc3ecca63ba19d08ed...v0.1.0
[0.2.0]: https://github.com/patrickarlt/acetate/compare/v0.1.0...v0.2.0
[0.2.1]: https://github.com/patrickarlt/acetate/compare/v0.2.0...v0.2.1
[0.2.2]: https://github.com/patrickarlt/acetate/compare/v0.2.1...v0.2.2
[0.3.0]: https://github.com/patrickarlt/acetate/compare/v0.2.2...v0.3.0
[0.3.1]: https://github.com/patrickarlt/acetate/compare/v0.3.0...v0.3.1
