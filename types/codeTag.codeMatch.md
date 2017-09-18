@parent bit-docs-js/types/codeTag
@typedef {function()} bit-docs-js/types/codeTag.codeMatch CodeTag.codeMatch

@description Checks if [bit-docs-js/types/codeTag.code] of the same
[bit-docs-js/types/codeTag] instance can/should handle a passed
[bit-docs-js/types/codeLine].

@param {bit-docs-js/types/codeLine} codeLine String of characters until newline.

@return {Boolean} Whether or not [bit-docs-js/types/codeTag.code] can handle
the passed [bit-docs-js/types/codeLine].

@body

## Use

The [bit-docs-js/process/code] processor consecutively passes any one
[bit-docs-js/types/codeLine] that immediately follows a
[bit-docs-js/types/codeTagBlock] to every [bit-docs-js/types/codeTag]'s
[bit-docs-js/types/codeTag.codeMatch] function until one or none returns
`true`.

The first [bit-docs-js/types/codeTag] whose
[bit-docs-js/types/codeTag.codeMatch] returns `true` will be used by the
[bit-docs-js/process/code] processor to handle the passed
[bit-docs-js/types/codeLine] using [bit-docs-js/types/codeTag.code].
