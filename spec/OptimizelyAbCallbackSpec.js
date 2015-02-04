describe("OptimizelyAbCallback", function() {
  beforeEach(function() {
    window.OptimizelyAbCallback.initialized = false;
    window.OptimizelyAbCallback.experiments = {};
    window._optiab = undefined;
  });

  it("includeABScript", function() {
    window.OptimizelyAbCallback.includeABScript('123');
    var el = document.querySelector('script[src*="cdn.optimizely.com/js/123.js"]');
    expect(el).not.toBe(null);
    expect(el.async).toBe(true);
  });

  it("When _optiab exists", function(done){
    var shouldRetunVariationSlug = function(variation) {
      expect(document.documentElement.classList).toContain('ab-123456-variation-1');
      expect(variation).toBe('variation-1');
      done();
    };
    window._optiab = [['123456', shouldRetunVariationSlug]];
    window.optimizely = {
      data:{
        state: {
          activeExperiments: ['123456'],
          variationNamesMap: {
            '123456': 'Variation 1'
          }
        }
      }
    };
    window.OptimizelyAbCallback.init();
  });

  it("When _optiab doesn't exist", function(done){
    var shouldRetunVariationSlug = function(variation) {
      expect(document.documentElement.classList).toContain('ab-654321-variation-2');
      expect(variation).toBe('variation-2');
      done();
    };
    window.optimizely = {
      data:{
        state: {
          activeExperiments: ['654321'],
          variationNamesMap: {
            '654321': 'Variation 2'
          }
        }
      }
    };
    window.OptimizelyAbCallback.init();
    window._optiab.push(['654321', shouldRetunVariationSlug]);
  });

  it("When experiment disabled _optiab after init", function(done){
    var shouldRetunVariationSlug = function(variation) {
      expect(document.documentElement.classList).toContain('ab-654321-original');
      expect(variation).toBe('original');
      done();
    };
    window.optimizely = {
      data:{
        state: {
          activeExperiments: [],
          variationNamesMap: {}
        }
      }
    };
    window.OptimizelyAbCallback.init();
    window._optiab.push(['654321', shouldRetunVariationSlug]);
  });

  it("When experiment disabled _optiab before init", function(done){
    var shouldRetunVariationSlug = function(variation) {
      expect(document.documentElement.classList).toContain('ab-123456-original');
      expect(variation).toBe('original');
      done();
    };
    window.optimizely = {
      data:{
        state: {
          activeExperiments: [],
          variationNamesMap: {}
        }
      }
    };
    window._optiab = window._optiab || [];
    window._optiab.push(['123456', shouldRetunVariationSlug]);
    window.OptimizelyAbCallback.init();
  });
});
