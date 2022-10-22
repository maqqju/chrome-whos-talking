const config = { attributes: true, childList: true, subtree: true };
const logs = [];

const observer = new MutationObserver((mutationList, _obs) => {
	for (const mutation of mutationList) {
		if (mutation.addedNodes) {
			mutation.addedNodes.forEach((n) => {
				if(n.classList && n.classList.contains("participants-icon__voip-speaking-icon")) {
                    const parentContainer = n.parentElement.parentElement.parentElement.parentElement;
                    const name = parentContainer.querySelector(".participants-item__display-name").innerHTML;
                    console.log(`${name} is speaking`);
                    logs.push(Date.now());
				}
			})
		}
	}});


observer.observe(document.getElementById("participants-ul"),config);