// Ajoute un écouteur d'événements sur l'élément avec l'ID 'fetchWeather'.
// Cela déclenche la fonction asynchrone lorsqu'un utilisateur clique sur ce bouton.
document.getElementById('fetchWeather').addEventListener('click', async function () {
    
    // URL de l'API Open-Meteo qui permet d'obtenir des prévisions météo horaires et quotidiennes.
    // Cette URL inclut les paramètres de latitude, longitude et les données que l'on souhaite récupérer (température, précipitations, vent, etc.)
    const url = "https://api.open-meteo.com/v1/forecast?latitude=31.5085&longitude=-9.7595&hourly=temperature_2m,precipitation,wind_speed_10m&daily=sunrise,sunset&timezone=auto";
    
    try {
        // Envoie une requête HTTP avec la méthode GET (qui est par défaut pour fetch) à l'API.
        // On précise aussi l'en-tête "Content-Type" comme "application/json" pour indiquer que l'on attend une réponse en JSON.
        const response = await fetch(url, {
            method: 'GET',  // Indique explicitement que la méthode de la requête est GET
            headers: {
                'Content-Type': 'application/json',  // L'API renvoie des données au format JSON
            },
        });

        // Vérifie si la réponse est correcte (statut HTTP 200). Si ce n'est pas le cas, une erreur est lancée.
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }

        // Récupère la réponse de l'API sous forme de JSON
        const data = await response.json();
        
        // Extrait les données horaires de l'API (heures, température, précipitations, vent)
        const hours = data.hourly.time;
        const temperatures = data.hourly.temperature_2m;
        const precipitations = data.hourly.precipitation;
        const windSpeeds = data.hourly.wind_speed_10m;
        
        // Extrait les horaires de lever et coucher du soleil pour aujourd'hui
        const sunrise = new Date(data.daily.sunrise[0]);
        const sunset = new Date(data.daily.sunset[0]);

        // Initialisation d'une variable qui contiendra tout le code HTML à afficher sur la page
        let html = '';
        
        // Boucle pour parcourir les prévisions horaires toutes les 3 heures (de 0h à 24h)
        // 'i' commence à 0 et s'incrémente de 3 pour afficher les prévisions toutes les 3 heures (0h, 3h, 6h, etc.)
        for (let i = 0; i <= 24; i = i + 3) { 
            const currentHour = new Date(hours[i]);  // Récupère l'heure correspondante à l'index 'i'
            
            let icon = '';  // Variable pour stocker l'icône représentant la météo du moment

            // Si l'heure actuelle est entre le lever et le coucher du soleil, on affiche l'icône de soleil.
            if (currentHour >= sunrise && currentHour < sunset) {
                icon = '<i class="bi bi-brightness-high-fill text-warning"></i>';  // Icône de soleil
            } else {
                icon = '<i class="bi bi-moon-stars-fill text-secondary"></i>';  // Icône de lune
            }

            // Formate la date pour qu'elle soit lisible (exemple : "Lundi 12 Novembre 2024")
            const formattedDate = currentHour.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            // Génère le code HTML pour afficher les données pour chaque heure (température, précipitations, vent, etc.)
            html += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="weather-hour p-4 bg-light border rounded shadow-sm">
                        <h5 class="text-primary text-center mb-2">
                            ${icon} ${currentHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}  <!-- Affiche l'icône et l'heure -->
                        </h5>
                        <p class="text-center text-muted mb-3">${formattedDate}</p>  <!-- Affiche la date formatée -->
                        
                        <!-- Affiche la température -->
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <i class="bi bi-thermometer-half weather-icon text-warning"></i>
                            <p class="mb-0"><strong>Température :</strong></p>
                            <p class="text-end mb-0">${temperatures[i]} °C</p>
                        </div>

                        <!-- Affiche les précipitations -->
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <i class="bi bi-cloud-drizzle weather-icon text-info"></i>
                            <p class="mb-0"><strong>Précipitations :</strong></p>
                            <p class="text-end mb-0">${precipitations[i]} mm</p>
                        </div>

                        <!-- Affiche la vitesse du vent -->
                        <div class="d-flex align-items-center justify-content-between">
                            <i class="bi bi-wind weather-icon text-secondary"></i>
                            <p class="mb-0"><strong>Vitesse du vent :</strong></p>
                            <p class="text-end mb-0">${windSpeeds[i]} km/h</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // Insère le code HTML généré dans l'élément avec l'ID "result" dans le DOM (Document Object Model)
        document.getElementById("result").innerHTML = html;
    } catch (error) {
        // Si une erreur se produit, affiche un message d'erreur dans l'élément "result"
        console.error('Erreur:', error);
        document.getElementById("result").innerHTML = `<p class="text-danger">Erreur lors de la récupération des données.</p>`;
    }
});
