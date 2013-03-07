/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

 // orange: #cb4b16
 // bright cyan: #1db9c8
 // bright blue: #2792f9


ace.define('ace/theme/orange', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-orange";
exports.cssText = ".ace-orange .ace_gutter {\
background: #fbf1d3;\
color: #333\
}\
.ace-orange .ace_print-margin {\
width: 1px;\
background: #e8e8e8\
}\
.ace-orange .ace_scroller {\
background-color: #fefaf3\
}\
.ace-orange .ace_constant.ace_other,\
.ace-orange .ace_constant.ace_character,\
.ace-orange .ace_entity.ace_name.ace_tag,\
.ace-orange .ace_variable,\
.ace-orange .ace_text-layer {\
color: #586E75\
}\
.ace-orange .ace_cursor {\
border-left: 2px solid #000000\
}\
.ace-orange .ace_overwrite-cursors .ace_cursor {\
border-left: 0px;\
border-bottom: 1px solid #000000\
}\
.ace-orange .ace_marker-layer .ace_selection {\
background: #dedbd5\
}\
.ace-orange.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #FDF6E3;\
border-radius: 2px\
}\
.ace-orange .ace_marker-layer .ace_step {\
background: rgb(255, 255, 0)\
}\
.ace-orange .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgba(147, 161, 161, 0.50)\
}\
.ace-orange .ace_marker-layer .ace_active-line {\
background: #EEE8D5\
}\
.ace-orange .ace_gutter-active-line {\
background-color : #dcdcdc\
}\
.ace-orange .ace_keyword,\
.ace-orange .ace_meta {\
color: #859900\
}\
.ace-orange .ace_language.ace_type,\
.ace-orange .ace_language.ace_variable {\
color: #859900\
}\
.ace-orange .ace_language.ace_constant {\
color: #dc322f\
}\
.ace-orange .ace_string.ace_regex,\
.ace-orange .ace_string {\
color: #2aa198\
}\
.ace-orange .ace_constant.ace_numeric {\
color: #268bd2\
}\
.ace-orange .ace_support.ace_function,\
.ace-orange .ace_support.ace_type,\
.ace-orange .ace_support.ace_key,\
.ace-orange .ace_support.ace_class {\
color: #e08f15;\
}\
.ace-orange .ace_fold {\
background-color: #268BD2;\
border-color: #586E75\
}\
.ace-orange .ace_comment,\
.ace-orange .ace_entity.ace_other.ace_attribute-name {\
color: #93A1A1\
}\
.ace-orange .ace_marker-layer .ace_selected-word {\
border: 1px solid #073642\
}\
.ace-orange .ace_invisible {\
color: rgba(147, 161, 161, 0.50)\
}\
.ace-orange .ace_markup.ace_underline {\
text-decoration: underline\
}\
.ace-orange .ace_markup.ace_italic {\
font-style: italic\
}\
.ace-orange .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4++3xf4ZVq1b9BwAjxwbT1g3hiwAAAABJRU5ErkJggg==) right repeat-y\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
