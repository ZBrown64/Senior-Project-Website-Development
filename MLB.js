// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, limit, getDocs, where } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3w_CDjVPk7Gl_A4nEQui0N1sfnqJfOCE",
  authDomain: "senior-project-database-43810.firebaseapp.com",
  databaseURL: "https://senior-project-database-43810-default-rtdb.firebaseio.com",
  projectId: "senior-project-database-43810",
  storageBucket: "senior-project-database-43810.firebasestorage.app",
  messagingSenderId: "269383807196",
  appId: "1:269383807196:web:9efa7b3b422e5f17c78419",
  measurementId: "G-ZDNYVGHXHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getArticles() {

    let docCollection = query(
        collection(db, "sports_news"),
        orderBy("timestamp", "desc"),
        where('category', "==", "MLB"),
        limit(20)
    );

    const snapshot = await getDocs(docCollection);
    let articles = [];

    snapshot.forEach(doc => {
        articles.push(
            {
                id: doc.id,
                title: doc.data().title,
                author: doc.data().author,
                source: doc.data().source,
                bullet_1: doc.data().bullet_1,
                bullet_2: doc.data().bullet_2,
                bullet_3: doc.data().bullet_3,
                image_url: doc.data().image_url,
                timestamp: doc.data().timestamp,
                category: doc.data().category,
                url: doc.data().url
            }
        );
    });
    return articles;
}

function displayArticles(articles) {
    const container = document.getElementById("articlecontainer");
    container.innerHTML = "";

    articles.forEach(article => {
        const articleDiv = document.createElement("div");
        articleDiv.className = "article";
        articleDiv.innerHTML = `
            <h3>${article.title}</h3>
            <img src="${article.image_url}" alt="Article Image" style="height:250px;width:350px;">
            <h4>${article.author} - ${article.source}</h4>
            <div class="bullets">
                <p>AI Summary</p>
                <p>${article.bullet_1}</p>
                <p>${article.bullet_2}</p>
                <p>${article.bullet_3}</p>
            </div>
        `;
        container.appendChild(articleDiv);
    });
}

document.addEventListener("DOMContentLoaded", async function() {
    const articles = await getArticles();
    displayArticles(articles);
});