// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Quote,
  S,
  Slide,
  Spectacle,
  Text
} from "spectacle";
import CodeSlide from "spectacle-code-slide";
import SleepySpinny from "../assets/spinner";
import FakeAjax from "../assets/fake-ajax";
import Timeouter from "../assets/set-timeout";

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
  jsPrime: "#f3df49",
  jsSlave: "#2e2e2c"
});

export default class Presentation extends React.Component {
  render() {
    const txtColor = (v) => ({
      color: v
    });

    const shadowStyle = (style) => {
      const shaddow = {
        dark: "4px -2px 0 #333",
        light: "-1px 1px 0 #666"
      };

      return {
        textShadow: shaddow[style]
      };
    };

    const ajaxLoader = <div>XHR<img height="56px" src={ images.hourglass.replace("/", "") }/></div>;

    return (
      <Spectacle theme={ theme }>
        <Deck transition={ ["fade"] } progress="pacman">
          <Slide bgColor="jsSlave">
            <Heading size={1} caps lineHeight={1} textColor="white">
              How does
            </Heading>
            <Heading size={1} fit textColor="jsPrime">
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

          <Slide transition={ ["slide"] } notes="You can even put notes on your slide. How awesome is that?" bgColor="jsSlave">
            <BlockQuote>
              <Quote textColor="white">JavaScript is a</Quote>
              <Quote textColor="jsPrime">high-level,</Quote>
              <Quote textColor="jsPrime">dynamic,</Quote>
              <Quote textColor="jsPrime">untyped,</Quote>
              <Quote textColor="jsPrime">interpreted</Quote>
              <Quote textColor="white">programming language</Quote>
              <Cite>Wikipedia</Cite>
            </BlockQuote>
          </Slide>

          <Slide transition={ ["slide"] } bgColor="black" notes="">
            <Heading size={1} fit textColor="#f3df49">
              JavaScript
            </Heading>
            <Heading size={1}>
              in the Browser
            </Heading>
          </Slide>

          <Slide transition={ ["slide"] } notes="Before diving into the event loop, we need a basic understanding of the JavaScript Engine and what it does." bgColor="jsSlave">
            <BlockQuote>
              <Quote textColor="white">A JavaScript engine is an interpreter that interprets JavaScript source code and executes the script accordingly.</Quote>
              <Cite>Wikipedia</Cite>
            </BlockQuote>
          </Slide>

          <Slide transition={ ["slide"] }>
            <Heading size={2} textColor="white">
              JavaScript Engine
            </Heading>
            <Text bold fit>
              it’s job is to go through all the lines of JavaScript in an application
            </Text>
            <Text bold fit>
              and process them <span style={ txtColor("#ddd") }>one at a time</span>
            </Text>
            <Text italic bold fit textColor="jsPrime">
              single-threaded
            </Text>
            <Text fit bold>
              <span style={ txtColor("#ddd") }>long</span> operations cause <S type="italic" style={ txtColor("#FF9800") }>blocking</S>
            </Text>
          </Slide>

          <CodeSlide
            transition={ ["slide"] }
            lang="js"
            code={ code.callstack }
            ranges={[
              { loc: [0, 15], title: "Let's do like an engine" },
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
              { loc: [12, 13], note: "wow!", title: "That's all, Folks!" }
            ]} />

          <Slide notes="what engine consists of<br>
          the heap - for memory allocation<br>
          callstack - the sake of execution">
            <Heading fit size={4} textColor="jsPrime" style={ shadowStyle("light") }>V8, SpiderMonkey, ChakraCore</Heading>
            <Heading size={3} textColor="#f5f5f5" style={ shadowStyle("dark") }>heap + call stack</Heading>
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
            transition={ ["slide"] }
            lang="js"
            code={ code.calc }
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
              { loc: [15, 16], note: React.createElement("span", { dangerouslySetInnerHTML: {__html: "&#x2728;"}})},
              { loc: [15, 16] }
            ]} />

