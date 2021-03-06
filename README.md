# JS Key Combination

## About

Key combination is a javascript plugin to handle js combination keys event.
Also, it supports jQuery and can be used as a plugin of jQuery.

## How to use
1. Use with jQuery
    Firstly, add jQuery library, and then use `<script>` tag to add keyCode.js

    `<script src="keyCode.js">`
2. Use without jQuery.
    Just load `keyCode.js`


## Examples

1. jQuery

    ```
    <script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
    <script src="keyCode.js"></script>
    <script>
        $(document).ready(function () {
            $(selector).ke()
            .register('ctrl+a', function () {
                // handler when 'ctrl+a' triggered
            })
            .register('ctrl+shift+a', function () {
                // handler when 'ctrl+shift+a' triggered
            })
            .register('alt+/', function () {
                // handler when 'alt+/' triggered
            })
            .trigger();
        });
    </script>
    ```
2. Without jQuery

    ```
        <script src="keyCode.js"></script>
        window.onload = function () {
            KE(selector)
            .register('ctrl+a', function () {
                // handler when 'ctrl+a' triggered
            })
            .register('ctrl+shift+a', function () {
                // handler when 'ctrl+shift+a' triggered
            })
            .register('alt+/', function () {
                // handler when 'alt+/' triggered
            })
            .trigger();
        };
    ```

#### Attention

`keyCode.js` based on DOM keydown event, so you can't register a long combination
and it's child combination starting with the first key. For example, you can't
use `ctrl+shift` and `ctrl+shift+p` as registered keys at the same time.

#### Full support (with appropriate graphics drivers):
* Firefox
* Chrome
* Safari
* Internet Explorer 9+
* Edge

#### No support:
* Internet Explorer 6
* Internet Explorer 7
* Internet Explorer 8

## License
MIT License.
