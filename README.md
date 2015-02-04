# OptimizelyAbCallback [![Build Status](https://travis-ci.org/guilhermef/optimizely-ab-callback.svg?branch=master)](https://travis-ci.org/guilhermef/optimizely-ab-callback)

Optimizely with callbacks.

## Installation

Configure your optmizely to run the

    window.OptimizelyAbCallback.init();

on the experiment screen click on "Options" then "Experiment Javascript"

![step-1](/../master/docs/step-1.png?raw=true "step-1")

on the script's popup add:

    window.OptimizelyAbCallback.init();

and then "apply" and "save".

![step-2](/../master/docs/step-2.png?raw=true "step-2")

put the JS file [source](../master/dist/OptimizelyAbCallback.js) ([minified](../master/dist/OptimizelyAbCallback.min.js)) on your page and run:

    window.OptimizelyAbCallback.includeABScript(OptimizelyProjectId);

That will include the optimizely script.
after that just call:

    var experimentCallback = function(variation) {
      console.log(variation);
    };

    window._optiab.push([experimentID, experimentCallback]);


## Contributing

We'll check out your contribution if you:

* Provide a comprehensive suite of tests for your fork.
* Have a clear and documented rationale for your changes.
* Package these up in a pull request.

## License

MIT. See `LICENSE.txt` in this directory.
