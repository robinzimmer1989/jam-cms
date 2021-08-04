# Editor

## Sidebar

There are a few options for the editor sidebar you can change on the jamCMS settings page:

- Position (Left, Right)
- Default Status (Open, Closed)
- Style (Inline, Scale, Overflow)

Especially for 'Style' it's important to understand the advantages and disadvantages for each option:

- Inline: Display sidebar and page next to each other. Because of this, breakpoints are not accurate anymore. To solve this issue jamCMS is passing an 'open' property to the page template which you can use to render the breakpoint conditionally.
- Scale: Display sidebar and page next to each other, but the page is scaled down with CSS. The breakpoints are working as expected, but position fixed elements will become static and the dimensions are off by design.
- Overflow: Display sidebar on top of page. Everything will work as expected but the user might not see content updates right away when the sidebar is overflowing.
