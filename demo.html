<!DOCTYPE html><html lang="en">
<head>
    <meta charset="utf-8">
    <title>Vanilla JavaScript autoComplete</title>
    <meta name="description" content="A lightweight autocomplete plugin with no dependencies, written in plain JavaScript.">
    <link rel="shortcut icon" href="https://pixabay.com/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300">
    <link rel="stylesheet" href="https://cdn.rawgit.com/yahoo/pure-release/v0.6.0/pure-min.css">
    <style>
        body { margin: 0; padding: 0; border: 0; min-width: 320px; color: #777; }
        html, button, input, select, textarea, .pure-g [class *= "pure-u"] { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 1.02em; }
        p, td { line-height: 1.5; }
        ul { padding: 0 0 0 20px; }

        th { background: #eee; white-space: nowrap; }
        th, td { padding: 10px; text-align: left; vertical-align: top; font-size: .9em; font-weight: normal; border-right: 1px solid #fff; }
        td:first-child { white-space: nowrap; color: #008000; width: 1%; font-style: italic; }

        h1, h2, h3 { color: #4b4b4b; font-family: "Source Sans Pro", sans-serif; font-weight: 300; margin: 0 0 1.2em; }
        h1 { font-size: 4.5em; color: #1f8dd6; margin: 0 0 .4em; }
        h2 { font-size: 2em; color: #636363; }
        h3 { font-size: 1.8em; color: #4b4b4b; margin: 1.8em 0 .8em }
        h4 { font: bold 1em sans-serif; color: #636363; margin: 4em 0 1em; }
        a { color: #4e99c7; text-decoration: none; }
        a:hover { text-decoration: underline; }
        p { margin: 0 0 1.2em; }
        ::selection { color: #fff; background: #328efd; }
        ::-moz-selection { color: #fff; background: #328efd; }

        @media (max-width:480px) {
            h1 { font-size: 3em; }
            h2 { font-size: 1.8em; }
            h3 { font-size: 1.5em; }
            td:first-child { white-space: normal; }
        }

        .inline-code { padding: 1px 5px; background: #eee; border-radius: 2px; }
        pre {
            margin: 10px 0; overflow: auto; white-space: pre; word-wrap: normal;
            border: 0 !important; padding: 8px 10px !important; line-height: 18px; background: #edf3f8;
            font-family: Consolas, 'Liberation Mono', Courier, monospace; font-size: 14px;
        }

        /* Pure CSS */
        .pure-button { margin: 5px 0; text-decoration: none !important; }
        .button-lg { margin: 5px 0; padding: .65em 1.6em; font-size: 105%; }

        input[type="text"] { border-radius: 0 !important; }
    </style>
    <link rel="stylesheet" href="auto-complete.css">
</head>
<body>
    <div style="max-width:900px;padding:0 10px;margin:40px auto;text-align:center">
        <h1>autoComplete</h1>
        <h2>An extremely lightweight and powerful vanilla JavaScript completion suggester.</h2>
        <a style="margin:5px 0" href="https://github.com/Pixabay/JavaScript-autoComplete/archive/master.zip" class="pure-button pure-button-primary button-lg">Download</a>
        &nbsp;
        <a style="margin:5px 0" href="https://github.com/Pixabay/JavaScript-autoComplete" class="pure-button button-lg">View on GitHub</a>
    </div>
    <form onsubmit="return false;" class="pure-form" style="border-top: 1px solid #eee;border-bottom:1px solid #eee;background:#fafafa;margin:30px 0;padding:20px 10px;text-align:center">
        <input id="hero-demo" autofocus type="text" name="q" placeholder="Programming languages ..." style="width:100%;max-width:600px;outline:0">
    </form>
    <div style="max-width:900px;margin:auto;padding:0 10px 50px">
        <h3>Overview and Features</h3>
        <p>
            Released under the <a href="http://www.opensource.org/licenses/mit-license.php">MIT License</a>.
            Source on <a href="https://github.com/Pixabay/JavaScript-autoComplete">Github</a> (<a href="https://github.com/Pixabay/JavaScript-autoComplete#changelog">changelog</a>).
            Tested in Firefox, Safari, Chrome, Opera, Internet Explorer 8+.
        </p>
        <ul>
            <li>Lightweight: 5.4 kB of JavaScript - less than 2.4 kB gzipped</li>
            <li>Written in plain JavaScript, no dependencies and lightning fast</li>
            <li>Fully flexible data source</li>
            <li>Smart caching, delay and minimum character settings</li>
            <li>Callbacks</li>
        </ul>
        <p>
            This plugin was developed by <a href="https://pixabay.com/">Pixabay.com</a> - an international repository for free Public Domain images.
            We have implemented this piece of software in production on <a href="https://plainjs.com/">plainJS</a> and we share it - in the spirit of Pixabay - freely with others.
        </p>

        <h3>Usage</h3>
        <p>
            Include the JavaScript file <span class="inline-code">auto-complete.min.js</span> before the closing <span class="inline-code">&lt;/body&gt;</span> tag
            and the stylesheet <span class="inline-code">auto-complete.css</span> in the <span class="inline-code">&lt;head&gt;</span> section of your page.
            autoComplete accepts settings from an object of key/value pairs, and can be assigned to any text input field.
        </p>
        <pre class="prettyprint"><code>// initialize
var my_autoComplete = new autoComplete({key1: value1, key2: value2});

// destroy
my_autoComplete.destroy();</code></pre>

        <h3>Settings</h3>
        <table>
            <tr><th>Property</th><th>Default</th><th>Description</th></tr>
            <tr><td>selector</td><td>string or DOM element</td><td>Required selector for text input field or DOM element.</td></tr>
            <tr><td>source(term, response)</td><td><i>null</i></td><td>
                Required callback function to connect any data source to autoComplete. The callback gets two arguments:
                <ul>
                    <li><span class="inline-code">term</span>, which refers to the value currently in the text input.</li>
                    <li>A <span class="inline-code">response</span> callback, which expects a single argument:
                        the data to suggest to the user. This data must be an array of filtered suggestions based on the provided term:
                        <br>['suggestion 1', 'suggestion 2', 'suggestion 3', ...]
                    </li>
                </ul>
            </td></tr>
            <tr><td>minChars</td><td>3</td><td>Minimum number of characters (>=1) a user must type before a search is performed.</td></tr>
            <tr><td>delay</td><td>150</td><td>The delay in milliseconds between when a keystroke occurs and when a search is performed. A zero-delay is more responsive, but can produce a lot of load.</td></tr>
            <tr><td>offsetLeft</td><td><i>0</i></td><td>Optional left offset of the suggestions container.</td></tr>
            <tr><td>offsetTop</td><td><i>1</i></td><td>Optional top offset of the suggestions container.</td></tr>
            <tr><td>cache</td><td><i>true</i></td><td>Determines if performed searches should be cached.</td></tr>
            <tr>
                <td>menuClass</td><td><i>''</i></td>
                <td>Custom class/es that get/s added to the dropdown menu container.
                <br>Example: <span class="inline-code">{ menuClass: 'class1 class2' }</span></td>
            </tr>
            <tr>
                <td>renderItem</td><td><i>function</i></td>
                <td>
                    <p>A function that gives you control over how suggestions are displayed. Default:</p>
<pre class="prettyprint" style="white-space:pre-wrap"><code>renderItem: function (item, search){
    search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;');
    var re = new RegExp(&quot;(&quot; + search.split(' ').join('|') + &quot;)&quot;, &quot;gi&quot;);
    return '&lt;div class=&quot;autocomplete-suggestion&quot; data-val=&quot;' + item + '&quot;&gt;' + item.replace(re, &quot;&lt;b&gt;$1&lt;/b&gt;&quot;) + '&lt;/div&gt;';
}</code></pre>
                </td>
            </tr>

            <tr><td colspan="3">&nbsp;</td></tr>
            <tr><th>Callbacks</th><th colspan="2"></th></tr>
            <tr><td>onSelect(event, term, item)</td><td colspan="2">
                A callback function that fires when a suggestion is selected by mouse click, enter, or tab.
                <span class="inline-code">event</span> is the event that triggered the callback,
                <span class="inline-code">term</span> is the selected value.
                and <span class="inline-code">item</span> is the item rendered by the renderItem function.
            </td></tr>

            <tr><td colspan="3">&nbsp;</td></tr>
            <tr><th>Public Methods</th><th colspan="2"></th></tr>
            <tr><td>destroy</td><td colspan="2">Removes the autoComplete instance and its bindings.</td></tr>
        </table>

        <h3 style="margin-top:.8em;border-top:1px solid #eee;padding-top:1.8em">Demos</h3>

        <h4 style="margin-top:.5em">Searching in local data</h4>
        <p>
            This plugin was designed mainly with AJAX requests in mind, but it may be used with local data, as well.
            Connecting the autocompletion suggester to an array of strings can be done in the source function like so:
        </p>
        <pre class="prettyprint"><code>new autoComplete({
    selector: 'input[name=&quot;q&quot;]',
    minChars: 2,
    source: function(term, suggest){
        term = term.toLowerCase();
        var choices = ['ActionScript', 'AppleScript', 'Asp', ...];
        var matches = [];
        for (i=0; i&lt;choices.length; i++)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    }
});</code></pre>
        <p>
            The source function iterates through an array of (local) choices and we return a new array containing all (lowercased) matches.
            Simple as that.
        </p>

        <h4>AJAX requests</h4>
        <p>
            AJAX requests may come with very different requirements: JSON, JSONP, GET, POST, additionaly params, authentications, etc.
            In order to keep the source code small while retaining full flexibility, we decided to only use a simple callback function as the source for suggestions.
            Make your AJAX call inside this function and return matching suggestions with the response callback. For brevity, this example uses jQuery for AJAX:
        </p>
        <pre class="prettyprint"><code>new autoComplete({
    selector: 'input[name=&quot;q&quot;]',
    source: function(term, response){
        $.getJSON('/some/ajax/url/', { q: term }, function(data){ response(data); });
    }
});</code></pre>
        <p>
            The AJAX call in this example needs to return an array of strings.
            The callback <span class="inline-code">response</span> must always be called, even if no suggestions are returned or if an error occured.
            This ensures the correct state of the autoComplete instance.
        </p>

        <h4>Optimizing AJAX requests</h4>
        <p>
            All search results are cached by default and unnecessary requests are prevented in order to keep server load as low as possible.
            To further reduce server impact, it's possible to abort unfinished AJAX requests before starting new ones.
            Again using jQuery's AJAX method for brevity:
        </p>
        <pre class="prettyprint"><code>var xhr;
new autoComplete({
    selector: 'input[name=&quot;q&quot;]',
    source: function(term, response){
        try { xhr.abort(); } catch(e){}
        xhr = $.getJSON('/some/ajax/url/', { q: term }, function(data){ response(data); });
    }
});</code></pre>
        <p>
            By typing along, the user may trigger one AJAX request after the other.
            With this little trick, we make sure that only the most current one actually gets executed - if not done so already.
        </p>

        <h4>Advanced suggestions handling and custom layout</h4>
        <p>
            By making use of the <span class="inline-code">renderItem()</span> function, it's possible to turn the autocompleter into an item suggester:
        </p>
        <form onsubmit="return false;" class="pure-form" style="margin:30px 0 40px">
            <input id="advanced-demo" autofocus type="text" name="q" placeholder="Country or language code ..." style="width:100%;max-width:600px;outline:0">
        </form>
        <p>
            While typing country names or language codes, a list of matching suggestions is displayed. E.g. typing "de" will show "Germany" as a suggestion, because "de" is the language code for German.
            Source code for this example:
        </p>
        <pre class="prettyprint"><code>new autoComplete({
    selector: 'input[name=&amp;quot;q&amp;quot;]',
    minChars: 1,
    source: function(term, suggest){
        term = term.toLowerCase();
        var choices = [['Australia', 'au'], ['Austria', 'at'], ['Brasil', 'br'], ...];
        var suggestions = [];
        for (i=0;i&lt;choices.length;i++)
            if (~(choices[i][0]+' '+choices[i][1]).toLowerCase().indexOf(term)) suggestions.push(choices[i]);
        suggest(suggestions);
    },
    renderItem: function (item, search){
        search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;');
        var re = new RegExp(&quot;(&quot; + search.split(' ').join('|') + &quot;)&quot;, &quot;gi&quot;);
        return '&lt;div class=&quot;autocomplete-suggestion&quot; data-langname=&quot;'+item[0]+'&quot; data-lang=&quot;'+item[1]+'&quot; data-val=&quot;'+search+'&quot;&gt;&lt;img src=&quot;img/'+item[1]+'.png&quot;&gt; '+item[0].replace(re, &quot;&lt;b&gt;$1&lt;/b&gt;&quot;)+'&lt;/div&gt;';
    },
    onSelect: function(e, term, item){
        alert('Item &quot;'+item.getAttribute('data-langname')+' ('+item.getAttribute('data-lang')+')&quot; selected by '+(e.type == 'keydown' ? 'pressing enter' : 'mouse click')+'.');
    }
});</code></pre>
        <p>
            In this case, autocompleting the text field is not desired, so we turn it off by setting <span class="inline-code">data-val=&quot;'+search+'&quot;</span> in the <span class="inline-code">renderItem()</span> function.
            However, when choosing an item, the <span class="inline-code">onSelect()</span> callback returns all required information.
        </p>

        <div style="margin:60px 0 40px;overflow:hidden;border-top:1px solid #eee;padding-top:40px">
            <span id="github_social"></span>
            <div style="float:left;margin-right:35px">
                <a href="#" data-width="70" class="twitter-share-button" data-text="jQuery autoComplete Plugin"></a>
            </div>
            <div style="float:left">
                <div class="g-plusone" data-size="medium"></div>
            </div>
            <div style="float:left;width:140px" class="fb-like" data-send="false" data-layout="button_count" data-width="140" data-show-faces="false"></div>
        </div>

        <p>Please report any bugs and issues at the <a href="https://github.com/Pixabay/JavaScript-autoComplete">GitHub repositiory</a>.</p>
        <p>This software is released as Open Source under the <a href="http://www.opensource.org/licenses/mit-license.php">MIT License</a> by <a href="https://pixabay.com/users/Simon/">Simon Steinberger / Pixabay.com</a>.</p>
    </div>

    <div style="background:#fafafa;border-top:1px solid #eee;padding:15px;font-size:.9em">
        <div style="max-width:900px;margin:auto;padding:0 10px">
            <a style="float:right;margin-left:20px" href="https://pixabay.com/en/service/about/">About Us</a>
            <a style="float:right;margin-left:20px" href="https://pixabay.com/en/blog/">Blog</a>
            <a style="float:right;margin-left:20px" href="https://goodies.pixabay.com/">More Goodies</a>
            © <a href="https://pixabay.com/">Pixabay.com</a> / Simon Steinberger / Hans Braxmeier
        </div>
    </div>

    <div id="fb-root"></div>
    <script src="auto-complete.js"></script>
    <script>
        var demo1 = new autoComplete({
            selector: '#hero-demo',
            minChars: 1,
            source: function(term, suggest){
                term = term.toLowerCase();
                var choices = ['ActionScript', 'AppleScript', 'Asp', 'Assembly', 'BASIC', 'Batch', 'C', 'C++', 'CSS', 'Clojure', 'COBOL', 'ColdFusion', 'Erlang', 'Fortran', 'Groovy', 'Haskell', 'HTML', 'Java', 'JavaScript', 'Lisp', 'Perl', 'PHP', 'PowerShell', 'Python', 'Ruby', 'Scala', 'Scheme', 'SQL', 'TeX', 'XML'];
                var suggestions = [];
                for (i=0;i<choices.length;i++)
                    if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
                suggest(suggestions);
            }
        });

        var demo2 = new autoComplete({
            selector: '#advanced-demo',
            minChars: 0,
            source: function(term, suggest){
                term = term.toLowerCase();
                var choices = [['Australia', 'au'], ['Austria', 'at'], ['Brasil', 'br'], ['Bulgaria', 'bg'], ['Canada', 'ca'], ['China', 'cn'], ['Czech Republic', 'cz'], ['Denmark', 'dk'], ['Finland', 'fi'], ['France', 'fr'], ['Germany', 'de'], ['Hungary', 'hu'], ['India', 'in'], ['Italy', 'it'], ['Japan', 'ja'], ['Netherlands', 'nl'], ['Norway', 'no'], ['Portugal', 'pt'], ['Romania', 'ro'], ['Russia', 'ru'], ['Spain', 'es'], ['Swiss', 'ch'], ['Turkey', 'tr'], ['USA', 'us']];
                var suggestions = [];
                for (i=0;i<choices.length;i++)
                    if (~(choices[i][0]+' '+choices[i][1]).toLowerCase().indexOf(term)) suggestions.push(choices[i]);
                suggest(suggestions);
            },
            renderItem: function (item, search){
                search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;');
                var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
                return '<div class="autocomplete-suggestion" data-langname="'+item[0]+'" data-lang="'+item[1]+'" data-val="'+search+'"><img src="img/'+item[1]+'.png"> '+item[0].replace(re, "<b>$1</b>")+'</div>';
            },
            onSelect: function(e, term, item){
                console.log('Item "'+item.getAttribute('data-langname')+' ('+item.getAttribute('data-lang')+')" selected by '+(e.type == 'keydown' ? 'pressing enter' : 'mouse click')+'.');
                document.getElementById('advanced-demo').value = item.getAttribute('data-langname')+' ('+item.getAttribute('data-lang')+')';
            }
        });

        if (~window.location.href.indexOf('http')) {
            (function() {var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;po.src = 'https://apis.google.com/js/plusone.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);})();
            (function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=114593902037957";fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));
            !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
            document.getElementById('github_social').innerHTML = '\
                <iframe style="float:left;margin-right:15px" src="//ghbtns.com/github-btn.html?user=Pixabay&repo=JavaScript-autoComplete&type=watch&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="110" height="20"></iframe>\
                <iframe style="float:left;margin-right:15px" src="//ghbtns.com/github-btn.html?user=Pixabay&repo=JavaScript-autoComplete&type=fork&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="110" height="20"></iframe>\
            ';
        }
    </script>
    <script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js" async defer></script>
</body>
</html>
