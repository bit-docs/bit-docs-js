@parent bit-docs-js/types
@typedef {bit-docs-process-tags/types/tagBlock} bit-docs-js/types/codeTagBlock CodeTagBlock

@description

For `.js` files, [bit-docs-js] will find all block comments (`/**` until
`*/`), remove leading `*`s and whitespace, and pass
[bit-docs-js/types/codeTagBlock] to [bit-docs-js/process/codeAndComment].

@body

## Use

Like [bit-docs-process-tags/types/tagBlock] but
[bit-docs-js/types/codeTagBlock]s come from [bit-docs/types/fileSource] block
comments when they contain [bit-docs-js/types/codeTag]s:

```js
// my-project/lib/index.js
/**
 * @tag ...
 */
 ```

Source files can have multiple block comments containing [bit-docs-js/types/codeTag]s:

```js
// my-project/lib/helper.js

/**
 * @tag1 ...
 * @tag2 ...
 * ...
 * ...
 */
var codeLine = 'here';

/**
 * @tag4 ...
 */
var moreCode = 'more';
```

[bit-docs-js/process/get_comment] will strip the `*`s and return two
[bit-docs-js/types/codeTagBlock]s:

```js
[
  '@tag1 ...',
  '@tag2 ...',
  '...',
  '...',
]
```

and

```js
// second block
[
  '@tag4 ...'
]
```

These [bit-docs-js/types/codeTagBlock]s will be used by
[bit-docs-js/process/codeAndComment].
