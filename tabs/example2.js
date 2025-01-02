// User Interface Variables
const tablist = document.querySelector(`[role="tablist"]`);
const tabs = document.querySelectorAll(`[role="tab"]`);
const tabpanels = document.querySelector("#tabpanels");

// User Interface Functions

/** 
 * selectTab
 * Programmatically sets up the tab as being selected, keyboard focusable, and reveals the related panel.
 * @param [node] el - the node for a tab that should be selected.
 */
const selectTab = function (el) {
	// Select the tab.
	el.setAttribute("aria-selected", "true");
	el.setAttribute("tabindex", "0")

	// Reveal the related tab panel.
	let panelID = el.getAttribute("aria-controls");
	document.querySelector(`#${panelID}`).hidden = false;

}; // end selectTab.

/** 
 * deselectTab
 * Deselect a selected tab and hide its associated panel.
 * @param [node] el - the element of the tab widget.
 */
const deselectTab = function (el) {
	// Deselect the tab.
	el.removeAttribute("aria-selected");
	el.setAttribute("tabindex", "-1");

	// Hide the associated panel
	let panelID = el.getAttribute("aria-controls");
	document.querySelector(`#${panelID}`).hidden = true;
}; // end deselectTab.

// Main Code.
tablist.addEventListener("click", function (event) {
	let target = event.target;

	// Don't execute click code if this is not an element with role is tab.
	if (target.getAttribute("role") !== "tab")  {
		return;
	} // end if.

	// Deselect currently selected tab.
	let currentTab = tablist.querySelector(`[aria-selected="true"]`);
	deselectTab(currentTab);

	// Select clicked tab.
	selectTab(target);

	target.focus();

}); // end click tabs in tablist.

tablist.addEventListener("keydown", function (event) {
	// Don't execute the code if the role is not set to tab.
	if (event.target.getAttribute("role") !== "tab") {
		return;
	} // end if.

	let oldTab = event.target;
	let newTab;
	let key = event.key;

	switch (key) {
		case "ArrowRight":
		case "ArrowDown":
			newTab = oldTab.nextElementSibling;
			// If at the end of the tabs, select the first tab in the group.
			if (!newTab) {
				newTab = oldTab.parentElement.firstElementChild;
			} // end if.
			break;
		case "ArrowLeft":
		case "ArrowUp":
			newTab = oldTab.previousElementSibling;
			// If there is no previous tab, select the last tab.
			if (!newTab) {
				newTab = oldTab.parentElement.lastElementChild;
			} // end if
			break;
		case "End":
			newTab = oldTab.parentElement.lastElementChild;
			break;
	case "Home":
		newTab = oldTab.parentElement.firstElementChild;
		break;
	default:
		// Do nothing.
	}

	// Update the selected tab if it changed.
	if (newTab) {
		deselectTab(oldTab);
		selectTab(newTab);
		newTab.focus();
	} // end if.

}); // end tablist key down.