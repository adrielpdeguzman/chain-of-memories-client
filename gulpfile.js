const elixir = require('laravel-elixir');

elixir((mix) => {
  mix.styles([
    './node_modules/font-awesome/css/font-awesome.min.css',
    './node_modules/normalize.css/normalize.css',
  ], './static/css/vendors.css')
  .copy('node_modules/font-awesome/fonts', 'static/fonts');
});
