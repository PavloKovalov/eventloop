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
  callstack: require("raw!../assets/callstack.example"),
  callstackError: require("raw!../assets/callstack_error.example"),
  callstackLoop: require("raw!../assets/callstack_loop.example")
};

const images = {
  eventLoop: require("../assets/event_loop.svg"),
  wut: require("../assets/wut.gif"),
  city: require("../assets/city.jpg"),

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
    crying: require("../assets/but_where.png")
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
          
          <Slide >
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
              { loc: [12, 14 ], note: "" },
              { loc: [9, 11], note: "" },
              { loc: [5, 7], note: "" },
              { loc: [1, 3], note: "" },
              { loc: [1, 3], title: React.createElement('img', { src: images.callstack.error, style: { width: '700px', zIndex: 1000 } }) }
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
              { loc: [1, 3], note: "[ foo() ]\n[ foo() ]" },
              { loc: [1, 3], note: "[ foo() ]\n[ foo() ]\n[ foo() ]" },
              { loc: [1, 3], note: "[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]" },
              { loc: [1, 3], note: "[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]" },
              { loc: [1, 3], note: "[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]" },
              { loc: [1, 3], note: "[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]\n[ foo() ]" },
              {
                loc: [1, 3],
                title: React.createElement('img', { src: images.callstack.loop, style: { width: '700px' } })
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
              { loc: [9, 10], note: '[ console.log(…) ]' },
              {
                loc: [10, 11],
                note: '[ sleep(10) ]',
                title: React.createElement('img', { src: '//media.giphy.com/media/l3V0BVDTyuMzwpS1i/giphy.gif', width: 480, height: 253 })
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

          <Slide>
            <Heading size={4} fit textColor="js_prime" style={shadowStyle('light')}>…but, where is all async &#x2728; magic?!?!</Heading>
            <Appear fid="1">
              <Image src={images.fun.crying.replace("/", "")} width="60%"/>
            </Appear>
          </Slide>

          <Slide>
            <Heading size={4}>consider async is...</Heading>
            <List>
              <Appear fid="1">
                <ListItem>
                  <Text>DOM Events</Text>
                </ListItem>
              </Appear>
              <Appear fid="2">
                <ListItem>
                  <Text>Timeouts</Text>
                </ListItem>
              </Appear>
              <Appear fid="3">
                <ListItem>
                  <Text>AJAX</Text>
                </ListItem>
              </Appear>
              <Appear fid="4">
                <ListItem>
                  <Text>Web Workers</Text>
                </ListItem>
              </Appear>
              <Appear fid="5">
                <ListItem>
                  <Text>and more…</Text>
                </ListItem>
              </Appear>
            </List>

          </Slide>

        </Deck>
      </Spectacle>
    );
  }
}
