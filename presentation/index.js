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
  Markdown,
  Quote,
  S,
  Slide,
  Spectacle,
  Text
} from "spectacle";
import CodeSlide from 'spectacle-code-slide';

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const code = {
  callstack: require("raw!../assets/callstack.example")
}

const images = {
  eventLoop: require("../assets/event_loop.svg"),
  wut: require("../assets/wut.gif"),
  city: require("../assets/city.jpg"),
};

preloader(images);

const theme = createTheme({
  primary: "gray", // "#ff4081",
  js_prime: "#f3df49",
  js_slave: "#2e2e2c"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["zoom", "slide"]} transitionDuration={500} progress="bar">
          <Slide transition={["zoom"]} bgColor="js_slave">
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
              <Quote>JavaScript is a</Quote>
              <Quote textColor="js_prime">high-level,</Quote>
              <Quote textColor="js_prime">dynamic,</Quote>
              <Quote textColor="js_prime">untyped,</Quote>
              <Quote textColor="js_prime">interpreted</Quote>
              <Quote>programming language</Quote>
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
              <Quote>A JavaScript engine is an interpreter that interprets JavaScript source code and executes the script accordingly.</Quote>
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
              and process them one at a time
            </Text>
            <Text italic bold fit textColor="js_prime">
              single-threaded
            </Text>
            <Text fit bold>
              long operations cause <S type="italic" textColor="white">blocking</S>
            </Text>
          </Slide>

          <CodeSlide
            transition={["slide"]}
            lang="js"
            code={code.callstack}
            ranges={[
              { loc: [0, 15], title: "Simple Example" },
              { loc: [0, 15], title:"The Call Stack" },
              { loc: [0, 4], title:"The Call Stack", note: "define function \"getTheAnswer\"" },
              { loc: [5, 11], note: "define function askBro" },
              { loc: [11, 12], note: "call function askBro"},
              { loc: [6, 7], note: "enter function, skip on comment"},
              { loc: [7, 8], note: "skip on another comment"},
              { loc: [8, 9], note: "call getTheAnswer"},
              { loc: [1, 2], note: "silly coment again"},
              { loc: [2, 3], note: "here we got some answer"},
              { loc: [8, 9], note: "get back with return value \"42\""},
              { loc: [9, 10], note: "nothing to execute, exiting function"},
              { loc: [12, 13], note: "whoa!", title: "That's all, Folks!" },
            ]}/>
         
        </Deck>
      </Spectacle>
    );
  }
}
