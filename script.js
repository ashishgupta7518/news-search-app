const apikey = "180eeeda31a8408283af21558f6235f9";

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")


async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;

        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;

    } catch (error) {
        console.error("Error fetching random news", error);
        return [];

    }
}


searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim()
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)

        } catch (error) {
            console.log("Error Fetching news by query")
        }
    }
})

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey} `;

        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;

    } catch (error) {
        console.error("Error fetching random news", error);
        return [];

    }

}
function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((articale) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = articale.urlToImage;
        img.alt = articale.title;
        const title = document.createElement("h2")
        const truncatedTitle = articale.title.length > 30 ? articale.title.slice(0, 30) + "....." : articale.title
        title.textContent = truncatedTitle

        const truncatedDes = articale.description.length > 30 ? articale.title.slice(0, 100) + "....." : articale.description
        const description = document.createElement("p")
        description.textContent = truncatedDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(articale.url, "_blank")
        })
        blogContainer.appendChild(blogCard);

    });

}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})()