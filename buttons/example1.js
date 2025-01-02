// User Interface Variables
const button = document.querySelector(`[role="button"]`);
const dialog = document.querySelector("dialog");

button.addEventListener("click", function (event) {
	dialog.showModal();
}); // end click button.

button.addEventListener("keydown", function (event) {
	const key = event.code;
	if (key === "Enter" || key === "Space") {
		button.click();
	} // end if.
}); // end button key down.