          <CodeSlide
            transition={ ["slide"] }
            lang="js"
            code={ code.callstackError }
            notes="what's happen when error occur<br>
            let's simulate an error thrown<br>
            error stops execution<br>"
            ranges={[
              { loc: [0, 17], title: "Errors" },
              { loc: [0, 12], note: "defined functions" },
              { loc: [12, 14 ], note: "[ bar() ]" },
              { loc: [9, 11], note: "[ foo() ]\n[ bar() ]" },
              { loc: [5, 7], note: "[ oops() ]\n[ foo() ]\n[ bar() ]" },
              { loc: [1, 3], note: "[ oops() ]\n[ foo() ]\n[ bar() ]" },
              {
                loc: [1, 3],
                note: React.createElement("img", {
                  src: images.callstack.error.replace("/", ""),
                  style: { width: "100%" }
                })
              }
            ]} />

          <CodeSlide
            transition={ ["slide"] }
            lang="js"
            notes="to understand recursion you must understand recursion<br>
            but js engine doesn't care<br>
            it will watch for your code<br>
            and prevent long execution"
            code={ code.callstackLoop }
            ranges={[
              { loc: [0, 7], title: "Recursion" },
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
                note: React.createElement("img", {
                  src: images.callstack.loop.replace("/", ""),
                  style: { width: "100%" }
                })
              }
            ]} />

          <Slide notes="what does it mean from engine point?">
            <Heading fit size={2} textColor="jsPrime" style={ shadowStyle("light") }>
              …blocking…
            </Heading>
          </Slide>

          <CodeSlide
            transition={ ["slide"] }
            lang="js"
            notes="consider we have long running function<br>
            executing this function will block call stack<br>
            as it's run code lines one after the other<br>
            it's not going to do something before heavy calculations is done"
            code={ code.blocking }
            ranges={[
              { loc: [0, 14], title: "Blocking" },
              { loc: [0, 9], note: "\"sleep\" function" },
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
              { loc: [11, 12], note: "[ console.log(…) ]" },
              { loc: [12, 14], note: React.createElement("span", { dangerouslySetInnerHTML: {__html: "&#x2728;"}})}
            ]} />

          <Slide bgColor="jsSlave"
            notes="what does it mean from browser point<br>
            if we call some have computation<br>
            browser will be 'frozen'<br>
            and won't react until callstack is unblocked">
            <Layout>
              <Fill>
                <Heading size={3} textColor="jsPrime">index.html</Heading>
                <CodePane lang="html" source={ code.blockingDemo } />
              </Fill>
              <Fill>
                <Heading size={3} textColor="jsPrime">browser</Heading>
                <div>&nbsp;</div>
                <SleepySpinny />
                <Link href="https://jsfiddle.net/d1wx1rjd/1/"
                  textColor="jsPrime">jsfiddle.net/d1wx1rjd</Link>
              </Fill>
            </Layout>
          </Slide>

          <Slide notes="most slow op is a I/O<br>
          let's think of ajax when we talk about browser<br>
          networking is slow and has a bunch of stuff to do<br>
          not only bytes transfer – dns, https, redirects<br>
          then we need to decode recieved bytes<br>
          translate them in language object<br>
          so if ajax would be sync end user will have problems" bgColor="jsSlave">
            <Layout>
              <Fill>
                <Heading size={3} textColor="jsPrime">index.html</Heading>
                <CodePane lang="html" source={ code.blockingAjax } />
              </Fill>
              <Fill>
                <Heading size={3} textColor="jsPrime">browser</Heading>
                <div>&nbsp;</div>
                <FakeAjax />
              </Fill>
            </Layout>
          </Slide>

          <Slide>
            <Heading size={4} fit textColor="jsPrime" style={ shadowStyle("light") }>…but, where is all async &#x2728; magic?!?!</Heading>
            <Appear fid="1">
              <Image src={images.fun.crying.replace("/", "")} width="60%"/>
            </Appear>
          </Slide>

          <Slide bgColor="jsSlave">
            <Heading textColor="jsPrime">the</Heading>
            <Heading fit textColor="jsPrime">Browser</Heading>
          </Slide>

          <Slide notes="exept JS engine browser has plenty of stuff</br>
          WEB APIs - the web platform parts<br>
          callback queue and mysterious event loop">
            <Heading size={2} textColor="jsPrime">browser internals</Heading>

            <Image height="80vh" src={images.browser.replace("/", "")} />
          </Slide>

          <Slide notes="let's start on simple and check how timeout works" bgColor="jsSlave">
            <Heading size={4} textColor="jsPrime">How does setTimeout works?</Heading>

            <Layout>
              <Fill>
                <Heading size={5} textColor="#eee">code</Heading>
                <CodePane lang="js"
                  source={ code.setTimeout } />
              </Fill>
              <Fill>
                <Heading size={5} textColor="#eee">console</Heading>
                <Timeouter />
              </Fill>
            </Layout>

          </Slide>

          <CodeSlide
            transition={ ["slide"] }
            lang="js"
            notes="to understand it we need to became JS engine again<br>
            assume black bar in bottom represent our callstack"
            code={ code.setTimeout }
            ranges={[
              { loc: [0, 9], title: "setTimeout", note: "" },
              { loc: [0, 1], note: "  " },
              { loc: [0, 1], note: "[ console.log(\"Hello\") ]" },
              { loc: [0, 1], note: React.createElement("span", { dangerouslySetInnerHTML: {__html: "&nbsp;"}}) },
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
                }, "demo") }
            ]} />

          <CodeSlide
            transition={ ["slide"] }
            lang="js"
            notes="oh well! what about ajax?<br>
            spinning hourglasses means that web api executes some call"
            code={ code.ajax }
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
            ]} />

          <Slide note="">
            <Image height="80vh" src={images.browser.replace("/", "")} />
          </Slide>

          <Slide bgColor="jsSlave">
            <Heading fit size={3} textColor="jsPrime">the Event Loop</Heading>
            <Appear fid="1">
              <Link href="http://latentflip.com/loupe/?code=Y29uc29sZS5sb2coIkhpISIpOwoKJC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIGNvbnNvbGUubG9nKCdZb3UgY2xpY2tlZCB0aGUgYnV0dG9uIScpOyAgICAKfSk7CgpzZXRUaW1lb3V0KGZ1bmN0aW9uIHRpbWVvdXQoKSB7CiAgICBjb25zb2xlLmxvZygiQ2xpY2sgdGhlIGJ1dHRvbiEiKTsKfSwgNTAwMCk7Cgpjb25zb2xlLmxvZygiV2VsY29tZSB0byBsb3VwZS4iKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D"
                textColor="jsPrime">demo time!</Link>
            </Appear>
          </Slide>

          <Slide bgColor="#333">
            <Heading size={2} textColor="jsPrime">Let's recap</Heading>
            <List textColor="#eee">
              <Appear>
                <ListItem>
                  <Heading size={4} textColor="#eee">JavaScript is single threaded*</Heading>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <Heading size={4} textColor="#eee">Long operations cause blocking</Heading>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <Heading size={4} textColor="#eee">Call stack blocking cause “freezing”</Heading>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <Heading size={4} textColor="#eee">Async magic is a browser benefit</Heading>
                </ListItem>
              </Appear>
            </List>
          </Slide>

          <Slide>
            <Heading size={5} textColor="jsPrime">Useful Links</Heading>

            <List>
              <ListItem>
                <Link textColor="black" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop">
                  MDN - Concurrency model and Event Loop
                </Link>
              </ListItem>
              <ListItem>
                <Link textColor="black" href="http://altitudelabs.com/blog/what-is-the-javascript-event-loop/">
                  What is the JavaScript Event Loop?
                </Link>
              </ListItem>
              <ListItem>
                <Link textColor="black" href="http://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/">
                  The JavaScript Event Loop: Explained
                </Link>
              </ListItem>
              <ListItem>
                <Link textColor="black" href="https://www.youtube.com/watch?v=8aGhZQkoFbQ">
                  Philip Roberts: What the heck is the event loop anyway? | JSConf EU 2014
                </Link>
              </ListItem>
              <ListItem>
                <Link textColor="black" href="https://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/">
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
