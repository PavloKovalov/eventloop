// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  Code,
  CodePane,
  Deck,
  Fill,
  Fit,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  S,
  Slide,
  Spectacle,
  Text
} from "spectacle";
import CodeSlide from 'spectacle-code-slide';
import SleepySpinny from '../assets/spinner';
import FakeAjax from '../assets/fake_ajax';
import Timeouter from '../assets/set_timeout.js';

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const code = {
  calc: require("raw!../assets/callstack_calc.example"),
  blocking: require("raw!../assets/callstack_blocking.example"),
  blockingDemo: require("raw!../assets/callstack_blocking_demo.example"),
  blockingAjax: require("raw!../assets/callstack_blocking_ajax.example"),

  callstack: require("raw!../assets/callstack.example"),
  callstackError: require("raw!../assets/callstack_error.example"),
  callstackLoop: require("raw!../assets/callstack_loop.example"),

  setTimeout: require("raw!../assets/set_timeout.example"),
  ajax: require("raw!../assets/ajax.example")
};

const images = {
  eventLoop: require("../assets/event_loop.svg"),

  hourglass: require("../assets/hourglass.gif"),
  browser: require("../assets/browser.png"),

  engine: {
    callstack: require("../assets/callstack.png"),
    heap: require("../assets/heap.png")
  },

  callstack: {
    error: require("../assets/callstack_error.png"),
    loop: require("../assets/callstack_loop.png")
  },

  calc: {
    empty: require("../assets/callstack_empty.png")
  },

  fun: {
    crying: require("../assets/but_where.png"),
    wut: require("../assets/wut.gif")
  }
};

preloader(images);

const theme = createTheme({
  primary: "gray", // "#ff4081",
  js_prime: "#f3df49",
  js_slave: "#2e2e2c"
});

