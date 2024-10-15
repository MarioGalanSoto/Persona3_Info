document.addEventListener("DOMContentLoaded", () => {
    fetch("data/social_links.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("social-links-container");

            data.forEach(link => {
                const linkElement = document.createElement("div");
                linkElement.classList.add("social-link");

                // Create image element
                const image = document.createElement("img");
                image.src = `images/${link.Arcana}.png`;
                image.alt = `${link.Arcana} Arcana`;
                linkElement.appendChild(image);

                // Create title
                const title = document.createElement("h2");
                title.textContent = `${link.Arcana} - ${link.Name}`;
                linkElement.appendChild(title);

                // Create a div for more information (hidden by default)
                const moreInfoDiv = document.createElement("div");
                moreInfoDiv.classList.add("more-info");

                // Create a "Show Less" button at the top of the expanded content
                const topToggleButton = document.createElement("button");
                topToggleButton.classList.add("toggle-button");
                topToggleButton.textContent = "Show Less";
                moreInfoDiv.appendChild(topToggleButton);

                // Create availability paragraph
                const availability = document.createElement("p");
                availability.textContent = `Availability: ${link.Availability}`;
                moreInfoDiv.appendChild(availability);

                // Create how to unlock paragraph
                const unlock = document.createElement("p");
                unlock.textContent = `How to Unlock: ${link.How_to_Unlock}`;
                moreInfoDiv.appendChild(unlock);

                // Create responses container
                const responsesContainer = document.createElement("div");
                responsesContainer.classList.add("rank-responses");

                Object.keys(link.Responses).forEach(rank => {
                    const rankElement = document.createElement("div");
                    rankElement.classList.add("rank-response");

                    const rankTitle = document.createElement("p");
                    rankTitle.innerHTML = `<strong>${rank}:</strong>`;
                    rankElement.appendChild(rankTitle);

                    // Add options for each rank
                    for (let option in link.Responses[rank]) {
                        const optionElement = document.createElement("p");
                        optionElement.textContent = `${option}: ${link.Responses[rank][option]}`;
                        rankElement.appendChild(optionElement);
                    }

                    responsesContainer.appendChild(rankElement);
                });

                moreInfoDiv.appendChild(responsesContainer);

                // Create a "Show Less" button at the bottom of the expanded content
                const bottomToggleButton = document.createElement("button");
                bottomToggleButton.classList.add("toggle-button");
                bottomToggleButton.textContent = "Show Less";
                moreInfoDiv.appendChild(bottomToggleButton);

                linkElement.appendChild(moreInfoDiv);

                // Create the initial "Show More" button
                const toggleButton = document.createElement("button");
                toggleButton.classList.add("toggle-button");
                toggleButton.textContent = "Show More";
                linkElement.appendChild(toggleButton);

                // Add event listener to show more/less functionality
                const toggleVisibility = (shouldShow) => {
                    if (shouldShow) {
                        moreInfoDiv.style.display = "block";
                        toggleButton.textContent = "Show Less";
                    } else {
                        moreInfoDiv.style.display = "none";
                        toggleButton.textContent = "Show More";
                    }
                };

                // Event listeners for both "Show More/Less" buttons
                toggleButton.addEventListener("click", () => toggleVisibility(moreInfoDiv.style.display === "none" || !moreInfoDiv.style.display));
                topToggleButton.addEventListener("click", () => toggleVisibility(false));
                bottomToggleButton.addEventListener("click", () => toggleVisibility(false));

                container.appendChild(linkElement);
            });
        })
        .catch(error => console.error("Error loading social links data:", error));
});
