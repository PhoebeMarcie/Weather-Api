window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let icon = document.querySelector(".icon");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            position=>{
                long = position.coords.longitude;
                lat= position.coords.latitude;
                console.log(position);
                // const api = `https://api.weatherapi.com/v1/current.json?key=cbaefe04afb9463e920173916221104&q=48.8567,2.3508&aqi=no`;
               const api = `https://api.weatherapi.com/v1/current.json?key=cbaefe04afb9463e920173916221104&q=${lat},${long}&aqi=no`;

                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then( data => {
                        console.log(data);
                        const { temp_c,temp_f,condition} = data.current;
                        const {tz_id} = data.location;

                        // Set DOM elements from API 

                        temperatureDegree.textContent = temp_c;
                        temperatureDescription.textContent = condition.text;
                        locationTimezone.textContent = tz_id;
                        icon.src = condition.icon;
                        // formula for  celcius
                        let celcius =  (temp_f - 32 ) * (5 /9 );

                        // Change temperature to celcius/farenheight

                        

                        temperatureSection.addEventListener('click' , ()=>{
                            if(temperatureSpan.textContent==="F"){
                                temperatureSpan.textContent = "C";
                                
                                temperatureDegree.textContent = temp_c;
                                //temperatureDegree.textContent = Math.floor(celcius);
                            }
                            else{
                                temperatureSpan.textContent = "F";
                                temperatureDegree.textContent = temp_f;
                            }
                        });
                    });
            }
        );
    }
    
});