Step To Step Guide by MOODY to make The Code Magazine Project

<----- Part 1 ----->
1) Create a folder --> index.html --> Create the basic stucture of HTML 
2) Deal with text elements first like h1,h2,h3,p and list and use bold and italics when needed
3) Add images and resize them using attributes
4)Specifing Hyperlinks 
5) Structure the page using sementic HTML Tags like header atricle footer nav.

<----- Part 2 ----->
1) Style text elements.
2) Combining Selectors.
3) classes and IDs addition
4) Colors and Background colors
5) pseudo classes and ancore
6) Adding Margin and padding (important phenomenon of Collapsing Margins where two margins do not get added up)
7) Adding dimentions using hight and width properties
8) center page using div
9) change the display property of nav links
10)add like button and understand about positioning
11) Making a top element using css ::after pseudo element (it create a last child element)

<-----Layout----->
1) use the float to adjust author pic and author and the nav bar in main header 
2)Solve the problem of collapesed main header height after using float on it's child elements but using clearfix trick
3)Demonstartion of float layout
4)Border box demonstration
5)Flexbox method
6)CSS Grid method

Side Notes:
Theory 1 : Conflicts between selectors(!important -> inline -> ID(if multiple then last)->classes/pseudo classes(if multiple then last)->elements(if multiple then last->universal selector(*)))
Theory 2: inheritance and the universal selector (not all properties are inheriate in elements few are but in universal selector no concept of inheritance is involved it just applies to all elements)
Theory 3: The CSS Box Model (https://www.w3schools.com/css/css_boxmodel.asp)
Theory 4: Type of boxes(property : display)( Block(occupy 100% of parent elements width, stacked vertically, box model applied as showed earlier), Inline(take up space neccessary for it's content, no line-breaks, height and widths do not apply, padding and margine are applied only horizontally left and right), Inline-Block(inline from outside block from inside,content's space, no line break, box model applies, eg. images))
Theory 5: Positioning(Normal Flow(Default positioning, elements is "in flow", elements are laid out acoording to their order in the HTML code(position:relative)), Absolute positioning ("out of flow",no impact on surrounding elements and might overlap them, we use top bottom left or right to ofset the element from it's relatively positioned container(position:absolute)))

Understanding Layouts : 

Building a Layout: arranging page elements into a visual stucture, instead of simply having them placed one after another (normal flow)

Paye layout Vs Component Layout : Structuring page is paye layout while Structuring components inside that page is called Component layout

The 3 Ways of building layouts with CSS:

Float layout : The old way of building layouts of all sizes using the float CSS property. Still used but getting outdated fast. Float basically remove the element from it's normal flow same as absolute positioning (margin will still be applied), the things which makes it different from absolute positioning are that Text and inline elements will wrap around the floated element and the container will not adjust its height to the element.

Flexbox : Mordern way of laying out elements in a 1-dimension row without using floats. Perfect for component layout.
The main idea behind flexbox is the empty space inside a container element can be automatically divided by its child elements
Flexbox makes it easy to automatically align items to one another inside a parent container, both horizontally and vertically
Flexbox solves commom problems such as vertical centering and creating equal-height columns
Flexbox is perfect for replacing float, allowing us to write fewer and cleaner HTML and CSS Code 

<---Flexbox Terminology--->
Flex container (display:flex)(properties: gap, justify-content, align-item, flex-direction, flex-wrap, align-content)
Flex items (properties: align-self, flex-grow, flex-shrink, flex-basis, flex, order)
main axis 
cross axis

CSS Grid : For laying out elements in a fully fledged 2-dimensional grid. Perfect for page layouts and complex componets. The main idea behind CSS grid is the we divide a container elementinto rows and columns that can be filled with its child elements. In 2d context, css grid allows us to write less nested HTML and easier-to-read CSS. Grid is not meant to replace flexbox! instead they work together depending on the layout.

<---CSS Grid Terminology--->
Grid container (display:grid)(properties : grid-template-rows, grid-templete-columns, row-gap, column-gap, justify-items, align-items, justify-content, align-content)
Grid items(properties: grid-column, grid-row, justify-self, align-self)
Column axis
Row axis  
Grid lines
Grid cell(might be filled by a grid item or not)
Gutters (gaps)
Grid tracks 