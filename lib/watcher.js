var chokidar = require('chokidar');
var minimatch = require('minimatch');
var path = require('path');
var _ = require('lodash');

function AcetateWatcher (acetate) {
  this.acetate = acetate;
  _.bindAll(this);
}

AcetateWatcher.prototype.start = function(options){
  this.watcher = chokidar.watch(this.acetate._sources, {
    ignoreInitial: true
  });
  this.watcher.on('change', this.changed);
  this.watcher.on('add', this.added);
  this.watcher.on('unlink', this.deleted);
};

AcetateWatcher.prototype.changed = function(filepath){
  filepath = filepath.replace(process.cwd() + path.sep, '');
  this.acetate.log.info('watcher', '%s changed', filepath);
  this._invalidateNunjucksCache(filepath);
  this._removeOldPage(filepath);
  this._loadNewPage(filepath);
};

AcetateWatcher.prototype.deleted = function(filepath){
  filepath = filepath.replace(process.cwd() + path.sep, '');
  this.acetate.log.info('watcher', '%s deleted', filepath);
  this._invalidateNunjucksCache(filepath);
  this._removeOldPage(filepath);
};

AcetateWatcher.prototype.added = function(filepath){
  filepath = filepath.replace(process.cwd() + path.sep, '');
  this.acetate.log.info('watcher', '%s added', filepath);

  this._loadNewPage(filepath);
};

AcetateWatcher.prototype._removeOldPage = function(filepath){
  filepath = filepath.replace(this.acetate.src + path.sep, '');

  var page = _.remove(this.acetate.pages, {src: filepath})[0];

  if(page){
    this.acetate.log.verbose('watcher', 'removing %s', page.dest);
    page._clean();
  }
};

AcetateWatcher.prototype._loadNewPage = function(filepath){
  if(path.basename(filepath)[0] === '_'){
    this.acetate.log.info('watcher', 'layout or partial changed rebuilding all pages');
    _.each(this.acetate.pages, function(page){
        page.__dirty = true;
    });
    this.acetate.build();
  } else {
    this.acetate.loadPage(filepath, _.bind(function(error, page){
      this.acetate.log.info('watcher', 'rebuilding %s', filepath);
      this.acetate.pages.push(page);
      this.acetate.build();
    }, this));
  }
};

AcetateWatcher.prototype._invalidateNunjucksCache = function(filepath){
  var name = filepath.replace(this.acetate.src + path.sep, '').replace(path.extname(filepath), '');
  this.acetate.nunjucks.loaders[0].emit('update', name);
};

AcetateWatcher.prototype.stop = function(){
  this.watcher.close();
};

module.exports = AcetateWatcher;