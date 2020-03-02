The `type` prop defines the style of the button: `primary` (default, solid blue), `secondary` (transparent with blue background), `cta` (magenta, use once per page), `link` (looks like a link)

The `size` prop defines the size of the button: `xl`, `large`, `medium (default)`, `small`, `tiny`

Use `disabled` for a button that can't be clicked (no hover, and faded out)

Example:

```js
<Button secondary size="large">Open</Button>
<Button primary size="small" disabled>Open</Button>
```