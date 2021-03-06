# Chisel
A lightweight responsive framework.

## Goals:
- Rely on CSS as much as possible
	+ Use dry selectors as much as possible
- Completely prevent FOUC
- Code that is unique to the page should stay in the page's markup via data attributes or classes (if its not reusable for another page)
- Rely on JS as little as possible
	+ JS should only be used to activate CSS classes and for event handling
- Keep markup as symantic and short as possible
- No dependencies on outside libraries or other modules or baked-in hooks
- Never use images for UI

## To-Do:
- Change gulp tasks to new gulp boilerplate
- Change JS files to CommonJS modules
- find a way of transitioning hamburger icon hover colors without affecting animation
- allow modular import of sass files
	+ place media queries in seperate file?
- prepend all src files with banner
- If dist is not in .gitignore, rebuild before every push
- Move new git tasks to boilerplate
- Recycle one off modal elements (things like error messages)
- Form validation: js
- Include/exclude sass modules with sass variables
- Include backend template support?
	- Use Dexie to save content?
- Dexie for database support
