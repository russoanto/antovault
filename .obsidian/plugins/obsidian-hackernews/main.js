/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository (https://github.com/arpitbbhayani/obsidian-hackernews)
*/

'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

// English
var en = {
    'Open HackerNews': 'Open HackerNews',
    'HackerNews': 'HackerNews',
    //settingsTab.ts
    'HackerNews Settings': 'HackerNews Settings',
    'Refresh Interval': 'Refresh Interval',
    'The time interval in seconds after which the next top story will be fetched. Default and invalid values will be reverted to 60 seconds.': 'The time interval in seconds after which the next top story will be fetched. Default and invalid values will be reverted to 60 seconds.',
    'Stories Folder': 'Stories Folder',
    'The folder that holds the saved HackerNews stories. The folder will be created if it does not exist.': 'The folder that holds the saved HackerNews stories. The folder will be created if it does not exist.',
    'Story Template': 'Story Template',
    'Specify how the HackerNews story is saved; available attributes: title, url, date.': 'Specify how the HackerNews story is saved; available attributes: title, url, date.',
    'Donate': 'Donate',
    'If you found this plugin helpful, consider donating to support continued development.': 'If you found this plugin helpful, consider donating to support continued development.',
};

const localeMap = {
    en,
};
const locale = localeMap[obsidian.moment.locale()];
function t(str) {
    if (!locale) {
        return en[str];
    }
    return (locale && locale[str]) || en[str];
}

class SettingsTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        const { containerEl, plugin } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: t('HackerNews Settings') });
        new obsidian.Setting(containerEl)
            .setName(t('Refresh Interval'))
            .setDesc(t('The time interval in seconds after which the next top story will be fetched. Default and invalid values will be reverted to 60 seconds.'))
            .addText(text => text
            .setPlaceholder('60')
            .setValue(plugin.settings.defaultRefreshInterval)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            let refreshInterval = parseInt(value);
            if (Number.isNaN(refreshInterval) || refreshInterval <= 0) {
                refreshInterval = 60;
            }
            plugin.settings.defaultRefreshInterval = `${refreshInterval}`;
            yield this.save();
        })));
        new obsidian.Setting(containerEl)
            .setName(t('Stories Folder'))
            .setDesc(t('The folder that holds the saved HackerNews stories. The folder will be created if it does not exist.'))
            .addText(text => text
            .setPlaceholder('stories folder')
            .setValue(plugin.settings.storiesFolder)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            plugin.settings.storiesFolder = value;
            yield this.save();
        })));
        new obsidian.Setting(containerEl)
            .setName(t('Story Template'))
            .setDesc(t('Specify how the HackerNews story is saved; available attributes: title, url, date.'))
            .addTextArea(text => text
            .setPlaceholder('stories folder')
            .setValue(plugin.settings.storyTemplate)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            plugin.settings.storyTemplate = value;
            yield this.save();
        })));
        new obsidian.Setting(containerEl)
            .setName(t('Donate'))
            .setDesc(t('If you found this plugin helpful, consider donating to support continued development.'))
            .setClass("extra")
            .addButton((bt) => {
            bt.buttonEl.outerHTML = `<a href="https://www.buymeacoffee.com/arpitbhayani"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=arpitbhayani&button_colour=5F7FFF&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"></a>`;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.plugin.saveSettings();
        });
    }
}

