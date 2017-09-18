@parent bit-docs-js/types/codeTag
@typedef {function()} bit-docs-js/types/codeTag.code CodeTag.code

@description Called when a [bit-docs-js/types/codeLine] immediately follows a
[bit-docs-process-tags/types/tagBlock].

Returns properties that should be set on the current
[bit-docs/types/docObject].

@param {bit-docs-js/types/codeLine} codeLine String of characters until newline.
@param {bit-docs/types/docObject} scope [bit-docs/types/docObject]
representing current scope.
@param {bit-docs/types/docMap} docMap [bit-docs/types/docMap] being added to.

@return {bit-docs/types/docObject} Properties that should be set on the current
[bit-docs/types/docObject].

@body

## Use

Used in:
- [bit-docs-js/process/code].
