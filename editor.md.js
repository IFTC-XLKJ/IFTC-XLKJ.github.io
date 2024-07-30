const editormd = {
    mode: "gfm",          // gfm or markdown
    name: "",             // Form element name for post
    value: "",             // value for CodeMirror, if mode not gfm/markdown
    theme: "",             // Editor.md self themes, before v1.5.0 is CodeMirror theme, default empty
    editorTheme: "default",      // Editor area, this is CodeMirror theme at v1.5.0
    previewTheme: "",             // Preview area theme, default empty
    markdown: "",             // Markdown source code
    appendMarkdown: "",             // if in init textarea value not empty, append markdown to textarea
    width: "100%",
    height: "100%",
    path: "./lib/",       // Dependents module file directory
    pluginPath: "",             // If this empty, default use settings.path + "../plugins/"
    delay: 300,            // Delay parse markdown to html, Uint : ms
    autoLoadModules: true,           // Automatic load dependent module files
    watch: true,
    placeholder: "Enjoy Markdown! coding now...",
    gotoLine: true,           // Enable / disable goto a line
    codeFold: false,
    autoHeight: false,
    autoFocus: true,           // Enable / disable auto focus editor left input area
    autoCloseTags: true,
    searchReplace: true,           // Enable / disable (CodeMirror) search and replace function
    syncScrolling: true,           // options: true | false | "single", default true
    readOnly: false,          // Enable / disable readonly mode
    tabSize: 4,
    indentUnit: 4,
    lineNumbers: true,           // Display editor line numbers
    lineWrapping: true,
    autoCloseBrackets: true,
    showTrailingSpace: true,
    matchBrackets: true,
    indentWithTabs: true,
    styleSelectedText: true,
    matchWordHighlight: true,           // options: true, false, "onselected"
    styleActiveLine: true,           // Highlight the current line
    dialogLockScreen: true,
    dialogShowMask: true,
    dialogDraggable: true,
    dialogMaskBgColor: "#fff",
    dialogMaskOpacity: 0.1,
    fontSize: "13px",
    saveHTMLToTextarea: false,          // If enable, Editor will create a <textarea name="{editor-id}-html-code"> tag save HTML code for form post to server-side.
    disabledKeyMaps: [],

    onload: function () { },
    onresize: function () { },
    onchange: function () { },
    onwatch: null,
    onunwatch: null,
    onpreviewing: function () { },
    onpreviewed: function () { },
    onfullscreen: function () { },
    onfullscreenExit: function () { },
    onscroll: function () { },
    onpreviewscroll: function () { },

    imageUpload: false,          // Enable/disable upload
    imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
    imageUploadURL: "",             // Upload url
    crossDomainUpload: false,          // Enable/disable Cross-domain upload
    uploadCallbackURL: "",             // Cross-domain upload callback url

    toc: true,           // Table of contents
    tocm: false,          // Using [TOCM], auto create ToC dropdown menu
    tocTitle: "",             // for ToC dropdown menu button
    tocDropdown: false,          // Enable/disable Table Of Contents dropdown menu
    tocContainer: "",             // Custom Table Of Contents Container Selector
    tocStartLevel: 1,              // Said from H1 to create ToC
    htmlDecode: false,          // Open the HTML tag identification 
    pageBreak: true,           // Enable parse page break [========]
    atLink: true,           // for @link
    emailLink: true,           // for email address auto link
    taskList: false,          // Enable Github Flavored Markdown task lists
    emoji: false,          // :emoji: , Support Github emoji, Twitter Emoji (Twemoji);
    // Support FontAwesome icon emoji :fa-xxx: > Using fontAwesome icon web fonts;
    // Support Editor.md logo icon emoji :editormd-logo: :editormd-logo-1x: > 1~8x;
    tex: false,          // TeX(LaTeX), based on KaTeX
    flowChart: false,          // flowChart.js only support IE9+
    sequenceDiagram: false,          // sequenceDiagram.js only support IE9+
    previewCodeHighlight: true,           // Enable / disable code highlight of editor preview area

    toolbar: true,           // show or hide toolbar
    toolbarAutoFixed: true,           // on window scroll auto fixed position
    toolbarIcons: "full",         // Toolbar icons mode, options: full, simple, mini, See `editormd.toolbarModes` property.
    toolbarTitles: {},
    toolbarHandlers: {
        ucwords: function () {
            return editormd.toolbarHandlers.ucwords;
        },
        lowercase: function () {
            return editormd.toolbarHandlers.lowercase;
        }
    },
    toolbarCustomIcons: {               // using html tag create toolbar icon, unused default <a> tag.
        lowercase: "<a href=\"javascript:;\" title=\"Lowercase\" unselectable=\"on\"><i class=\"fa\" name=\"lowercase\" style=\"font-size:24px;margin-top: -10px;\">a</i></a>",
        "ucwords": "<a href=\"javascript:;\" title=\"ucwords\" unselectable=\"on\"><i class=\"fa\" name=\"ucwords\" style=\"font-size:20px;margin-top: -3px;\">Aa</i></a>"
    },
    toolbarIconTexts: {},

    lang: {  // Language data, you can custom your language.
        name: "zh-cn",
        description: "开源在线Markdown编辑器<br/>Open source online Markdown editor.",
        tocTitle: "目录",
        toolbar: {
            //...
        },
        button: {
            //...
        },
        dialog: {
            //...
        }
        //...
    }
}