const VIEW_TYPE = 'hackernews-view';
const VIEW_DISPLAY_TEXT = t('HackerNews');
const VIEW_ICON = 'hackernews';
const DEFAULT_SETTINGS = {
    defaultRefreshInterval: "60",
    storiesFolder: "HackerNews",
    storyTemplate: `---
date: {{date}}
source: {{url}}

---

# {{title}}

> notes from [{{title}}]({{url}})
`
};

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function append(target, node) {
    target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element('style');
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function element(name) {
    return document.createElement(name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : options.context || []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

/* src/ui/hackernews/hackernewsView.svelte generated by Svelte v3.42.4 */

function add_css(target) {
	append_styles(target, "svelte-yiq1rr", ".hn-link.svelte-yiq1rr{font-size:1em;text-decoration:none}.hn-read.svelte-yiq1rr{font-size:0.75em;text-align:right;margin-top:0.5em}.hn-meta.svelte-yiq1rr{font-size:0.7em;color:#aaa}.results.svelte-yiq1rr{display:flex;flex-wrap:wrap}.container.svelte-yiq1rr{max-width:30vw;width:100%;margin:auto;background-color:var(--background-primary-alt);padding:1rem 1rem;margin-top:0.2rem;border-radius:0.3rem}");
}

// (27:2) {#if dataHN}
function create_if_block(ctx) {
	let div1;
	let div0;
	let a0;
	let t0_value = /*dataHN*/ ctx[2].title + "";
	let t0;
	let a0_href_value;
	let t1;
	let br;
	let t2;
	let p0;
	let a1;
	let t4;
	let a2;
	let t5;
	let a2_href_value;
	let t6;
	let p1;
	let t7;
	let t8;
	let t9;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			a0 = element("a");
			t0 = text(t0_value);
			t1 = space();
			br = element("br");
			t2 = space();
			p0 = element("p");
			a1 = element("a");
			a1.textContent = "Save";
			t4 = text("\n          •\n          ");
			a2 = element("a");
			t5 = text("Read now");
			t6 = space();
			p1 = element("p");
			t7 = text("Refreshes every ");
			t8 = text(/*refreshInterval*/ ctx[0]);
			t9 = text(" seconds.");
			attr(a0, "href", a0_href_value = /*dataHN*/ ctx[2].url);
			attr(a0, "target", "_blank");
			attr(a0, "class", "hn-link svelte-yiq1rr");
			attr(a1, "href", "/");
			attr(a2, "href", a2_href_value = /*dataHN*/ ctx[2].url);
			attr(a2, "target", "_blank");
			attr(p0, "class", "hn-read svelte-yiq1rr");
			attr(p1, "class", "hn-meta svelte-yiq1rr");
			attr(div0, "class", "container svelte-yiq1rr");
			attr(div1, "class", "results svelte-yiq1rr");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, a0);
			append(a0, t0);
			append(div0, t1);
			append(div0, br);
			append(div0, t2);
			append(div0, p0);
			append(p0, a1);
			append(p0, t4);
			append(p0, a2);
			append(a2, t5);
			append(div0, t6);
			append(div0, p1);
			append(p1, t7);
			append(p1, t8);
			append(p1, t9);

			if (!mounted) {
				dispose = listen(a1, "click", /*saveHNItem*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*dataHN*/ 4 && t0_value !== (t0_value = /*dataHN*/ ctx[2].title + "")) set_data(t0, t0_value);

			if (dirty & /*dataHN*/ 4 && a0_href_value !== (a0_href_value = /*dataHN*/ ctx[2].url)) {
				attr(a0, "href", a0_href_value);
			}

			if (dirty & /*dataHN*/ 4 && a2_href_value !== (a2_href_value = /*dataHN*/ ctx[2].url)) {
				attr(a2, "href", a2_href_value);
			}

			if (dirty & /*refreshInterval*/ 1) set_data(t8, /*refreshInterval*/ ctx[0]);
		},
		d(detaching) {
			if (detaching) detach(div1);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment(ctx) {
	let div;
	let if_block = /*dataHN*/ ctx[2] && create_if_block(ctx);

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			attr(div, "class", "main");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (/*dataHN*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	
	
	let { manager } = $$props;
	let { refreshInterval } = $$props;
	let dataHN;

	function fetchTopHN() {
		return __awaiter(this, void 0, void 0, function* () {
			console.log('fetching top story from HackerNews');
			$$invalidate(2, dataHN = yield manager.requestTopHN());
		});
	}

	function saveHNItem() {
		return __awaiter(this, void 0, void 0, function* () {
			console.log(`saving story ${dataHN.title}`);
			yield manager.saveHNItem(dataHN);
		});
	}

	addEventListener("obsidian-hackernews-fetchTopHN", fetchTopHN);

	onDestroy(() => {
		removeEventListener('obsidian-hackernews-fetchTopHN', fetchTopHN);
	});

	$$self.$$set = $$props => {
		if ('manager' in $$props) $$invalidate(3, manager = $$props.manager);
		if ('refreshInterval' in $$props) $$invalidate(0, refreshInterval = $$props.refreshInterval);
	};

	return [refreshInterval, saveHNItem, dataHN, manager, fetchTopHN];
}

class HackernewsView extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				manager: 3,
				refreshInterval: 0,
				fetchTopHN: 4,
				saveHNItem: 1
			},
			add_css
		);
	}

	get fetchTopHN() {
		return this.$$.ctx[4];
	}

	get saveHNItem() {
		return this.$$.ctx[1];
	}
}

class HackerNewsView extends obsidian.ItemView {
    constructor(leaf, plugin) {
        super(leaf);
        this.plugin = plugin;
    }
    getViewType() {
        return VIEW_TYPE;
    }
    getDisplayText() {
        return VIEW_DISPLAY_TEXT;
    }
    getIcon() {
        return VIEW_ICON;
    }
    onClose() {
        this._view.$destroy();
        return super.onClose();
    }
    onOpen() {
        this._view = new HackernewsView({
            target: this.contentEl,
            props: {
                manager: this.plugin.manager,
            }
        });
        this._view.$set({
            refreshInterval: this.plugin.settings.defaultRefreshInterval,
        });
        return super.onOpen();
    }
}

const { moment } = require('obsidian');
class APIManager {
    constructor(plugin) {
        this.plugin = plugin;
    }
    requestTopHN() {
        return __awaiter(this, void 0, void 0, function* () {
            let itemIds;
            try {
                const url = "https://hacker-news.firebaseio.com/v0/topstories.json";
                const response = yield fetch(url);
                itemIds = (yield response.json());
            }
            catch (error) {
                return Promise.reject(error);
            }
            const itemId = itemIds[Math.floor(Math.random() * itemIds.slice(0, 25).length)];
            const itemResponse = yield fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json?print=pretty`);
            const hnItem = (yield itemResponse.json());
            return hnItem;
        });
    }
    saveHNItem(hnItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = this.plugin.settings.storiesFolder;
            const title = hnItem.title.replace(/[\/\\\:]/g, ' ');
            const filePath = obsidian.normalizePath([dir, `${title}.md`].join('/'));
            const vault = this.plugin.app.vault;
            let stat = yield vault.adapter.stat(dir);
            if (!stat) {
                yield vault.createFolder(dir);
            }
            stat = yield vault.adapter.stat(filePath);
            if (!stat) {
                yield vault.create(filePath, this.getStoryFileContent(hnItem));
                new obsidian.Notice(`Story saved: ${hnItem.title}`);
            }
            else {
                new obsidian.Notice("Story already saved");
            }
        });
    }
    getStoryFileContent(hnItem) {
        let data = this.plugin.settings.storyTemplate;
        return data.replace(/{{title}}/g, hnItem.title)
            .replace(/{{url}}/g, hnItem.url)
            .replace(/{{date}}/g, moment().format('LLLL'));
    }
}

const icons = {
    hackernews: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" fill="none" fill-opacity="0.0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open"><path d="M21.27,0c-1.174,2.021-5.5,9.464-5.532,9.499h-0.11C15.595,9.464,11.424,2.073,10.253,0H3.148l9.253,15.034v15.927h6.157 V15.034L27.812,0H21.27z"/></svg>`,
};
const addIcons = () => {
    Object.keys(icons).forEach((key) => {
        obsidian.addIcon(key, icons[key]);
    });
};

class HackerNewsPlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('loading hackernews');
            yield this.loadSettings();
            addIcons();
            this.addSettingTab(new SettingsTab(this.app, this));
            this.manager = new APIManager(this);
            this.registerView(VIEW_TYPE, (leaf) => {
                return new HackerNewsView(leaf, this);
            });
            this.addCommand({
                id: 'hackernews-open-view',
                name: t('Open HackerNews'),
                callback: this.openWindowLeaf.bind(this),
            });
            this.app.workspace.onLayoutReady(this.openWindowLeaf.bind(this));
            let refreshInterval = parseInt(this.settings.defaultRefreshInterval);
            if (Number.isNaN(refreshInterval) || refreshInterval <= 0) {
                refreshInterval = 60;
            }
            dispatchEvent(new Event('obsidian-hackernews-fetchTopHN'));
            this.registerInterval(window.setInterval(() => {
                dispatchEvent(new Event('obsidian-hackernews-fetchTopHN'));
            }, refreshInterval * 1000));
            console.log('refreshInterval', refreshInterval, 'seconds');
        });
    }
    onunload() {
        console.log('unloading hackernews');
        for (let leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE)) {
            leaf.detach();
        }
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
    openWindowLeaf() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.app.workspace.getLeavesOfType(VIEW_TYPE).length == 0) {
                yield this.app.workspace.getRightLeaf(false).setViewState({
                    type: VIEW_TYPE,
                });
            }
            this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(VIEW_TYPE).first());
            dispatchEvent(new Event('obsidian-hackernews-fetchTopHN'));
        });
    }
}

module.exports = HackerNewsPlugin;
//# sourceMappingURL=main.js.map

/* nosourcemap */