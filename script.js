// Load the social links data and dynamically create the content
document.addEventListener("DOMContentLoaded", () => {
    fetch("data/social_links.json")
        .then(response => response.json())
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

                // Create availability paragraph
                const availability = document.createElement("p");
                availability.textContent = `Availability: ${link.Availability}`;
                linkElement.appendChild(availability);

                // Create how to unlock paragraph
                const unlock = document.createElement("p");
                unlock.textContent = `How to Unlock: ${link.How_to_Unlock}`;
                linkElement.appendChild(unlock);

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

                linkElement.appendChild(responsesContainer);
                container.appendChild(linkElement);
            });
        })
        .catch(error => console.error("Error loading social links data:", error));
});