export default class Presentation extends React.Component {
  render() {
    const txtColor = (v) => ({
      color: v
    });

    const columnStyle = {
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column-reverse'
    };

    const stackItemStyle = {
      fontSize: '0.8em',
      fontWeight: 'bold',
      fontFamily: 'Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace',

      border: '5px #f08d49 dotted',
      padding: '10px 25px',
      margin: '25px 0 0 20px',
      color: '#f08d49',
      borderRadius: '20px',
      textShadow: '1px 1px black'
    };

    const shadowStyle = (style) => {
      const shaddow = {
        dark: '4px -2px 0 #333',
        light: '-1px 1px 0 #666'
      };

      return {
        textShadow: shaddow[style]
      };
    };

    const ajaxLoader = <div>XHR
      <img height="56px" src={images.hourglass.replace("/", "")}/>
    </div>;

    return (
      <Spectacle theme={theme}>
        <Deck transition={["fade"]} progress="pacman">
          <Slide bgColor="js_slave">
            <Heading size={1} caps lineHeight={1} textColor="white">
              How does
            </Heading>
            <Heading size={1} fit textColor="js_prime">
              JavaScript
            </Heading>
            <Heading size={1} caps textColor="white">
              work?
            </Heading>
          </Slide>

          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={2} caps textColor="white">
              What is
            </Heading>
            <Heading size={1} fit textColor="#f3df49" textFont="primary">
              JavaScript?
            </Heading>
          </Slide>

          <Slide transition={["slide"]} notes="You can even put notes on your slide. How awesome is that?" bgColor="js_slave">
            <BlockQuote>
              <Quote textColor="white">JavaScript is a</Quote>
              <Quote textColor="js_prime">high-level,</Quote>
              <Quote textColor="js_prime">dynamic,</Quote>
              <Quote textColor="js_prime">untyped,</Quote>
              <Quote textColor="js_prime">interpreted</Quote>
              <Quote textColor="white">programming language</Quote>
              <Cite>Wikipedia</Cite>
            </BlockQuote>
          </Slide>

          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit textColor="#f3df49">
              JavaScript
            </Heading>
            <Heading size={1}>
              in the Browser
            </Heading>
          </Slide>

          <Slide transition={["slide"]} notes="Before diving into the event loop, we need a basic understanding of the JavaScript Engine and what it does." bgColor="js_slave">
            <BlockQuote>
              <Quote textColor="white">A JavaScript engine is an interpreter that interprets JavaScript source code and executes the script accordingly.</Quote>
              <Cite>Wikipedia</Cite>
            </BlockQuote>
          </Slide>

          <Slide transition={["slide"]}>
            <Heading size={2} textColor="white">
              JavaScript Engine
            </Heading>
            <Text bold fit>
              it’s job is to go through all the lines of JavaScript in an application
            </Text>
            <Text bold fit>
              and process them <span style={txtColor('#ddd')}>one at a time</span>
            </Text>
            <Text italic bold fit textColor="js_prime">
              single-threaded
            </Text>
            <Text fit bold>
              <span style={txtColor('#ddd')}>long</span> operations cause <S type="italic" style={txtColor('#FF9800')}>blocking</S>
            </Text>
          </Slide>

          <CodeSlide
            transition={["slide"]}
            lang="js"
            code={code.callstack}
            ranges={[
              { loc: [0, 15], title: "Simple Example" },
              { loc: [0, 4], note: "define function \"getTheAnswer\"" },
              { loc: [5, 11], note: "define function askBro" },
              { loc: [11, 12], note: "call function askBro"},
              { loc: [6, 7], note: "enter function, skip on comment"},
              { loc: [7, 8], note: "skip on another comment"},
              { loc: [8, 9], note: "call getTheAnswer"},
              { loc: [1, 2], note: "silly comment again"},
              { loc: [2, 3], note: "here we got some answer"},
              { loc: [8, 9], note: "get back with return value \"42\""},
              { loc: [9, 10], note: "nothing to execute, exiting function"},
              { loc: [11, 12], note: "function executed"},
              { loc: [12, 13], note: "wow!", title: "That's all, Folks!" },
            ]}
          />
          
          <Slide note="there no DOM, timers, AJAX in JS engine">
            <Heading fit size={4} textColor="js_prime" style={shadowStyle('light')}>V8, SpiderMonkey, ChakraCore</Heading>
            <Heading size={3} textColor="#f5f5f5" style={shadowStyle('dark')}>heap + call stack</Heading>
            <Layout>
              <Fill>
                <Image src={images.engine.heap.replace("/", "")} height="400px"/>
              </Fill>
              <Fill>
                <Image src={images.engine.callstack.replace("/", "")} height="400px"/>
              </Fill>
            </Layout>
          </Slide>

          <CodeSlide
            transition={["slide"]}
            lang="js"
            code={code.calc}
            ranges={[
              { loc: [0, 17], title: "Wierd Math Example" },
              { loc: [0, 17], title: "y = x + x²" },
              { loc: [0, 3], note: "define \"sum\" function" },
              { loc: [4, 8], note: "define \"square\" function" },
              { loc: [8, 11], note: "define \"solve\" function" },
              { loc: [12, 15], note: "we want to log solution. let's see call stack" },
              { loc: [12, 15], note: "[ console.log(solve(12)) ]" },
              { loc: [13, 14], note: "[ solve(12) ]\n[ console.log(solve(12)) ]" },
              { loc: [8, 11], note: "[ solve(12) ]\n[ console.log(solve(12)) ]" },
              { loc: [9, 10], note: "[ sum(x, square(x)) ]\n[ solve(12) ]\n[ console.log(solve(12)) ]" },
              { loc: [9, 10], note: "[ square(x) ]\n[ sum(x, square(x)) ]\n[ solve(12) ]\n[ console.log(solve(12)) ]" },
              { loc: [4, 8], note: "[ square(x) ]\n[ sum(x, square(x)) ]\n[ solve(12) ]\n[ console.log(solve(12)) ]" },
              { loc: [5, 6], note: "[ x * x ]\n[ square(x) ]\n[ sum(x, square(x)) ]\n[ solve(12) ]\n[ console.log(solve(12)) ]" },
              { loc: [6, 7], note: "[ square(x) ]\n[ sum(x, square(x)) ]\n[ solve(12) ]\n[ console.log(solve(12)) ]" },
              { loc: [9, 10], note: "[ sum(x, square(x)) ]\n[ solve(12) ]\n[ console.log(solve(12)) ]" },
              { loc: [0, 4], note: "[ sum(x, square(x)) ]\n[ solve(12) ]\n[ console.log(solve(12)) ]" },
              { loc: [1, 2], note: "[ a + b ]\n[ sum(x, square(x)) ]\n[ solve(12) ]\n[ console.log(solve(12)) ]" },
              { loc: [2, 3], note: "[ sum(x, square(x)) ]\n[ solve(12) ]\n[ console.log(solve(12)) ]" },
              { loc: [9, 10], note: "[ solve(12) ]\n[ console.log(solve(12)) ]" },
              { loc: [10, 11], note: "[ solve(12) ]\n[ console.log(solve(12)) ]" },
              { loc: [12, 15], note: "[ console.log(solve(12)) ]" },
              { loc: [15, 16], note: React.createElement('span', { dangerouslySetInnerHTML: {__html: "&#x2728;"}})},
              { loc: [15, 16] }
            ]}
          />

          <CodeSlide
            transition={["slide"]}
            lang="js"
            code={code.callstackError}
            ranges={[
              { loc: [0, 17] },
              { loc: [0, 12], note: "defined functions" },
              { loc: [12, 14 ], note: "[ bar() ]" },
              { loc: [9, 11], note: "[ foo() ]\n[ bar() ]" },
              { loc: [5, 7], note: "[ oops() ]\n[ foo() ]\n[ bar() ]" },
              { loc: [1, 3], note: "[ oops() ]\n[ foo() ]\n[ bar() ]" },
              {
                loc: [1, 3],
                note: React.createElement('img', {
                  src: images.callstack.error,
                  style: { width: '100%' }
                })
              }
             ]}
          />

          <CodeSlide
            transition={["slide"]}
            lang="js"
            code={code.callstackLoop}
            ranges={[
              { loc: [0, 7] },
              { loc: [0, 4], note: "function 'foo' that calls itself" },
              { loc: [4, 6], note: "call foo()" },
              { loc: [1, 3], note: "[ foo() ]" },
              { loc: [1, 3], note: "[ foo() ]\n".repeat(2) },
              { loc: [1, 3], note: "[ foo() ]\n".repeat(3) },
              { loc: [1, 3], note: "[ foo() ]\n".repeat(5) },
              { loc: [1, 3], note: "[ foo() ]\n".repeat(7) },
              { loc: [1, 3], note: "[ foo() ]\n".repeat(13) },
              { loc: [1, 3], note: "[ foo() ]\n".repeat(21) },
              {
                loc: [1, 3],
                note: React.createElement('img', {
                  src: images.callstack.loop,
                  style: { width: '100%' }
                })
              }
             ]}
          />

          <Slide >
            <Heading fit size={2} textColor="js_prime" style={shadowStyle('light')}>
              …blocking…
            </Heading>
          </Slide>

          <CodeSlide
            transition={["slide"]}
            lang="js"
            code={code.blocking}
            ranges={[
              { loc: [0, 14], title: "Blocking" },
              { loc: [0, 9], note: '"sleep" function' },
              { loc: [9, 10], note: "[ console.log(…) ]" },
              { loc: [9, 10], note: " " },
              { loc: [10, 11], note: " [ sleep(10) ] " },
              {
                loc: [10, 11],
                note: React.createElement("img", {
                  src: "//media.giphy.com/media/l3V0BVDTyuMzwpS1i/giphy.gif",
                  width: 500,
                  style: {
                    display: "block",
                    margin: " auto"
                  }
                 })
              },
              { loc: [11, 12], note: '[ console.log(…) ]' },
              { loc: [12, 14], note: React.createElement('span', { dangerouslySetInnerHTML: {__html: "&#x2728;"}})}
            ]}
          />

          <Slide bgColor="js_slave">
            <Layout>
              <Fill>
                <Heading size={3} textColor="js_prime">index.html</Heading>
                <CodePane lang="html"
                      source={code.blockingDemo} />
              </Fill>
              <Fill>
                <Heading size={3} textColor="js_prime">browser</Heading>
                <div>&nbsp;</div>
                <SleepySpinny />
                <Link href="https://jsfiddle.net/d1wx1rjd/1/"
                      textColor="js_prime">jsfiddle.net/d1wx1rjd</Link>
              </Fill>
            </Layout>
          </Slide>

          <Slide bgColor="js_slave">
            <Layout>
              <Fill>
                <Heading size={3} textColor="js_prime">index.html</Heading>
                <CodePane lang="html"
                      source={code.blockingAjax} />
              </Fill>
              <Fill>
                <Heading size={3} textColor="js_prime">browser</Heading>
                <div>&nbsp;</div>
                <FakeAjax />
              </Fill>
            </Layout>
          </Slide>

          <Slide>
            <Heading size={4} fit textColor="js_prime" style={shadowStyle('light')}>…but, where is all async &#x2728; magic?!?!</Heading>
            <Appear fid="1">
              <Image src={images.fun.crying.replace("/", "")} width="60%"/>
            </Appear>
          </Slide>

          <Slide bgColor="js_slave">
            <Heading textColor="js_prime">the</Heading>
            <Heading fit textColor="js_prime">Browser</Heading>
          </Slide>

          <Slide note="">
            <Image height="80vh" src={images.browser.replace("/", "")} />
          </Slide>

          <Slide bgColor="js_slave">
            <Heading size={4} textColor="js_prime">How does setTimeout works?</Heading>

            <Layout>
              <Fill>
                <Heading size={5} textColor="#eee">code</Heading>
                <CodePane lang="js"
                      source={code.setTimeout} />
              </Fill>
              <Fill>
                <Heading size={5} textColor="#eee">console</Heading>
                <Timeouter />
              </Fill>
            </Layout>

          </Slide>

          <CodeSlide
            transition={["slide"]}
            lang="js"
            code={code.setTimeout}
            ranges={[
              { loc: [0, 9], title: "setTimeout", note: "" },
              { loc: [0, 1], note: "  " },
              { loc: [0, 1], note: "[ console.log(\"Hello\") ]" },
              { loc: [0, 1], note: React.createElement('span', { dangerouslySetInnerHTML: {__html: "&nbsp;"}}) },
              { loc: [2, 6], note: "[ setTimeout(...) ]" },
              { loc: [2, 6], note: "  " },
              { loc: [6, 7], note: "[ console.log(\"people!\") ]" },
              { loc: [7, 8], note: "  " },
              { loc: [7, 8], note: "[ anonymous function ]" },
              { loc: [3, 4], note: "[ console.log(\"Wargaming\") ]\n[ anonymous function ]" },
              { loc: [3, 4], note: "[ anonymous function ]" },
              { loc: [3, 4], note: "  " },
              {
                loc: [7, 8],
                note: React.createElement("a", {
                  target: "_blank",
                  href: "http://latentflip.com/loupe/?code=Y29uc29sZS5sb2coIkhlbGxvIik7CgpzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsKICBjb25zb2xlLmxvZygiV2FyZ2FtaW5nIik7Cn0sIDMwMDApOwoKY29uc29sZS5sb2coInBlb3BsZSEiKTsK!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D",
                  style: {
                    color: "yellow"
                  }
                }, "demo") },
            ]}
          />

          <CodeSlide
            transition={["slide"]}
            lang="js"
            code={code.ajax}
            ranges={[
              { loc: [0, 10], title: "AJAX" },
              { loc: [0, 1], note: "   " },
              { loc: [0, 1], note: "[ console.log(...) ]" },
              { loc: [0, 1], note: "   " },
              { loc: [2, 8], note: "[ $.getJSON(...) ]" },
              {
                loc: [2, 8],
                note: "   ",
                title: ajaxLoader
              },
              { loc: [9, 10], note: "   ", title: ajaxLoader },
              { loc: [9, 10], note: "[ console.log(...) ]", title: ajaxLoader },
              { loc: [9, 10], note: "   ", title: ajaxLoader },
              { loc: [10, 11], note: "   ", title: ajaxLoader },
              { loc: [10, 11], note: "   ", title: "XHR done" },
              { loc: [4, 7], note: "[ anonymous function  ]" },
              { loc: [5, 6], note: "[ console.log(data) ]\n[ anonymous function  ]" },
              { loc: [4, 7], note: "[ anonymous function  ]" },
              { loc: [10, 11], note: "   " }
            ]}
          />

          <Slide note="">
            <Image height="80vh" src={images.browser.replace("/", "")} />
          </Slide>

          <Slide bgColor="js_slave">
            <Heading fit size={3} textColor="js_prime">the Event Loop</Heading>
            <Appear fid="1">
              <Link href="http://latentflip.com/loupe/?code=Y29uc29sZS5sb2coIkhpISIpOwoKJC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIGNvbnNvbGUubG9nKCdZb3UgY2xpY2tlZCB0aGUgYnV0dG9uIScpOyAgICAKfSk7CgpzZXRUaW1lb3V0KGZ1bmN0aW9uIHRpbWVvdXQoKSB7CiAgICBjb25zb2xlLmxvZygiQ2xpY2sgdGhlIGJ1dHRvbiEiKTsKfSwgNTAwMCk7Cgpjb25zb2xlLmxvZygiV2VsY29tZSB0byBsb3VwZS4iKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D"
                    textColor="js_prime">demo time!</Link>
            </Appear>
          </Slide>

          <Slide>
            <Heading textColor="js_prime">Let's recap</Heading>
            <List>
              <Appear fid="1">
                <ListItem>
                  <Text>JavaScript is single threaded</Text>
                </ListItem>
              </Appear>
              <Appear fid="2">
                <ListItem>
                  <Text>Long operations cause <S type="bold">blocking</S></Text>
                </ListItem>
              </Appear>
              <Appear fid="3">
                <ListItem>
                  <Text>Call stack blocking cause <S type="bold">freezing</S></Text>
                </ListItem>
              </Appear>
              <Appear fid="4">
                <ListItem>
                  <Text>Async magic is a browser benefit</Text>
                </ListItem>
              </Appear>
            </List>
          </Slide>

          <Slide>
            <List>
              <ListItem>
                <Link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop">
                  MDN - Concurrency model and Event Loop
                </Link>
              </ListItem>
              <ListItem>
                <Link href="http://altitudelabs.com/blog/what-is-the-javascript-event-loop/">
                  What is the JavaScript Event Loop?
                </Link>
              </ListItem>
              <ListItem>
                <Link href="http://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/">
                  The JavaScript Event Loop: Explained
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.youtube.com/watch?v=8aGhZQkoFbQ">
                  Philip Roberts: What the heck is the event loop anyway? | JSConf EU 2014
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/">
                  IndexedDB, WebSQL, LocalStorage – what blocks the DOM?
                </Link>
              </ListItem>

            </List>
          </Slide>

        </Deck>
      </Spectacle>
    );
  }
}
