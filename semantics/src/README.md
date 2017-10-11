The Semantics! library is a JavaScript library for making interpreters of structured text. It makes it possible to use simpler regular expressions when parsing text, by providing dynamic versions of groups, quantifiers and disjunctions, i. e. (), ?, *, + and |. This allows for regular expressions with better readability that are easier to debug. It is also possible (and quite easy) to make complex recursive definitions. 

Unlike with regular expressions, interpreters built with Semantics! are capable of parsing from the top level to the smallest part in one definition. It does this by returning a parse tree datastructure with nested arrays and objects.

Besides from building datastructures, it is possible to accompany each level of the definition with an anonymous function that will describe how the result of that level should be interpreted. It is also possible to delay the evaluation of such interpretations, making it possible to build interpreters. 

<a href="../SpecRunner.html?inception=false">Run test cases</a>. It might be 
necessary to specify the path to the InterpreterMethodFactory.js file for the 
first test to run.

<a href="../SpecRunner.html">Run test cases inception style</a>. An interpreter built with Semantics! is used to interpret the source code of Semantics!. Then the test cases are run on that interpretation. Then the interpreter is built with the interpretation and the testcases of the interpreter is run on that. It should take approximately 50 times longer. If you are running the test cases from a local file (the file:// protocol), the test cases cant read the source code automatically, for security reasons, so you have to locate them manually. Otherwise the tests will run on the normal Semantics!.

<h3>Installation</h3>

Download this file: 
<a href="../src/InterpreterMethodFactory.js">InterpreterMethodFactory.js</a> 
and put it in your project folder. 
Include the file in your html:

    &lt;html&gt;
      &lt;head&gt;
        &lt;script src="InterpreterMethodFactory.js"&gt;
      &lt;/head&gt;
    &lt;/html&gt;

