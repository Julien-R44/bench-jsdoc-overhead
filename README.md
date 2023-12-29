# bench-jsdoc-overhead

This repo was created in order to see if adding JSDoc to a project could have an overhead on the loading time of an application in NodeJS.

So far, it seems that the overhead is not significant at all.

The benchmark is done the following way:

- Generate two files with 5000 methods each, one with JSDoc, one without ( see [generated files](./generated/) )
- Just import the files in a NodeJS script and compare with hyperfine :

```sh
hyperfine --warmup 10 --style color "node benchmarks/load_js_doc.js" "node benchmarks/load_without_js_doc.js"
```

Using 5000 methods, we get the following results:

```sh
Benchmark 1: node benchmarks/load_js_doc.js
  Time (mean ± σ):      50.3 ms ±   1.4 ms    [User: 37.6 ms, System: 28.9 ms]
  Range (min … max):    48.9 ms …  59.1 ms    57 runs
  
Benchmark 2: node benchmarks/load_without_js_doc.js
  Time (mean ± σ):      48.1 ms ±   3.2 ms    [User: 37.4 ms, System: 25.1 ms]
  Range (min … max):    45.8 ms …  66.2 ms    59 runs
  
Summary
  node benchmarks/load_without_js_doc.js ran
    1.05 ± 0.08 times faster than node benchmarks/load_js_doc.js
```

Results indicate a mostly negligible difference in load times between files with and without JSDoc comments.
